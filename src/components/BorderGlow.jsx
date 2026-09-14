import { useCallback, useRef } from 'react';
import './BorderGlow.css';

const positions = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%'];
const keys = ['--gradient-one', '--gradient-two', '--gradient-three', '--gradient-four', '--gradient-five', '--gradient-six', '--gradient-seven'];
const colorMap = [0, 1, 2, 0, 1, 2, 1];

function buildGlowVars(glowColor, intensity) {
  const [h = 150, s = 48, l = 60] = glowColor.match(/[\d.]+/g)?.map(Number) ?? [];
  return [100, 60, 50, 40, 30, 20, 10].reduce((vars, opacity, index) => {
    const suffix = ['', '-60', '-50', '-40', '-30', '-20', '-10'][index];
    vars[`--glow-color${suffix}`] = `hsl(${h}deg ${s}% ${l}% / ${Math.min(opacity * intensity, 100)}%)`;
    return vars;
  }, {});
}

function buildGradientVars(colors) {
  return keys.reduce((vars, key, index) => {
    vars[key] = `radial-gradient(at ${positions[index]}, ${colors[colorMap[index] % colors.length]} 0px, transparent 50%)`;
    return vars;
  }, { '--gradient-base': `linear-gradient(${colors[0]} 0 100%)` });
}

export default function BorderGlow({
  children, className = '', edgeSensitivity = 42, glowColor = '150 48 60',
  backgroundColor = '#fffefa', borderRadius = 0, glowRadius = 28,
  glowIntensity = 0.72, coneSpread = 28, colors = ['#79d3ae', '#f3d36c', '#92c9f2'], fillOpacity = 0.16,
}) {
  const cardRef = useRef(null);
  const handlePointerMove = useCallback((event) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const dx = event.clientX - rect.left - rect.width / 2;
    const dy = event.clientY - rect.top - rect.height / 2;
    const proximity = Math.min(Math.max(Math.max(Math.abs(dx) / (rect.width / 2), Math.abs(dy) / (rect.height / 2)) * 100, 0), 100);
    card.style.setProperty('--edge-proximity', proximity.toFixed(2));
    card.style.setProperty('--cursor-angle', `${((Math.atan2(dy, dx) * 180) / Math.PI + 90).toFixed(2)}deg`);
  }, []);

  return <div ref={cardRef} onPointerMove={handlePointerMove} className={`border-glow-card ${className}`} style={{ '--card-bg': backgroundColor, '--edge-sensitivity': edgeSensitivity, '--border-radius': `${borderRadius}px`, '--glow-padding': `${glowRadius}px`, '--cone-spread': coneSpread, '--fill-opacity': fillOpacity, ...buildGlowVars(glowColor, glowIntensity), ...buildGradientVars(colors) }}><span className="edge-light" /><div className="border-glow-inner">{children}</div></div>;
}
