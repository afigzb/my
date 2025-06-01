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
          <div class="flex flex-wrap justify-center gap-x-3 gap-y-4 sm:gap-x-4 sm:gap-y-3 max-w-5xl mx-auto leading-relaxed">
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
            这些是我在实际项目中使用过并且有深入了解的技术栈
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
    category: '编程语言 & 架构设计',
    icon: 'JS',
    description: '深度掌握ES6+语法，精通组件化架构设计、设计模式应用、性能优化算法。具备复杂业务逻辑抽象能力和高质量代码组织能力。',
    projects: [
      '虚拟滚动组件：VirtualLogic视口计算、ScrollLogic位置追踪、RenderLogic DOM节点池复用',
      '级联选择器：Observable响应式状态管理、动态列生成、纯函数数据驱动设计',
      '日历组件：多视图策略模式、四层架构设计、按需CSS加载、观察者事件系统',
      '穿梭框组件：抽象基类设计、继承扩展模式、虚拟分页、复杂全选逻辑',
      '单列选择器：取模算法无限滚动、scrollTop计算定位、物理阻尼回弹效果'
    ],
    technologies: ['设计模式', '算法应用', '性能优化', '架构设计', '状态管理']
  },
  {
    name: 'Web Components',
    category: '现代组件技术',
    icon: 'WC',
    description: '主导企业级组件库开发，熟练运用LitElement、Shadow DOM实现高质量可复用组件。深入理解组件生命周期和物理模拟在交互中的应用。',
    projects: [
      '交互组件库：LitElement企业级组件系统、Shadow DOM样式隔离',
      '拖拽跟随组件：胡克定律物理弹性效果、阻尼模型真实回弹模拟',
      '滚动阻尼组件：物理模型GPU加速、requestAnimationFrame优化、双端适配',
      '音频控制器：Web Audio API集成、实时波形显示、音频处理算法',
      '代码编辑预览器：实时编译预览、语法高亮、错误提示系统'
    ],
    technologies: ['LitElement', 'Shadow DOM', '物理模拟', 'Web Audio API', '实时编译']
  },
  {
    name: 'Vue.js',
    category: '前端框架 & 性能优化',
    icon: 'V',
    description: '深度运用Vue生态，擅长性能优化和用户体验提升。实现复杂交互动画、懒加载优化、响应式布局等高级功能。',
    projects: [
      '个人作品网站：懒加载分段式加载、路由预加载、首屏优化',
      '响应式时间轴：动态动画系统、滚动监听优化、Intersection Observer应用',
      '拖拽集成：自定义指令封装、组件通信、状态同步机制',
      '组件化架构：Composition API深度应用、Pinia状态管理、TypeScript集成'
    ],
    technologies: ['Composition API', '性能优化', '懒加载', '动画系统', '响应式设计']
  },
  {
    name: 'CSS3 & 视觉特效',
    category: '视觉效果 & 动画技术',
    icon: 'C',
    description: '精通现代CSS技术和视觉特效开发，创造性地运用CSS实现复杂视觉效果。结合物理原理设计自然流畅的动画交互。',
    projects: [
      '特效库：12种CSS特效（3D变换、霓虹光效、金属质感、文本描边）',
      '故障艺术：RGB通道分离、动态裁剪路径、Shadow DOM封装',
      '响应式系统：Tailwind CSS工程化、原子化设计、主题系统',
      'GPU加速动画：transform3d优化、will-change性能提升、60fps流畅体验'
    ],
    technologies: ['视觉特效', '3D动画', 'GPU加速', 'Tailwind CSS', '故障艺术']
  },
  {
    name: 'Canvas & 图形编程',
    category: '图形渲染 & 算法应用',
    icon: 'CV',
    description: '掌握Canvas 2D渲染和Path路径操作，实现粒子系统、实时图形渲染等复杂视觉效果。结合数学算法创造流畅的动画体验。',
    projects: [
      '粒子系统：实时粒子追踪渲染、物理碰撞检测、性能优化',
      '光标特效：Canvas粒子跟随、mix-blend-mode差值混合、动态轨迹生成',
      '绘图工具：Path路径绘制、图形变换算法、实时预览系统',
      '数据可视化：自定义图表渲染、动态数据绑定、交互式图形'
    ],
    technologies: ['Canvas 2D', 'Path API', '粒子系统', '图形算法', '实时渲染']
  },
  {
    name: 'ECharts 数据可视化',
    category: '数据可视化 & 工厂模式',
    icon: 'E',
    description: '构建企业级图表工厂系统，运用工厂模式和模块化设计统一管理图表配置。深度定制ECharts满足复杂业务需求。',
    projects: [
      '图表工厂：8种图表类型工厂模式封装（直角坐标系、极坐标系、无坐标系）',
      '配置系统：模块化配置策略、主题动态切换、响应式适配算法',
      '交互增强：自定义tooltip、图表联动、实时数据更新机制',
      '性能优化：大数据量渲染优化、Canvas/SVG渲染切换、内存管理'
    ],
    technologies: ['工厂模式', '模块化配置', '大数据渲染', '图表联动', '主题系统']
  },
  {
    name: 'Unity & C#',
    category: '游戏开发 & 物理模拟',
    icon: 'U',
    description: '具备2D游戏开发经验，理解物理模拟、状态机等核心概念。将游戏开发的交互理念应用到前端开发中，提升用户体验。',
    projects: [
      '2D横版游戏：类恶魔城游戏机制、角色控制器、关卡设计',
      '物理系统：碰撞检测算法、重力模拟、弹性碰撞计算',
      '状态机：游戏状态管理、动画状态转换、事件驱动架构',
      '交互设计：游戏UI系统、输入处理、反馈机制设计'
    ],
    technologies: ['2D游戏开发', '物理模拟', '状态机', '碰撞检测', '交互设计']
  },
  {
    name: 'Vite & 现代工具链',
    category: '工程化 & 构建优化',
    icon: 'VT',
    description: '深度应用现代前端工具链，优化开发体验和构建性能。熟练配置复杂项目的打包、热更新、代码分割等工程化需求。',
    projects: [
      '构建优化：多项目Vite配置、代码分割策略、打包体积优化',
      '开发效率：热更新配置、模块替换、开发服务器优化',
      '插件开发：自定义Vite插件、构建流程扩展、自动化部署',
      '性能监控：构建分析、bundle大小监控、加载性能优化'
    ],
    technologies: ['模块化打包', '热更新', '插件开发', '性能监控', '自动化部署']
  },
  {
    name: '综合设计能力',
    category: 'UI设计 & 内容创作',
    icon: 'DS',
    description: '从技术实现到视觉设计的综合能力。擅长将技术与设计结合，创造有温度的用户体验。',
    projects: [
      'UI设计：个人作品网站整体UI设计，响应式布局规划，视觉层次构建',
      '文档编写：技术博客内容创作，Markdown文档编写，项目说明文档',
      'Office应用：Word文档排版，Excel数据处理，PPT演示文稿制作'
    ],
    technologies: ['UI/UX设计', 'Photoshop', 'Markdown', 'Office套件', '内容创作']
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