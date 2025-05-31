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
    id: 'echarts-factory',
    title: 'ECharts 图表工厂',
    description: '基于工厂设计模式实现的ECharts图表创建工具，简化了复杂图表的配置流程。通过标准化的接口和模板，开发者可以快速创建柱状图、折线图、饼图等多种数据可视化图表，同时保持了高度的可定制性和扩展性。',
    demoUrl: '/demos/components/Echarts/test.html',
    tags: ['ECharts', 'Factory Pattern', 'Data Visualization'],
    image: '/img/echarts.png'
  },
  {
    id: 'tetris-game',
    title: '俄罗斯方块',
    description: '使用Canvas技术重现的经典俄罗斯方块游戏，完整实现了方块下落、旋转、消除等核心游戏机制。采用面向对象的设计思路，代码结构清晰，包含完整的游戏状态管理、碰撞检测和分数系统，是学习游戏开发的优秀案例。',
    demoUrl: '/demos/TutorialPage/Canvas/基础教学/俄罗斯方块.html',
    tags: ['Game', 'Canvas', 'Classic'],
    image: '/img/俄罗斯方块.png'
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
    id: 'text-effects',
    title: '文字特效教学',
    description: '深入探讨CSS文字效果实现技巧的教学项目，详细讲解如何使用text-shadow、box-shadow等属性创建各种炫酷的文字描边、发光、立体等视觉效果。通过实际案例演示，帮助开发者掌握CSS高级特效的制作方法。',
    demoUrl: '/demos/TutorialPage/用阴影实现描边效果.html',
    tags: ['CSS', 'Text Effects', '教学'],
    image: '/img/文字效果.png'
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
    description: '现代化音频播放器Web组件的完整开发教程，展示了如何使用Web Audio API构建功能丰富的音频播放器。支持波形可视化、音量控制、进度控制等特性，组件采用原生Web Components技术，具有良好的兼容性和可重用性。',
    demoUrl: '/demos/components/AudioPlayer/TutorialPage/TutorialPage.html',
    tags: ['Web Components', 'Audio', 'Tutorial'],
    image: '/img/AudioPlayer.png'
  },
  {
    id: 'codeeditor-tutorial',
    title: 'CodeEditorPreview 组件教程',
    description: '专业级代码编辑器组件的开发指南，集成了语法高亮、代码补全、实时预览等强大功能。支持多种编程语言，提供了丰富的主题和插件系统。详细讲解了Monaco Editor的集成方案和自定义扩展开发，适合构建在线IDE或代码演示平台。',
    demoUrl: '/demos/components/CodeEditorPreview/TutorialPage/TutorialPage.html',
    tags: ['Code Editor', 'Preview', 'Tutorial'],
    image: '/img/CodeEditorPreview.png'
  },
  {
    id: 'fault-text-effect',
    title: '故障文字效果',
    description: '赛博朋克风格的故障艺术文字特效组件，通过CSS动画和滤镜技术实现数字失真、色彩分离、闪烁抖动等视觉效果。支持多种故障模式和自定义参数，为网站添加独特的科技感和未来感，特别适合游戏、科技类项目使用。',
    demoUrl: '/demos/components/FaultTextEffect/index.html',
    tags: ['Text Effects', 'Animation', 'Glitch'],
    image: '/img/故障文字.png'
  },
  {
    id: 'metaball-component',
    title: '融球效果组件',
    description: '可交互的融球视觉效果Web组件，基于SVG滤镜和Canvas技术实现流体般的融合动画。组件支持鼠标跟随、重力模拟、碰撞检测等物理效果，提供了丰富的配置选项来调整球体数量、大小、颜色等参数，是创建动态背景和交互效果的理想选择。',
    demoUrl: '/demos/components/MetaballEffect/MetaballEffect.html',
    tags: ['Web Components', 'Visual Effects', 'Interactive'],
    image: '/img/融球效果.png'
  },
  {
    id: 'thunder-fighter',
    title: '雷霆战机',
    description: '经典的2D飞行射击游戏，使用Canvas技术完整实现了游戏的各个系统模块。包含飞机控制、子弹发射、敌机AI、碰撞检测、道具系统、关卡设计等完整的游戏机制。代码结构采用模块化设计，展示了游戏开发的最佳实践和设计模式应用。',
    demoUrl: '/demos/TutorialPage/Canvas/基础教学/雷霆战机.html',
    tags: ['Game', 'Canvas', 'Shooter'],
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