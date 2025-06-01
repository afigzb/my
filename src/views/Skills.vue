<template>
  <div class="min-h-screen bg-white relative">
    <!-- 雨幕效果 Canvas -->
    <canvas 
      ref="rainCanvas" 
      class="fixed inset-0 w-full h-full pointer-events-none z-50"
      :width="canvasWidth"
      :height="canvasHeight"
    ></canvas>

    <!-- 页面标题区域 -->
    <section class="section-base pb-12 sm:pb-16 text-center overflow-hidden">
      <!-- 背景装饰 -->
      <BackgroundDecorator variant="skills" />
      
      <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-8">
        <!-- 标题动画 -->
        <div class="animate-fade-in-up pt-12 sm:pt-16 mb-6 sm:mb-8">
          <h1 class="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6 text-gray-800">
            技术能力
          </h1>
          <div class="w-16 h-1 bg-gradient-to-r from-lime-500 to-emerald-500 mx-auto rounded-full mb-6 sm:mb-8"></div>
          <p class="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto font-light">
            持续学习和掌握现代前端技术，致力于创建高质量的用户体验
          </p>
        </div>

        <!-- 技能标签云 -->
        <div class="mb-12 sm:mb-16 animate-fade-in-up" style="animation-delay: 0.4s;">
          <div class="flex flex-wrap justify-center gap-x-3 gap-y-4 sm:gap-x-4 sm:gap-y-5 max-w-5xl mx-auto leading-relaxed">
            <drag-follow 
              v-for="(tag, index) in skillTags" 
              :key="tag"
              max-offset="10" 
              follow-speed="0.01" 
              spring-constant="0.75" 
              damping-factor="0.35" 
              max-bounce-times="4" 
              bounce-threshold="0.2"
            >
              <span 
                class="skill-cloud-tag px-3 py-1.5 sm:px-4 sm:py-2 bg-white/70 backdrop-blur-md text-gray-700 text-sm font-medium cursor-pointer rounded-full hover:bg-white/90 border border-gray-200/30 transition-all duration-300 hover:scale-105 shadow-sm"
                :style="{ 
                  animationDelay: `${index * 280}ms`
                }"
              >
                {{ tag }}
              </span>
            </drag-follow>
          </div>
        </div>
      </div>
    </section>

    <!-- 技术栈时间轴 -->
    <section class="section-base py-16 bg-gradient-to-b from-gray-50 to-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-800 mb-4">技术栈</h2>
          <div class="w-16 h-1 bg-gradient-to-r from-lime-500 to-emerald-500 mx-auto rounded-full mb-6"></div>
          <p class="text-gray-600 max-w-2xl mx-auto">
            这些是我在实际项目中有所运用的技术栈
          </p>
        </div>

        <!-- 时间轴容器 -->
        <div class="relative">
          <!-- 中心线 - 移动端在左侧，桌面端居中 -->
          <div class="absolute left-4 sm:left-1/2 sm:transform sm:-translate-x-px w-0.5 h-full bg-gray-300"></div>
          
          <!-- 技术项目 -->
          <div class="space-y-12 sm:space-y-16">
            <div 
              v-for="(skill, index) in techStack"
              :key="skill.name"
              :ref="el => setSkillRef(el, index)"
              class="relative timeline-item"
              :class="{ 'timeline-item-visible': visibleItems[index] }"
            >
              <!-- 时间轴节点 -->
              <div 
                class="timeline-dot absolute left-4 sm:left-1/2 sm:transform sm:-translate-x-1/2 -translate-y-1/2 top-8 w-4 h-4 bg-lime-500 rounded-full border-4 border-white shadow-lg z-20"
                :style="{ animationDelay: `${index * 200}ms` }"
              ></div>
              
              <!-- 内容容器 - 移动端统一右侧，桌面端交替 -->
              <div class="flex items-start">
                <!-- 移动端：左边距离时间轴，统一布局 -->
                <div class="ml-12 sm:ml-0 sm:hidden w-full">
                  <drag-follow
                    max-offset="35"
                    follow-speed="0.02"
                    spring-constant="0.75"
                    damping-factor="0.35"
                    maxBounce-times="10"
                    bounce-threshold="0.2"
                  >
                    <!-- 移动端卡片 -->
                    <div 
                      class="timeline-card w-full max-w-xs bg-white border border-gray-200 p-6 shadow-lg rounded-xl"
                      :style="{ animationDelay: `${index * 200 + 100}ms` }"
                    >
                      <!-- 技术头部 -->
                      <div class="flex items-center mb-4">
                        <div class="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mr-4">
                          <span class="text-gray-700 font-bold text-lg">{{ skill.icon }}</span>
                        </div>
                        <div class="flex-1">
                          <h3 class="text-lg font-bold text-gray-800 mb-1">{{ skill.name }}</h3>
                          <span class="text-xs text-gray-500 font-medium">{{ skill.category }}</span>
                        </div>
                      </div>

                      <!-- 技术描述 -->
                      <div class="mb-4">
                        <p class="text-sm text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-xl">
                          {{ skill.description }}
                        </p>
                      </div>

                      <!-- 项目经验 -->
                      <div class="mb-4">
                        <h4 class="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                          <span class="w-2 h-2 bg-lime-500 rounded-full mr-2"></span>
                          项目经验
                        </h4>
                        <ul class="space-y-2">
                          <li 
                            v-for="(project, projectIndex) in skill.projects"
                            :key="projectIndex"
                            class="project-item text-sm text-gray-600 leading-relaxed flex items-start"
                            :style="{ animationDelay: `${index * 200 + 200 + projectIndex * 100}ms` }"
                          >
                            <span class="w-2 h-2 bg-lime-400 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                            <span class="flex-1">{{ project }}</span>
                          </li>
                        </ul>
                      </div>

                      <!-- 技术特色 -->
                      <div class="flex flex-wrap gap-1.5">
                        <span 
                          v-for="(feature, featureIndex) in skill.technologies"
                          :key="feature"
                          class="skill-tag px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full border border-gray-200"
                          :style="{ animationDelay: `${index * 200 + 300 + featureIndex * 100}ms` }"
                        >
                          {{ feature }}
                        </span>
                      </div>
                    </div>
                  </drag-follow>
                </div>

                <!-- 桌面端：恢复原始交替布局 -->
                <div class="hidden sm:flex sm:items-start w-full" :class="index % 2 === 0 ? 'justify-start translate-x-[2%]' : 'justify-end -translate-x-[2%]'">
                  <drag-follow
                    max-offset="35"
                    follow-speed="0.02"
                    spring-constant="0.75"
                    damping-factor="0.35"
                    maxBounce-times="10"
                    bounce-threshold="0.2"
                  >
                    <!-- 桌面端卡片 - 完全恢复原状 -->
                    <div 
                      class="timeline-card w-[480px] bg-white border border-gray-200 p-8 shadow-lg rounded-xl"
                      :style="{ animationDelay: `${index * 200 + 100}ms` }"
                    >
                      <!-- 技术头部 -->
                      <div class="flex items-center mb-6">
                        <div class="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center mr-5">
                          <span class="text-gray-700 font-bold text-xl">{{ skill.icon }}</span>
                        </div>
                        <div class="flex-1">
                          <h3 class="text-xl font-bold text-gray-800 mb-1">{{ skill.name }}</h3>
                          <span class="text-sm text-gray-500 font-medium">{{ skill.category }}</span>
                        </div>
                      </div>

                      <!-- 技术描述 -->
                      <div class="mb-6">
                        <p class="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl">
                          {{ skill.description }}
                        </p>
                      </div>

                      <!-- 项目经验 -->
                      <div class="mb-6">
                        <h4 class="text-sm font-semibold text-gray-700 mb-4 flex items-center">
                          <span class="w-2 h-2 bg-lime-500 rounded-full mr-2"></span>
                          项目经验
                        </h4>
                        <ul class="space-y-3">
                          <li 
                            v-for="(project, projectIndex) in skill.projects"
                            :key="projectIndex"
                            class="project-item text-sm text-gray-600 leading-relaxed flex items-start"
                            :style="{ animationDelay: `${index * 200 + 200 + projectIndex * 100}ms` }"
                          >
                            <span class="w-2 h-2 bg-lime-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                            <span class="flex-1">{{ project }}</span>
                          </li>
                        </ul>
                      </div>

                      <!-- 技术特色 -->
                      <div class="flex flex-wrap gap-2">
                        <span 
                          v-for="(feature, featureIndex) in skill.technologies"
                          :key="feature"
                          class="skill-tag px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full border border-gray-200"
                          :style="{ animationDelay: `${index * 200 + 300 + featureIndex * 100}ms` }"
                        >
                          {{ feature }}
                        </span>
                      </div>
                    </div>
                  </drag-follow>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import BackgroundDecorator from '../components/BackgroundDecorator.vue'
