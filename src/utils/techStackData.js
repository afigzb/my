// 技术栈数据管理
export const techStack = [
  {
    name: 'JavaScript',
    category: '编程语言 & 抽象思维',
    icon: 'JS',
    description: '基于LitElement构建企业组件库。',
    projects: [
      '虚拟滚动组件：三层架构分离 - VirtualLogic视口计算、ScrollLogic位置追踪、RenderLogic节点池复用，支持10万+数据流畅渲染',
      '时间滚轮选择器：基于scrollTop精确定位，实现无限循环滚动与居中吸附，支持触摸和鼠标交互',
      '级联选择器：采用Observable状态管理 + 分层架构，通过CascadingState实现数据驱动的多级联动',
      '日历组件：MVC架构 + 按需CSS加载，支持年/月/周/日/编辑/范围等多视图，基于观察者模式的事件系统',
      '穿梭框组件：继承式架构设计，封装TransferDataManager数据层，支持虚拟分页和表格模式扩展'
    ],
    technologies: ['LitElement', '性能优化', '开发模式', '状态管理', '模板解析']
  },
  {
    name: 'Web Components',
    category: '现代组件技术',
    icon: 'WC',
    description: '个人组件库开发，运用Web Components实现泛用的前端组件。利用物理模拟的方式实现了具备交互性的组件，并将其发表在个人博客。',
    projects: [
      '弹性回弹组件：通过deltaTime时间增量驱动物理计算，每帧计算弹簧力与阻尼力的合力更新速度位置，配合速度方向检测控制回弹次数实现自然衰减效果',
      '滚动阻尼组件：采用currentY += (targetY - currentY) * damping线性插值公式，配合will-change+transform触发GPU合成层，按设备类型动态调节阻尼系数优化触控体验',
      '音频播放器：设计Data-Controller-Component三层架构解耦业务逻辑与UI渲染，通过TrackSwitchController实现四种播放模式的切歌算法，状态变化采用观察者模式自动更新界面',
      '代码编辑预览器：通过正则表达式处理 export/import 语法转换，结合 FileManager 实现多文件依赖加载与代码合并，最终渲染到预览容器实现模块化代码的实时预览'
    ],
    technologies: ['Web Components', 'Shadow DOM', '物理模拟', 'ES6语法转换', '模块化架构']
  },
  {
    name: 'Vue.js',
    category: '前端框架 & 性能优化',
    icon: 'V',
    description: '个人作品展示网站开发。通过懒加载、异步组件、css动画等技术提升用户体验，集成上一条目中的Web Components组件库，开发一个属于自己作品的展示网站。',
    projects: [
      '懒加载分段式：在"首页"利用defineAsyncComponent异步加载重型组件，Suspense处理加载状态，延迟加载次要功能避免阻塞首屏',
      '响应式时间轴：在"技能"页面利用Intersection Observer智能触发组件加载，结合CSS动画实现滚动监听的渐入效果，提前200px预加载优化体验',
      '路由过渡优化：自定义circle-expand过渡动画，mode="out-in"避免布局闪烁，clip-path实现圆形扩散效果',
      'Web组件集成：动态加载自研组件库（拖拽、音频、代码编辑器），并避免重复加载，模块化管理组件依赖'
    ],
    technologies: ['Vue3 Composition', 'defineAsyncComponent', 'Intersection Observer', 'Suspense', 'Web Components集成']
  },
  {
    name: 'CSS3 & 视觉特效',
    category: '视觉效果 & 高级CSS技术',
    icon: 'C',
    description: '运用CSS特性创造视觉效果。通过阴影叠加、路径裁剪、滤镜变换等技术实现复杂的视觉表现。',
    projects: [
      '阴影叠加技术：利用多层text-shadow和box-shadow创建描边、发光、3D立体等效果，通过阴影偏移和模糊半径控制视觉层次',
      '路径裁剪系统：运用clip-path和SVG path实现复杂图形裁剪，结合CSS动画创建动态的可视区域变化效果',
      '滤镜合成应用：使用filter属性的blur、contrast、brightness等进行图像处理，实现融球效果等视觉合成',
      'GPU合成层优化：通过transform3d、will-change触发硬件加速，配合backdrop-filter实现高性能的模糊和透明效果'
    ],
    technologies: ['多层阴影', 'clip-path裁剪', 'CSS滤镜', 'GPU硬件加速', 'SVG路径']
  },
  {
    name: 'Canvas & 图形编程',
    category: '图形渲染 & 基础应用',
    icon: 'CV',
    description: 'Canvas 2D图形编程的学习和实践。主要是基础的绘图操作和简单的动画效果，通过教学项目理解图形渲染的基本原理。',
    projects: [
      '基础绘图教学：Canvas基本绘图API的学习和演示，包括路径绘制、填充描边、图形变换等基础操作',
      '简单动画效果：requestAnimationFrame实现基础动画循环，粒子移动、颜色变化等简单的动态效果',
      '交互响应处理：鼠标事件监听和Canvas坐标转换，实现基本的鼠标跟随和点击响应',
      '教学项目整理：将学习过程整理成教程页面，利用之前做的代码展示组件，构造出完整的教学页面'
    ],
    technologies: ['Canvas 2D API', '基础动画', '事件处理', '坐标变换', '教学演示']
  },
  {
    name: 'ECharts 数据可视化',
    category: '抽象设计 & 架构能力',
    icon: 'E',
    description: '设计图表工厂系统，将8种不同图表类型抽象为统一配置模型。通过多层抽象设计（图表类型->坐标系统->配置生成），实现高度可扩展的图表解决方案。',
    projects: [
      '多层抽象架构：CHART_TYPE_CONFIGS抽象图表类型，COORDINATE_SYSTEMS抽象坐标系统，将复杂的ECharts配置抽象为简洁的工厂接口',
      '配置驱动模式：通过generateOptions核心算法，将数据对象和配置参数转换为完整ECharts配置，支持深度合并、主题切换、预设模式',
      '工厂模式实现：EChartFactory2类封装图表生命周期管理，支持链式调用、动态类型切换、响应式更新，统一8种图表的创建逻辑',
      '插件化系统设计：主题系统、工具箱配置、预设配置的模块化管理，支持运行时动态扩展和自定义样式注入'
    ],
    technologies: ['工厂设计模式', '多层抽象', '配置驱动', '插件化架构', '生命周期管理']
  },
  {
    name: 'Unity & C#',
    category: '毕业设计 & 游戏开发',
    icon: 'U',
    description: '毕业设计项目，较为完整的2D横版游戏开发。走完整体规划、系统设计和完整实现的全部流程，涉及游戏机制设计、代码架构、关卡设计等。',
    projects: [
      '游戏开发：较为全面的2D横版动作游戏，包含关卡制作、敌人AI、道具系统、存档点',
      '游戏系统设计：角色控制系统、战斗系统、、技能装备系统的整体架构设计和实现，状态机管理角色行为',
      '项目管理：作为毕业设计的完整项目流程，从需求分析到最终答辩，锻炼了项目规划和执行能力'
    ],
    technologies: ['Unity 2D开发', 'C#编程', '游戏系统设计', '项目经验', '毕业设计答辩']
  },
  {
    name: 'Vite & 现代工具链',
    category: '基础工程化 & 静态部署',
    icon: 'VT',
    description: '基础的现代前端工具使用，主要是利用Vite的默认配置进行项目构建和开发。走通静态资源打包上传到阿里云的流程。',
    projects: [
      '项目构建：使用Vite默认配置进行Vue项目的开发和打包，基本的npm run dev和npm run build操作',
      '静态部署：将打包后的dist文件夹部署到阿里云云服务器，了解基础的部署流程和域名配置',
      '开发环境：利用Vite的热更新功能进行开发，了解基本的开发服务器配置',
      '依赖管理：使用npm进行包管理，了解package.json最简单的配置'
    ],
    technologies: ['Vite基础使用', 'npm包管理', '静态部署']
  },
  {
    name: '综合设计能力',
    category: 'UI设计 & 内容创作',
    icon: 'DS',
    description: '从技术实现到视觉设计的综合能力。将写好的组件库与设计结合，独立完成从设计到实现的个人页面开发。',
    projects: [
      'UI设计：个人作品网站整体UI设计，响应式布局规划，视觉效果构建',
      '文档编写：技术博客内容创作，Markdown文档编写，项目说明文档',
      'Office应用：Word文档排版，Excel数据处理，PPT演示文稿制作'
    ],
    technologies: ['UI/UX设计', 'Markdown', 'Office套件', '内容创作']
  }
] 