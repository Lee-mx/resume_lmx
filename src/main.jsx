import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Layers3,
  Menu,
  Sparkles,
  X,
} from 'lucide-react';
import './styles.css';
import BorderGlow from './components/BorderGlow';
import DepthCarousel from './components/DepthCarousel';
import ProfileSidebar from './components/ProfileSidebar';
import './portfolio.css';

const projects = [
  {
    no: '01',
    name: '限时秒杀权益平台',
    tags: ['Picasso', 'Pexus', 'VAP 动效'],
    note: '跨端业务 · 169 commits',
    className: 'project-seckill',
    description: '围绕限时权益领取场景，串联跨端业务流程与视频动效，让复杂的活动交互自然衔接。',
    focus: '跨端业务交付 / 动效融合',
    media: [
      { image: '/project-seckill-placeholder.svg', alt: '限时秒杀权益平台视觉占位图' },
      { image: '/project-seckill-placeholder.svg', alt: '限时秒杀权益平台视觉占位图' },
    ],
  },
  {
    no: '02',
    name: '品质外卖频道',
    tags: ['多语言', '首屏优化', '跨端渲染'],
    note: 'C 端频道体验建设',
    className: 'project-delivery',
    description: '从频道浏览到商家选择，打磨高频消费场景。兼顾多语言适配、首屏加载与跨端一致性。',
    focus: '频道体验 / 多语言适配',
    media: [
      { image: '/project-delivery-01.png', alt: '品质外卖频道中文界面' },
      { image: '/project-delivery-02.png', alt: '品质外卖频道多语言界面' },
    ],
  },
  {
    no: '03',
    name: '成长中心升级仪式',
    tags: ['Native Bridge', '动态编排', 'VAP'],
    note: '沉浸式多阶段流程',
    className: 'project-growth',
    description: '以动态配置驱动多阶段流程，结合 Native Bridge 与 VAP 动效，构建连贯的成长与奖励体验。',
    focus: '流程编排 / 沉浸式动效',
    media: [
      { image: '/project-growth-01.png', alt: '成长中心升级仪式签到弹层' },
      { image: '/project-growth-02.png', alt: '成长中心升级仪式主界面' },
    ],
  },
];

const strengths = [
  {
    icon: <Layers3 aria-hidden="true" />,
    label: '跨端交付',
    text: 'React / TSX、Picasso、Pex，覆盖 Android、鸿蒙与 H5 的一致体验。',
  },
  {
    icon: <Sparkles aria-hidden="true" />,
    label: '动效与体验',
    text: '熟悉 VAP 视频动效、Native Bridge 与复杂转场，兼顾表现力和稳定性。',
  },
  {
    icon: <Code2 aria-hidden="true" />,
    label: '工程化思维',
    text: '以配置驱动和模块抽象沉淀复用能力，让复杂业务持续可维护。',
  },
  {
    icon: <BriefcaseBusiness aria-hidden="true" />,
    label: '业务闭环',
    text: '从视觉还原到性能、兼容和埋点治理，关注每一次真实的用户触达。',
  },
];

const heroVideos = [
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260407_043131_ebe2f0b5-9acc-4a4f-b2c1-7297f1a3beb9.mp4',
];