import { usePageAnimations } from '../composables/usePageAnimations.js'

// 雨幕效果相关
const rainCanvas = ref(null)
const canvasWidth = ref(0)
const canvasHeight = ref(0)
let particles = []
let animationId = null
let cleanupRainEffect = null

// 粒子图案数组
const particleShapes = ['●', '◆', '▲', '★', '♦', '◎', '✦', '◉', '▼', '◀', '▶', '✧']

// 粒子类
class Particle {
  constructor(canvas) {
    this.canvas = canvas
    this.shape = particleShapes[Math.floor(Math.random() * particleShapes.length)]
    this.reset()
    this.y = Math.random() * canvas.height
    this.rotation = 0
    this.rotationSpeed = (Math.random() - 0.5) * 2 // 随机旋转速度
  }

  reset() {
    this.x = Math.random() * this.canvas.width
    this.y = -50
    this.speed = 0.5 // 固定速度0.5
    this.opacity = Math.random() * 0.4 + 0.1 // 略微增加透明度范围
    this.size = Math.random() * 8 + 6 // 粒子大小：6-14px
    this.sway = Math.random() * 0.5 - 0.25 // 左右摆动
    this.swayOffset = Math.random() * Math.PI * 2
  }

  update() {
    this.y += this.speed
    this.x += Math.sin(this.y * 0.01 + this.swayOffset) * this.sway // 添加摆动效果
    this.rotation += this.rotationSpeed * 0.1 // 缓慢旋转
    
    if (this.y > this.canvas.height + 50) {
      this.reset()
    }
  }

