# 李明宪 · 前端开发工程师个人网站

一个基于 React + Vite 制作的个人简历与作品集网站。页面采用明亮、克制的科技感视觉风格，包含视频首页、个人资料侧栏、精选项目、能力展示和联系页，并适配手机端。

## 技术栈

- React 19
- Vite 8
- GSAP：项目图片的层叠轮播动画
- Lucide React：界面图标
- 原生 CSS：响应式布局、毛玻璃导航与视觉细节

## 本地运行

先安装依赖：

```bash
npm install
```

启动开发环境：

```bash
npm run dev
```

默认访问地址为 `http://127.0.0.1:5173/`。

构建生产版本：

```bash
npm run build
```

构建产物会输出到 `dist/` 目录。

## 页面结构

| 区域 | 内容 |
| --- | --- |
| 首页 | 双视频背景轮播、主标题、毛玻璃导航、项目入口与下滑指引 |
| 个人资料栏 | 头像、身份、经验、联系方式、技术工具箱；桌面端滚动时吸顶 |
| 内容主栏 | 个人简介、项目概览数据、精选项目与个人优势 |
| 精选项目 | 卡片式项目介绍、层叠图片轮播、点击图片后的完整预览与切换 |
| 工作经历 | 个人优势前的倒序经历卡片；点击后保留左侧资料，右侧展示该段经历的职责、项目与成果 |
| 联系页 | 邮箱、电话与回到页面顶部的入口 |

## 目录说明

```text
src/
├─ components/
│  ├─ BorderGlow.jsx       # 卡片边缘发光效果
│  ├─ DepthCarousel.jsx    # 项目图片轮播与放大预览
│  └─ ProfileSidebar.jsx   # 左侧个人资料栏
├─ main.jsx                # 页面内容、项目数据与交互入口
├─ styles.css              # 全局样式、首页与基础模块
└─ portfolio.css           # 左右内容布局与作品集模块样式

public/
├─ profile-sunset.png              # 当前头像
├─ project-delivery-01.png         # 品质外卖频道作品图
├─ project-delivery-02.png
├─ project-growth-01.png           # 成长中心升级仪式作品图
├─ project-growth-02.png
└─ project-seckill-placeholder.svg # 限时秒杀权益平台临时视觉图
```

## 更新内容

### 修改个人信息

在 [src/main.jsx](./src/main.jsx) 中修改姓名、联系方式、首页文案和项目数据；左侧资料栏内容在 [src/components/ProfileSidebar.jsx](./src/components/ProfileSidebar.jsx) 中维护。

### 替换项目图片

将图片放到 `public/`，再到 [src/main.jsx](./src/main.jsx) 的 `projects` 数组中更新对应项目的 `media` 字段。例如：

```js
media: [
  { image: '/your-project-01.png', alt: '项目界面一' },
  { image: '/your-project-02.png', alt: '项目界面二' },
]
```

图片点击后会打开完整预览。预览支持点击左右圆形按钮、底部缩略图、键盘方向键切换；按 `Esc`、点击关闭图标或遮罩可退出。

### 替换首页视频

在 [src/main.jsx](./src/main.jsx) 的 `heroVideos` 数组中替换视频地址。视频结束后会自动切换到下一条；视频无法加载时会显示静态海报 `public/hero-poster.svg`。

### 维护工作经历

[src/data/experience.js](./src/data/experience.js) 按简历记录 4 段任职经历和 1 段职业调整期。每项包含公司、岗位、时间、简介、技术标签，以及可选的成果数据与项目职责。列表和详情组件位于 [src/components/WorkExperience.jsx](./src/components/WorkExperience.jsx)，样式位于同目录的 `WorkExperience.css`。

点击经历卡片后，右侧总览切换为详情；顶部和底部的“返回总览”按钮会恢复原滚动位置和卡片焦点。详情状态下点击顶部导航，也可直接返回总览的对应模块。

## 响应式行为

- 大屏：个人资料栏固定在左，项目与内容在右侧主栏展示。
- 小于 `800px`：资料栏和主内容改为纵向布局，项目卡片改为图片在上、文字在下。
- 图片预览会在桌面与手机端按比例完整展示，不超出视窗。
