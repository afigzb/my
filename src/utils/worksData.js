// 作品数据管理
export const worksData = [
  {
    id: 'svg-path-tutorial',
    title: 'SVG Path 交互式教学',
    description: 'SVG路径命令的交互式学习平台，通过可视化的方式展示path命令的绘制过程。提供了完整的命令参考和实时预览功能，让学习者能够直观地理解贝塞尔曲线、直线、弧线等各种路径绘制方法，是掌握SVG矢量图形的理想工具。',
    demoUrl: '/demos/TutorialPage/path/TutorialPage.html',
    tags: ['SVG', 'Interactive', '图形'],
    image: '/img/svg.png'
  },
  {
    id: 'physics-bounce-follow',
    title: '物理回弹跟随组件教学',
    description: '深度剖析基于胡克定律和阻尼力的Web物理动画实现。从物理学基础出发，详细讲解弹簧-质点-阻尼系统的数学模型，并展示如何将物理公式转化为流畅的前端动画。组件支持鼠标跟随、物理回弹、嵌套效果等特性，采用LitElement架构和高性能优化策略。教学内容涵盖力学计算、状态机设计、线性插值算法、事件节流优化等核心技术点，是学习物理动画和Web Components开发的完整教程。',
    demoUrl: '/demos/components/FocusDiv/FocusDiv.html',
    tags: ['Physics Animation', 'Web Components', 'LitElement', '教学'],
    image: '/img/弹性回弹.png'
  },
  {
    id: 'echarts-factory',
    title: 'ECharts 图表工厂',
    description: '基于工厂设计模式实现的ECharts图表创建工具，简化了复杂图表的配置流程。通过标准化的接口和模板，开发者可以快速创建柱状图、折线图、雷达图、玫瑰图、饼图等多种数据可视化图表，同时保持了高度的可定制性和扩展性。',
    demoUrl: '/demos/components/Echarts/test.html',
    tags: ['ECharts', 'Factory Pattern', 'Data Visualization'],
    image: '/img/echarts.png'
  },
  {
    id: 'canvas-tutorial',
    title: 'Canvas 基础教学',
    description: '全面的Canvas学习平台，从基础的绘图API开始，逐步深入到复杂的动画效果。涵盖了路径绘制、图形变换、像素操作、动画循环等核心概念，提供了大量的交互式示例和练习，是前端图形编程的完整教程。',
    demoUrl: '/demos/TutorialPage/Canvas/CanvasTutorialPage.html',
    tags: ['Canvas', 'Animation', 'Graphics'],
    image: '/img/canvas.png'
  },
  {
    id: 'sliding-damping',
    title: '滑动阻尼效果组件',
    description: '基于Web Components技术开发的物理感滑动组件，模拟真实的阻尼效果。支持惯性滚动、边界回弹等特性，提供了丰富的配置选项来调节滑动手感。组件化的设计使其可以轻松集成到任何项目中，适用于移动端和桌面端。',
    demoUrl: '/demos/components/SlidingDamping/SlidingDamping.html',
    tags: ['Web Components', 'Scroll', 'Physics'],
    image: '/img/SlidingDamping.png'
  },
  {
    id: 'drag-drop-container-tutorial',
    title: '拖拽容器组件教学',
    description: '现代Web拖拽组件的完整设计与实现教程。从零开始构建一个通用的拖拽容器，详细解析拖拽逻辑与内容展示的分离策略。组件基于LitElement开发，统一处理鼠标和触摸事件，支持惯性滚动、边界检测、智能交互元素识别等高级特性。教学内容深入讲解事件处理机制、坐标系转换、性能优化策略、移动端适配方案等技术要点。通过slot插槽设计，任何内容都能被轻松包装为可拖拽元素，是构建拖拽交互界面的理想解决方案。',
    demoUrl: '/demos/components/DragDropContainer/DragDropContainer.html',
    tags: ['Drag & Drop', 'Web Components', 'Touch Events', '教学'],
    image: '/img/拖拽容器.png'
  },
  {
    id: 'tetris-game',
    title: '俄罗斯方块',
    description: '使用Canvas技术重现的经典俄罗斯方块游戏，完整实现了方块下落、旋转、消除等核心游戏机制。采用面向对象的设计思路，代码结构清晰，包含完整的游戏状态管理、碰撞检测和分数系统。',
    demoUrl: '/demos/TutorialPage/Canvas/基础教学/俄罗斯方块.html',
    tags: ['Game', 'Canvas', 'Classic'],
    image: '/img/俄罗斯方块.png'
  },
  {
    id: 'text-effects',
    title: '文字特效教学',
    description: '深入探讨CSS文字效果实现技巧的教学项目，详细讲解如何使用text-shadow、box-shadow等属性创建各种炫酷的文字描边、发光、立体等视觉效果。通过实际案例演示，帮助开发者掌握CSS高级特效的制作方法。',
    demoUrl: '/demos/TutorialPage/用阴影实现描边效果.html',
    tags: ['CSS', 'Text Effects', '教学'],
    image: '/img/文字效果.png'
  },
  {
    id: 'metaball-effect',
    title: '融球效果原理教学',
    description: '详细解析融球（Metaball）效果的实现原理和技术细节。通过CSS滤镜、SVG滤镜等多种技术方案的对比，深入讲解如何创建流体般的融合动画效果。包含完整的数学推导和代码实现，适合对视觉效果感兴趣的开发者学习。',
    demoUrl: '/demos/components/MetaballEffect/MetaballEffect-Tutorial.html',
    tags: ['CSS Filter', 'Visual Effects', '原理'],
    image: '/img/融球效果.png'
  },
  {
    id: 'audioplayer-tutorial',
    title: 'AudioPlayer 组件教程',
    description: '个人制作的音频播放器Web组件的完整开发教程，展示了如何使用Web Audio API构建功能丰富的音频播放器。支持播放模式、音量控制、进度控制等特性，组件采用原生Web Components技术，具有良好的兼容性和可复用性。',
    demoUrl: '/demos/components/AudioPlayer/TutorialPage/TutorialPage.html',
    tags: ['Web Components', 'Audio', 'Tutorial'],
    image: '/img/AudioPlayer.png'
  },
  {
    id: 'codeeditor-tutorial',
    title: 'CodeEditorPreview 组件使用指南',
    description: '个人制作的代码编辑器组件使用指南，利用集成了语法高亮、重置初始状态、实时预览等强大功能。支持多种编程语言，提供了丰富的主题和插件系统。详细展示了多个组件的开发和的集成策略。',
    demoUrl: '/demos/components/CodeEditorPreview/TutorialPage/TutorialPage.html',
    tags: ['Code Editor', 'Preview', 'Tutorial'],
    image: '/img/CodeEditorPreview.png'
  },
  {
    id: 'fault-text-effect',
    title: '故障文字效果',
    description: '赛博朋克风格的故障艺术文字特效组件，通过裁剪可视区域，容器抖动，RGB通道分离的方式,实现数字失真、色彩分离、闪烁抖动等视觉效果。支持多种故障模式和自定义参数，为网站添加独特的科技感和未来感。',
    demoUrl: '/demos/components/FaultTextEffect/index.html',
    tags: ['Text Effects', 'Animation', 'Glitch'],
    image: '/img/故障文字.png'
  },
  {
    id: 'metaball-component',
    title: '融球效果组件',
    description: '可交互的融球视觉效果Web组件，基于SVG滤镜和Canvas技术实现流体般的融合动画。基于单一职责理念开发出的组件，提供了完整的数学演示。',
    demoUrl: '/demos/components/MetaballEffect/MetaballEffect.html',
    tags: ['Web Components', 'CSS', '融球组件'],
    image: '/img/融球组件.png'
  },
  {
    id: 'thunder-fighter',
    title: '雷霆战机',
    description: '经典的2D飞行射击游戏，使用Canvas技术初步实现了游戏的关键系统模块。包含飞机控制、子弹发射、敌机运动、碰撞检测、重生机制、能读增加、得分系统等游戏机制。',
    demoUrl: '/demos/TutorialPage/Canvas/基础教学/雷霆战机.html',
    tags: ['Game', 'Canvas', '雷霆战机'],
    image: '/img/雷霆战机.png'
  }
]

// 根据ID获取作品详情
export const getWorkById = (id) => {
  return worksData.find(work => work.id === id)
}

// 按类别分组
export const getWorksByCategory = () => {
  const categories = {
    tutorial: worksData.filter(work => work.category === 'tutorial'),
    component: worksData.filter(work => work.category === 'component'),
    demo: worksData.filter(work => work.category === 'demo')
  }
  return categories
}

// 获取推荐作品
export const getRecommendedWorks = (currentId, limit = 3) => {
  return worksData
    .filter(work => work.id !== currentId)
    .slice(0, limit)
}

// 搜索作品
export const searchWorks = (keyword) => {
  const lowercaseKeyword = keyword.toLowerCase()
  return worksData.filter(work => 
    work.title.toLowerCase().includes(lowercaseKeyword) ||
    work.description.toLowerCase().includes(lowercaseKeyword) ||
    work.tags.some(tag => tag.toLowerCase().includes(lowercaseKeyword))
  )
} 