// 作品数据管理
export const worksData = [
  {
    id: 'text-effects',
    title: '文字特效教学',
    description: '使用CSS阴影实现各种文字描边效果',
    demoUrl: '/demos/TutorialPage/用阴影实现描边效果.html',
    createDate: '2024-01-15',
    tags: ['CSS', 'Text Effects', '教学'],
    image: null // 暂时为空，会显示默认背景
  },
  {
    id: 'svg-path-tutorial',
    title: 'SVG Path 交互式教学',
    description: 'SVG路径命令的交互式学习平台',
    demoUrl: '/demos/TutorialPage/path/TutorialPage.html',
    createDate: '2024-01-20',
    tags: ['SVG', 'Interactive', '图形'],
    image: null
  },
  {
    id: 'canvas-tutorial',
    title: 'Canvas 基础教学',
    description: '交互式Canvas学习平台，从基础绘图到高级动画',
    demoUrl: '/demos/TutorialPage/Canvas/CanvasTutorialPage.html',
    createDate: '2024-01-25',
    tags: ['Canvas', 'Animation', 'Graphics'],
    image: null
  },
  {
    id: 'sliding-damping',
    title: '滑动阻尼效果组件',
    description: '基于Web Components实现的平滑滚动组件',
    demoUrl: '/demos/components/SlidingDamping/SlidingDamping.html',
    createDate: '2024-02-01',
    tags: ['Web Components', 'Scroll', 'Physics'],
    image: null
  },
  {
    id: 'metaball-effect',
    title: '融球效果原理教学',
    description: '深入讲解融球效果的实现原理',
    demoUrl: '/demos/components/MetaballEffect/MetaballEffect-Tutorial.html',
    createDate: '2024-02-05',
    tags: ['CSS Filter', 'Visual Effects', '原理'],
    image: null
  },
  {
    id: 'echarts-factory',
    title: 'ECharts 图表工厂',
    description: '简化图表创建流程的工厂模式实现',
    demoUrl: '/demos/components/Echarts/test.html',
    createDate: '2024-02-10',
    tags: ['ECharts', 'Factory Pattern', 'Data Visualization'],
    image: null
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