function App() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [videoFailed, setVideoFailed] = React.useState(false);
  const [heroVideoIndex, setHeroVideoIndex] = React.useState(0);
  const heroRef = React.useRef(null);
  const headerRef = React.useRef(null);
  const scrollProgressRef = React.useRef(null);
  const backToTopRef = React.useRef(null);
  const navItems = [
    ['经历', '#about'],
    ['项目', '#projects'],
    ['优势', '#strengths'],
  ];

  const closeMenu = () => setMenuOpen(false);
  const playNextHeroVideo = () => {
    setVideoFailed(false);
    setHeroVideoIndex((index) => (index + 1) % heroVideos.length);
  };

  React.useEffect(() => {
    let frameId = 0;
    const updateHeaderOpacity = () => {
      frameId = 0;
      const heroHeight = heroRef.current?.offsetHeight || 1;
      const progress = Math.min(Math.max(window.scrollY / heroHeight, 0), 1);
      const opacity = 0.4 + progress * 0.6;
      headerRef.current?.style.setProperty('--header-opacity', opacity.toFixed(3));
      const scrollableHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const pageProgress = Math.min(Math.max(window.scrollY / scrollableHeight, 0), 1);
      scrollProgressRef.current?.style.setProperty('--scroll-progress', `${(pageProgress * 100).toFixed(2)}%`);
      backToTopRef.current?.classList.toggle('is-visible', window.scrollY > heroHeight * 0.6);
    };
    const requestUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateHeaderOpacity);
    };

    updateHeaderOpacity();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <main>
      <header className="site-header" ref={headerRef}>
        <div className="scroll-progress" aria-hidden="true"><span ref={scrollProgressRef} /></div>
        <a className="brand" href="#top" aria-label="回到首页">
          <img className="brand-avatar" src="/profile-sunset.png" alt="李明宪的头像" />
          <span className="brand-name">李明宪</span>
        </a>
        <nav className="desktop-nav" aria-label="主导航">
          {navItems.map(([label, href], index) => <a className={index === 0 ? 'is-current' : ''} key={href} href={href}>{label}</a>)}
        </nav>
        <a className="contact-link" href="#contact"><span>联系我</span><ArrowUpRight size={15} /></a>
        <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? '关闭导航' : '打开导航'}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>
      <div className={`mobile-nav ${menuOpen ? 'is-open' : ''}`}>
        {navItems.map(([label, href]) => <a key={href} href={href} onClick={closeMenu}>{label}</a>)}
        <a href="#contact" onClick={closeMenu}>联系我</a>
      </div>
      <section className="hero" id="top" ref={heroRef}>
        <video
          key={heroVideos[heroVideoIndex]}
          className={`hero-video ${videoFailed ? 'is-hidden' : ''}`}
          autoPlay
          muted
          playsInline
          preload="metadata"
          poster="/hero-poster.svg"
          onEnded={playNextHeroVideo}
          onError={() => setVideoFailed(true)}
          aria-hidden="true"
        >
          <source src={heroVideos[heroVideoIndex]} type="video/mp4" />
        </video>
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-vignette" aria-hidden="true" />

        <div className="hero-content">
          <p className="eyebrow"><span /> FRONTEND ENGINEER · 08 YEARS</p>
          <h1>把复杂的体验<br /><em>做得流畅而准确。</em></h1>
          <p className="hero-intro">专注于大型跨端项目、动态编排与动效体验。<br />在技术边界与业务结果之间，持续打磨细节。</p>
          <div className="hero-actions">
            <a className="button primary" href="#projects">查看精选项目 <ArrowDownRight size={18} /></a>
            <a className="button text-button" href="#about">认识我 <span>↘</span></a>
          </div>
        </div>
        <div className="hero-footer">
          <a className="scroll-cue" href="#about" aria-label="向下浏览个人经历">
            <svg width="1em" height="1em" viewBox="0 0 24 24" className="scroll-down-icon" aria-hidden="true">
              <path fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" d="m5 8 7 7 7-7" />
            </svg>
          </a>
        </div>
      </section>

      <div className="portfolio-shell" id="about">
        <ProfileSidebar />
        <div className="portfolio-main">
          <section className="portfolio-overview" aria-labelledby="overview-title">
            <div className="overview-topline"><span><i /> 在代码与体验之间</span><span>PORTFOLIO / 2026</span></div>
            <h2 id="overview-title">让想法落地，<br />让体验<span>自然发生。</span></h2>
            <p>我是李明宪，一名前端开发工程师。近年专注美团 / 大众点评级别的跨端 C 端项目，在复杂业务中，寻找清晰、流畅的实现方式。</p>
            <div className="overview-bottom"><span>跨端开发 <i /> 交互动效 <i /> 工程实践</span><a href="#projects">浏览我的项目 <ArrowDownRight size={18} /></a></div>
            <div className="overview-art" aria-hidden="true"><span /><span /><span /></div>
          </section>
          <div className="portfolio-metrics" aria-label="项目概览">
            <div><span>SELECTED WORK</span><strong>03<small>精选项目</small></strong></div>
            <div><span>CROSS PLATFORM</span><strong>03<small>端协同交付</small></strong></div>
            <div><span>PROJECT COMMITS</span><strong>169+<small>近期项目提交</small></strong></div>
          </div>

      <section className="projects section" id="projects">
        <div className="projects-layout">
          <div className="project-intro">
            <div><div className="section-label">SELECTED WORK / 01 — 03</div><h2>精选项目<span>每一次交付，都是一次打磨。</span></h2></div>
            <span className="project-count">03 件作品</span>
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <BorderGlow className="project-glow-card" key={project.no} borderRadius={20}>
              <article className={`project-card ${project.className}`}>
                <div className="project-art">
                  <DepthCarousel
                    items={project.media}
                    cardWidth="86%"
                    cardHeight="88%"
                    radius={14}
                    depth={98}
                    spread={31}
                    tilt={9}
                    visibleCards={2}
                    blur={1.2}
                    autoplay
                    autoplayDelay={3600}
                    loop
                    showControls
                    showIndicators
                  />
                </div>
                <div className="project-info">
                  <span className="project-no">{project.no}</span>
                  <div>
                    <p className="project-note">{project.note}</p>
                    <h3>{project.name}</h3>
                    <p className="project-description">{project.description}</p>
                    <p className="project-focus"><span>实践方向</span>{project.focus}</p>
                  </div>
                  <div className="project-bottom">
                    <div className="tag-list">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                    <span className="project-media-note">{project.media.length} 张预览</span>
                  </div>
                </div>
              </article>
              </BorderGlow>
            ))}
          </div>
        </div>
      </section>

      <section className="strengths section" id="strengths">
        <div className="strength-intro">
          <div className="section-label">03 <span /> 个人优势</div>
          <h2>能力并非堆叠，<br />而是关键时刻的<strong>稳定输出。</strong></h2>
        </div>
        <div className="strength-grid">
          {strengths.map(item => (
            <BorderGlow className="strength-glow-card" key={item.label} glowRadius={20} borderRadius={16}>
            <article className="strength-card">
              <div className="icon-wrap">{item.icon}</div>
              <span className="strength-index">0{strengths.indexOf(item) + 1}</span>
              <h3>{item.label}</h3>
              <p>{item.text}</p>
            </article>
            </BorderGlow>
          ))}
        </div>
      </section>

        </div>
        {/* A future right sidebar can be added as a third grid column; it takes no space yet. */}
      </div>
      <section className="contact" id="contact">
        <div className="contact-orbit orbit-one" aria-hidden="true" />
        <div className="contact-orbit orbit-two" aria-hidden="true" />
        <div className="contact-content">
          <p className="eyebrow"><span /> LET&apos;S BUILD SOMETHING GOOD</p>
          <h2>下一段值得投入的<br /><em>旅程，期待与你同行。</em></h2>
          <a className="mail-cta" href="mailto:305216313@qq.com">305216313@qq.com <ArrowUpRight /></a>
          <div className="contact-details"><span>132 7591 5335</span><span>上海 · 可随时面试</span></div>
        </div>
        <footer><span>© 2026 LI MINGXIAN</span><a href="#top">BACK TO TOP ↑</a></footer>
      </section>
      <a className="back-to-top" ref={backToTopRef} href="#top" aria-label="返回页面顶部">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" d="m5 16 7-7 7 7" />
        </svg>
      </a>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
