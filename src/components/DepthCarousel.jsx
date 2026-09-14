import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import gsap from 'gsap';
import './DepthCarousel.css';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const normalise = (item) => (typeof item === 'string' ? { image: item, alt: '' } : item);

export default function DepthCarousel({
  items = [], cardWidth = '84%', cardHeight = '86%', radius = 14, tint = '#143227',
  depth = 115, spread = 38, tilt = 10, tiltDirection = 'right', perspective = 1000,
  visibleCards = 2, falloff = .16, blur = 1.5, duration = 650, ease = 'power3.out',
  autoplay = false, autoplayDelay = 3200, loop = true, showControls = true,
  showIndicators = true, className = '',
}) {
  const data = useMemo(() => items.map(normalise), [items]);
  const cards = useRef([]);
  const previewPanel = useRef(null);
  const closeButton = useRef(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const count = data.length;
  const advance = (step) => setActive((index) => loop ? (index + step + count) % count : clamp(index + step, 0, count - 1));

  useEffect(() => {
    if (!count) return;
    const direction = tiltDirection === 'left' ? -1 : 1;
    cards.current.forEach((card, index) => {
      if (!card) return;
      let offset = index - active;
      if (loop && count > 1) { offset = ((offset % count) + count) % count; if (offset > count / 2) offset -= count; }
      const backward = Math.max(0, offset);
      const visible = Math.abs(offset) <= visibleCards;
      gsap.to(card, {
        xPercent: -50, yPercent: -50, x: direction * spread * offset, z: -depth * offset,
        rotationY: direction * tilt * clamp(offset, 0, 1),
        opacity: visible ? (offset < 0 ? Math.max(0, 1 + offset) : 1) : 0,
        filter: `brightness(${Math.max(.45, 1 - backward * falloff)}) blur(${Math.min(blur, backward * blur)}px)`,
        zIndex: 100 - Math.round(offset * 10), duration: duration / 1000, ease,
      });
    });
  }, [active, blur, count, depth, duration, ease, falloff, loop, spread, tilt, tiltDirection, visibleCards]);

  useEffect(() => {
    if (!autoplay || paused || isPreviewOpen || count < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setInterval(() => advance(1), Math.max(autoplayDelay, 800));
    return () => window.clearInterval(timer);
  }, [active, autoplay, autoplayDelay, count, isPreviewOpen, paused]);

  useEffect(() => {
    if (!isPreviewOpen) return undefined;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();
    const handleKeydown = (event) => {
      if (['Escape', 'ArrowLeft', 'ArrowRight'].includes(event.key)) event.preventDefault();
      if (event.key === 'Escape') setIsPreviewOpen(false);
      if (event.key === 'ArrowLeft') advance(-1);
      if (event.key === 'ArrowRight') advance(1);
      if (event.key === 'Tab') {
        const buttons = previewPanel.current?.querySelectorAll('button');
        const first = buttons?.[0];
        const last = buttons?.[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, [isPreviewOpen]);

  if (!count) return null;

  return <>
    <div className={`depth-carousel ${className}`} style={{ '--dc-perspective': `${perspective}px` }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="depth-carousel__stage">
        {data.map((item, index) => <button key={`${item.image}-${index}`} className="depth-carousel__card" ref={(element) => { cards.current[index] = element; }} style={{ width: cardWidth, height: cardHeight, borderRadius: radius }} aria-label={`预览第 ${index + 1} 张项目图片`} onClick={() => { setActive(index); setIsPreviewOpen(true); }}>
          <img src={item.image} alt={item.alt || ''} draggable="false" /><span style={{ background: tint }} />
        </button>)}
      </div>
      {showControls && count > 1 && <><button className="depth-carousel__arrow is-prev" type="button" aria-label="上一张" onClick={() => advance(-1)}><ChevronLeft aria-hidden="true" /></button><button className="depth-carousel__arrow is-next" type="button" aria-label="下一张" onClick={() => advance(1)}><ChevronRight aria-hidden="true" /></button></>}
      {showIndicators && count > 1 && <div className="depth-carousel__dots">{data.map((_, index) => <button key={index} type="button" className={active === index ? 'is-active' : ''} aria-label={`切换至第 ${index + 1} 张`} onClick={() => setActive(index)} />)}</div>}
      <span className="depth-carousel__hint">点击放大查看</span>
    </div>
    {isPreviewOpen && createPortal(<div className="image-preview" role="dialog" aria-modal="true" aria-label="项目图片预览" onMouseDown={() => setIsPreviewOpen(false)}>
      <div className="image-preview__panel" ref={previewPanel} onMouseDown={(event) => event.stopPropagation()}>
        <button className="image-preview__close" ref={closeButton} type="button" aria-label="关闭预览" onClick={() => setIsPreviewOpen(false)}><X aria-hidden="true" /></button>
        {count > 1 && <button className="image-preview__nav is-prev" type="button" aria-label="上一张" onClick={() => advance(-1)}><ChevronLeft aria-hidden="true" /></button>}
        <div className="image-preview__stage"><img src={data[active].image} alt={data[active].alt || ''} /></div>
        {count > 1 && <button className="image-preview__nav is-next" type="button" aria-label="下一张" onClick={() => advance(1)}><ChevronRight aria-hidden="true" /></button>}
        {count > 1 && <div className="image-preview__footer"><span aria-live="polite">{String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}</span><div>{data.map((item, index) => <button key={`${item.image}-preview-${index}`} type="button" className={index === active ? 'is-active' : ''} aria-label={`查看第 ${index + 1} 张`} onClick={() => setActive(index)}><img src={item.image} alt="" /></button>)}</div></div>}
      </div>
    </div>, document.body)}
  </>;
}
