# 个人页面项目结构规划

## 建议的目录结构

```
my/
├── src/
│   ├── views/                    # 主要页面
│   │   ├── Home.vue             # 首页
│   │   ├── Works.vue            # 作品展示页
│   │   ├── Skills.vue           # 技术能力页
│   │   └── WorkDetail.vue       # 作品详情页（新增）
│   │
│   ├── components/              # Vue组件
│   │   ├── Navbar.vue           # 导航栏
│   │   └── common/              # 通用组件
│   │       ├── CodePreview.vue  # 代码预览组件
│   │       └── DemoContainer.vue # 演示容器组件
│   │
│   ├── demos/                   # 演示项目（从mySrc迁移）
│   │   ├── components/          # 互动组件演示
│   │   │   ├── AudioPlayer/     # 音频播放器
│   │   │   ├── DragDropContainer/ # 拖拽容器
│   │   │   ├── Echarts/         # 图表组件
│   │   │   ├── FaultTextEffect/ # 故障文字效果
│   │   │   └── ...              # 其他组件
│   │   │
│   │   └── tutorials/           # 教学演示
│   │       ├── text-effects/    # 文字效果教学
│   │       ├── canvas/          # Canvas教学
│   │       └── ...              # 其他教学内容
│   │
│   ├── assets/                  # 静态资源
│   │   ├── images/             # 图片
│   │   ├── audio/              # 音频文件
│   │   ├── fonts/              # 字体文件
│   │   └── data/               # 数据文件
│   │
│   ├── utils/                   # 工具函数
│   │   ├── demoData.js         # 演示数据
│   │   └── helpers.js          # 辅助函数
│   │
│   ├── router/                  # 路由配置
│   │   └── index.js
│   │
│   └── style.css                # 全局样式
│
├── public/                      # 公共资源
├── package.json
└── README.md
```

## HTML到Vue的迁移策略

### 1. 完整HTML页面 → Vue页面组件
对于像"用阴影实现描边效果.html"这样的完整教学页面：
- 将HTML结构放在`<template>`中
- 将CSS样式放在`<style scoped>`中
- 将JavaScript逻辑放在`<script setup>`中

### 2. 组件库 → Vue组件
对于像AudioPlayer这样的复杂组件：
- 保持原有的JavaScript逻辑
- 创建Vue包装组件
- 在Vue组件中使用Web Components或直接集成

### 3. 资源文件迁移
- 图片、音频等资源移到`src/assets/`
- 保持相对路径引用
- 使用Vite的资源处理机制

## 迁移步骤

1. **创建演示页面结构**
2. **迁移教学内容为Vue组件**
3. **创建组件展示页面**
4. **整理资源文件**
5. **更新路由配置**

## HTML在Vue中的使用

HTML可以直接在Vue中使用，但需要注意：
- HTML结构放在`<template>`标签内
- CSS样式建议使用scoped避免污染
- JavaScript需要适配Vue的响应式系统
- 事件绑定改用Vue的语法（@click等） 