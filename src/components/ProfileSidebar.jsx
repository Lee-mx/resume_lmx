import { ArrowUpRight, Code2, Mail, MapPin, Smartphone } from 'lucide-react';

export default function ProfileSidebar() {
  return <aside className="profile-sidebar" aria-label="个人资料">
    <div className="profile-card">
      <div className="profile-cover"><span>HELLO, WORLD.</span></div>
      <div className="profile-body">
        <img className="profile-avatar" src="/profile-sunset.png" alt="李明宪的日落头像" />
        <span className="profile-status"><i /> 开放工作机会</span>
        <h2>李明宪<span>LI MINGXIAN</span></h2>
        <p className="profile-role"><Code2 size={16} /> 前端开发工程师</p>
        <p className="profile-bio">用代码连接想法与体验。<br />关注细节，也关注真实的用户。</p>
        <div className="profile-numbers"><div><strong>08<span>年</span></strong><small>开发经验</small></div><div><strong>03<span>端</span></strong><small>协同交付</small></div></div>
        <div className="profile-contacts">
          <span><MapPin size={15} />上海</span>
          <a href="mailto:305216313@qq.com"><Mail size={15} />305216313@qq.com</a>
          <a href="tel:13275915335"><Smartphone size={15} />132 7591 5335</a>
        </div>
        <a className="profile-cta" href="#contact">聊聊下一次合作 <ArrowUpRight size={17} /></a>
      </div>
    </div>
    <div className="profile-toolbox"><p>我的技术工具箱 <span>TOOLKIT</span></p><div>{['React', 'TypeScript', 'Picasso', 'Pexus', 'VAP', 'Native Bridge'].map(tag => <span key={tag}>{tag}</span>)}</div></div>
    <p className="profile-note">认真写代码，也认真感受生活。<span>MAKE SOMETHING THAT MATTERS.</span></p>
  </aside>;
}
