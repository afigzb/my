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
              v-for="(tag, index) in skillTagsData" 
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
              v-for="(skill, index) in techStackData"
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
import { skillTags } from '../utils/skillsData.js'
import { techStack } from '../utils/techStackData.js'

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

// 从数据文件导入
const skillTagsData = ref(skillTags)
const techStackData = ref(techStack)

// 滚动动画相关
const skillRefs = ref([])
const visibleItems = ref(new Array(techStackData.value.length).fill(false))
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