import { ArrowLeft, ArrowUpRight, BriefcaseBusiness, CalendarDays, Sprout } from 'lucide-react';
import BorderGlow from './BorderGlow';
import { experiences } from '../data/experience';
import './WorkExperience.css';

function Tags({ items }) {
  return <div className="experience-tags">{items.map(item => <span key={item}>{item}</span>)}</div>;
}

export function WorkExperienceList({ onSelect }) {
  return <section className="work-experience section" id="experience" aria-labelledby="experience-title">
    <div className="experience-heading"><div><p className="section-label">CAREER JOURNEY / 2017 — NOW</p><h2 id="experience-title">工作经历<span>在不同场景里，积累解决问题的能力。</span></h2></div><span className="project-count">4 段任职经历</span></div>
    <ol className="experience-list">
      {experiences.map((item, index) => <li key={item.id}>
        <BorderGlow borderRadius={18} glowRadius={16}>
          <button id={`experience-card-${item.id}`} className={`experience-card ${item.kind === '个人成长' ? 'is-break' : ''}`} onClick={() => onSelect(item)} type="button" aria-label={`查看${item.company}经历详情`}>
            <span className="experience-symbol" aria-hidden="true">{item.kind === '个人成长' ? <Sprout /> : <BriefcaseBusiness />}</span>
            <span className="experience-card-copy"><span className="experience-period">{item.period}<span>{item.kind}</span></span><span className="experience-company">{item.company}</span><span className="experience-role">{item.role} · {item.context}</span><span className="experience-summary">{item.summary}</span><span className="experience-card-bottom"><span className="experience-card-index">{String(index + 1).padStart(2, '0')} / CAREER</span><span className="experience-open">查看经历 <ArrowUpRight size={16} /></span></span></span>
          </button>
        </BorderGlow>
      </li>)}
    </ol>
  </section>;
}

export function WorkExperienceDetail({ experience, onBack }) {
  return <article className="experience-detail" aria-labelledby="experience-detail-title">
    <div className="experience-toolbar"><button type="button" onClick={onBack}><ArrowLeft size={17} />返回总览</button><span>工作经历 / {experience.kind}</span></div>
    <header className="experience-detail-header">
      <p className="section-label">CAREER IN FOCUS</p>
      <h2 id="experience-detail-title" tabIndex={-1}>{experience.company}</h2>
      <p className="experience-detail-role">{experience.role}<span>{experience.context}</span></p>
      <p className="experience-detail-period"><CalendarDays size={16} />{experience.period}</p>
      <p className="experience-detail-summary">{experience.summary}</p>
      <Tags items={experience.tags} />
    </header>
    {experience.metrics && <section className="experience-results" aria-label="工作成果数据"><div className="experience-metrics">{experience.metrics.map(metric => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div>{experience.metricNote && <p>{experience.metricNote}</p>}</section>}
    {experience.projects.length > 0 && <section className="experience-projects" aria-labelledby="experience-projects-title">
      <div className="experience-projects-heading"><h3 id="experience-projects-title">项目与工作实践</h3><span>{String(experience.projects.length).padStart(2, '0')} PROJECT{experience.projects.length > 1 ? 'S' : ''}</span></div>
      {experience.projects.map((project, index) => <section className="experience-project" key={project.name} aria-labelledby={`experience-project-${index}`}>
        <div className="experience-project-top"><span>{String(index + 1).padStart(2, '0')} / {project.caption}</span>{project.period && <span>{project.period}</span>}</div>
        <h4 id={`experience-project-${index}`}>{project.name}</h4>
        {project.tags && <Tags items={project.tags} />}
        <ul>{project.points.map(point => <li key={point}>{point}</li>)}</ul>
      </section>)}
    </section>}
    <footer className="experience-detail-footer"><span>每一段经历，都是下一次出发的积累。</span><button type="button" onClick={onBack}><ArrowLeft size={17} />返回总览</button></footer>
  </article>;
}
