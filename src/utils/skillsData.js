// 技能数据管理
export const skills = [
  { name: '组件封装', description: '注重复用与解耦' },
  { name: '面向对象', description: '封装继承多态实践' },
  { name: '开发原则', description: 'DRY/KISS/YAGNI 应用' },
  { name: '数据驱动', description: '用数据驱动界面渲染' },
  { name: '用户交互', description: '偏好动态交互设计' },
  { name: '职责划分', description: '遵循 SRP/MVC 思维' },
  { name: '响应式设计', description: '兼容多端设备展示' },
  { name: '性能优化', description: '优化加载与渲染性能' },
  { name: '结构可维护', description: '代码清晰便于维护' }
]

// 设计理念
export const designConcepts = [
  {
    title: '简洁至上',
    description: '去除视觉与交互上的冗余，聚焦核心功能，提升内容的可感知性与效率',
    iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    title: '单一职责',
    description: '每个组件仅处理其职责范围内的功能，通过组合构建可维护的复杂界面',
    iconPath: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
  },
  {
    title: '体验为本',
    description: '以用户操作路径为导向，优化交互节奏与界面反馈，增强整体使用流畅度',
    iconPath: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
  }
]

// 技能标签云
export const skillTags = [
  'JavaScript', 'Vue.js', 'Web Components', 'LitElement', 'CSS3', 
  'Canvas', 'ECharts', 'Unity', 'C#', 'Vite', 'Tailwind CSS', 
  '物理模拟', '组件化', '视觉特效', '数据可视化'
] 