  draw(ctx) {
    ctx.save()
    ctx.globalAlpha = this.opacity
    ctx.fillStyle = '#84cc16' // lime-500颜色，适合页面主题
    ctx.font = `${this.size}px serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    
    // 应用旋转
    ctx.translate(this.x, this.y)
    ctx.rotate(this.rotation)
    
    ctx.fillText(this.shape, 0, 0)
    ctx.restore()
  }
}

// 初始化粒子雨效果
const initRainEffect = () => {
  if (!rainCanvas.value) return

  const canvas = rainCanvas.value
  const ctx = canvas.getContext('2d')
  
  // 设置画布尺寸
  const updateCanvasSize = () => {
    canvasWidth.value = window.innerWidth
    canvasHeight.value = window.innerHeight
    canvas.width = canvasWidth.value
    canvas.height = canvasHeight.value
  }

  updateCanvasSize()
  window.addEventListener('resize', updateCanvasSize)

  // 创建粒子
  const createParticles = () => {
    particles = []
    const particleCount = Math.floor((canvas.width * canvas.height) / 42000) // 进一步减少粒子数量
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas))
    }
  }

  createParticles()

  // 动画循环
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    particles.forEach(particle => {
      particle.update()
      particle.draw(ctx)
    })

    animationId = requestAnimationFrame(animate)
  }

  animate()

  return () => {
    window.removeEventListener('resize', updateCanvasSize)
    if (animationId) {
      cancelAnimationFrame(animationId)
    }
  }
}

// 技能标签云
const skillTags = ref([
  'JavaScript', 'Vue.js', 'Web Components', 'LitElement', 'CSS3', 
  'Canvas', 'ECharts', 'Unity', 'C#', 'Vite', 'Tailwind CSS', 
  '物理模拟', '组件化', '视觉特效', '数据可视化'
])

// 技术栈数据
const techStack = ref([
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
      '代码编辑预览器：构建ES6模块转换引擎处理export/import语法转换，通过FileManager实现多文件依赖加载与代码合并，最终写入iframe文档流实现模块化代码的实时预览'
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
])

// 滚动动画相关
const skillRefs = ref([])
const visibleItems = ref(new Array(techStack.value.length).fill(false))
let observer = null

// 设置技能项的 ref
const setSkillRef = (el, index) => {
  if (el) {
    skillRefs.value[index] = el
  }
}

// 初始化 Intersection Observer
const initObserver = () => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = skillRefs.value.findIndex(ref => ref === entry.target)
          if (index !== -1 && !visibleItems.value[index]) {
            // 添加延迟，让动画更自然
            setTimeout(() => {
              visibleItems.value[index] = true
            }, 100)
          }
        }
      })
    },
    {
      threshold: 0.2, // 当 20% 的元素可见时触发
      rootMargin: '-50px 0px' // 提前 50px 触发
    }
  )

  // 观察所有技能项
  nextTick(() => {
    skillRefs.value.forEach((ref) => {
      if (ref) {
        observer.observe(ref)
      }
    })
  })
}

// 动态加载 drag-follow 组件
const loadDragFollowComponent = async () => {
  if (!customElements.get('drag-follow')) {
    try {
      const script = document.createElement('script')
      script.type = 'module'
      script.src = '/demos/components/FocusDiv/FocusDiv.js'
      document.head.appendChild(script)
    } catch (error) {
      console.warn('Failed to load drag-follow component:', error)
    }
  }
}

// 使用动画管理
usePageAnimations({
  enableScrollEffects: true,
  staggerDelay: 0.2
})

onMounted(() => {
  loadDragFollowComponent()
  initObserver()
  cleanupRainEffect = initRainEffect()
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
  if (cleanupRainEffect) {
    cleanupRainEffect()
  }
})
</script>

<style scoped>
/* 只保留Tailwind无法实现的复杂动画 */
.skill-cloud-tag {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
  animation: skillTagFadeIn 0.8s ease-out forwards;
}

@keyframes skillTagFadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 时间轴项目初始状态 */
.timeline-item {
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

/* 时间轴项目可见状态 */
.timeline-item-visible {
  opacity: 1;
  transform: translateY(0);
}

/* 时间轴圆点动画 */
.timeline-dot {
  opacity: 0;
  transform: translateX(-50%) translateY(-50%) scale(0.5);
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.timeline-item-visible .timeline-dot {
  opacity: 1;
  transform: translateX(-50%) translateY(-50%) scale(1);
  animation: dotAppear 0.6s ease, dotPulse 2s ease-in-out 0.6s infinite;
}

/* 时间轴卡片动画 */
.timeline-card {
  opacity: 0;
  transform: translateX(-30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.timeline-item-visible .timeline-card {
  opacity: 1;
  transform: translateX(0);
}

/* 技能标签动画 */
.skill-tag {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.timeline-item-visible .skill-tag {
  opacity: 1;
  transform: translateY(0);
}

/* 项目列表项动画 */
.project-item {
  opacity: 0;
  transform: translateX(-15px);
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.timeline-item-visible .project-item {
  opacity: 1;
  transform: translateX(0);
}

/* 圆点脉冲动画 */
@keyframes dotAppear {
  0% {
    box-shadow: 0 0 0 0 rgba(132, 204, 22, 0.7);
    transform: translateX(-50%) translateY(-50%) scale(0.5);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(132, 204, 22, 0);
    transform: translateX(-50%) translateY(-50%) scale(1.1);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(132, 204, 22, 0);
    transform: translateX(-50%) translateY(-50%) scale(1);
  }
}

@keyframes dotPulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(132, 204, 22, 0.4);
    transform: translateX(-50%) translateY(-50%) scale(1);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(132, 204, 22, 0);
    transform: translateX(-50%) translateY(-50%) scale(1.05);
  }
}
</style> 