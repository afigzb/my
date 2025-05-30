<template>
  <div class="min-h-screen bg-white">
    <!-- 页面标题区域 -->
    <section class="section-base  pb-16 text-center overflow-hidden">
      <!-- 背景装饰 -->
      <BackgroundDecorator variant="skills" />
      
      <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- 标题动画 -->
        <div class="animate-fade-in-up pt-16 mb-8">
          <h1 class="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            技术能力
          </h1>
          <div class="title-divider mb-8"></div>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto font-light">
            持续学习和掌握现代前端技术，致力于创建高质量的用户体验
          </p>
        </div>

        <!-- 技能标签云 -->
        <div class="mb-16 animate-fade-in-up" style="animation-delay: 0.4s;">
          <div class="flex flex-wrap justify-center gap-3">
            <drag-follow 
              v-for="tag in skillTags" 
              :key="tag"
              max-offset="10" 
              follow-speed="0.01" 
              spring-constant="0.75" 
              damping-factor="0.35" 
              max-bounce-times="4" 
              bounce-threshold="0.2"
            >
              <span class="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium cursor-pointer rounded-full hover:bg-gray-200 transition-colors">
                {{ tag }}
              </span>
            </drag-follow>
          </div>
        </div>
      </div>
    </section>

    <!-- 技术栈时间轴 -->
    <section class="section-base py-16">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-800 mb-4">技术栈</h2>
          <div class="title-divider mb-6"></div>
          <p class="text-gray-600 max-w-2xl mx-auto">
            这些是我在实际项目中使用过并且有深入了解的技术栈
          </p>
        </div>

        <!-- 时间轴容器 -->
        <div class="relative">
          <!-- 中心线 -->
          <div class="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-200"></div>
          
          <!-- 技术项目 -->
          <div class="space-y-16">
            <div 
              v-for="(skill, index) in techStack"
              :key="skill.name"
              :ref="el => setSkillRef(el, index)"
              class="relative timeline-item"
              :class="{ 'timeline-item-visible': visibleItems[index] }"
            >
              <!-- 时间轴节点 (固定位置，不参与drag-follow) -->
              <div 
                class="timeline-dot absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-8 w-4 h-4 bg-lime-500 rounded-full border-4 border-white shadow-lg z-20"
                :style="{ animationDelay: `${index * 200}ms` }"
              ></div>
              
              <!-- 内容容器 -->
              <div class="flex items-start" :class="index % 2 === 0 ? 'justify-start' : 'justify-end'">
                <drag-follow
                  max-offset="35"
                  follow-speed="0.02"
                  spring-constant="0.75"
                  damping-factor="0.35"
                  maxBounce-times="10"
                  bounce-threshold="0.2"
                >
                  <!-- 内容卡片 -->
                  <div 
                    class="timeline-card w-96 bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
                    :style="{ animationDelay: `${index * 200 + 100}ms` }"
                  >
                    <!-- 技术头部 -->
                    <div class="flex items-center mb-4">
                      <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                        <span class="text-gray-700 font-bold text-lg">{{ skill.icon }}</span>
                      </div>
                      <div>
                        <h3 class="text-xl font-bold text-gray-800">{{ skill.name }}</h3>
                        <span class="text-sm text-gray-500">{{ skill.category }}</span>
                      </div>
                    </div>

                    <!-- 熟练度 -->
                    <div class="mb-4">
                      <div class="flex justify-between items-center mb-2">
                        <span class="text-sm font-medium text-gray-600">熟练度</span>
                        <span class="text-sm text-gray-500">{{ skill.proficiency }}%</span>
                      </div>
                      <div class="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          class="skill-progress bg-lime-500 h-2 rounded-full transition-all duration-1000"
                          :style="visibleItems[index] ? `width: ${skill.proficiency}%` : 'width: 0%'"
                        ></div>
                      </div>
                    </div>

                    <!-- 项目经验 -->
                    <div class="mb-4">
                      <h4 class="text-sm font-semibold text-gray-700 mb-2">项目经验</h4>
                      <p class="text-sm text-gray-600 leading-relaxed">{{ skill.experience }}</p>
                    </div>

                    <!-- 技术特色 -->
                    <div class="flex flex-wrap gap-2">
                      <span 
                        v-for="(feature, featureIndex) in skill.features"
                        :key="feature"
                        class="skill-tag px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
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
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import BackgroundDecorator from '../components/BackgroundDecorator.vue'
import { usePageAnimations } from '../composables/usePageAnimations.js'

// 技能标签云
const skillTags = ref([
  'Vue.js', 'JavaScript', 'TypeScript', 'React', 'Node.js', 
  'CSS3', 'HTML5', 'Webpack', 'Vite', 'Git'
])

// 技术栈数据
const techStack = ref([
  {
    name: 'Vue.js',
    category: '前端框架',
    icon: 'V',
    proficiency: 85,
    experience: '使用Vue.js开发了多个企业级后台管理系统，熟练运用Composition API、Pinia状态管理、Vue Router等生态工具。完成了组件库封装和性能优化工作。',
    features: ['组件化开发', 'SPA应用', '状态管理', '路由控制']
  },
  {
    name: 'JavaScript',
    category: '编程语言',
    icon: 'JS',
    proficiency: 90,
    experience: '深入理解ES6+语法特性，熟练使用Promise、async/await处理异步编程。在项目中广泛应用函数式编程思想，编写可复用的工具函数。',
    features: ['ES6+语法', '异步编程', '函数式编程', '模块化开发']
  },
  {
    name: 'TypeScript',
    category: '编程语言',
    icon: 'TS',
    proficiency: 75,
    experience: '在大型项目中使用TypeScript提升代码质量和开发效率，熟练运用泛型、接口、装饰器等高级特性，建立了完整的类型定义体系。',
    features: ['类型系统', '接口定义', '泛型编程', '装饰器模式']
  },
  {
    name: 'React',
    category: '前端框架',
    icon: 'R',
    proficiency: 70,
    experience: '使用React开发了多个中小型项目，熟悉Hooks、Context API等核心概念。在项目中实践了组件设计模式和性能优化策略。',
    features: ['Hooks', 'Context API', '组件设计', '性能优化']
  },
  {
    name: 'Node.js',
    category: '后端技术',
    icon: 'N',
    proficiency: 65,
    experience: '使用Node.js构建RESTful API和中间件服务，配合Express框架开发后端应用。参与了微服务架构的设计和实现工作。',
    features: ['API开发', 'Express框架', '中间件', '微服务']
  },
  {
    name: 'CSS3',
    category: '样式技术',
    icon: 'C',
    proficiency: 88,
    experience: '精通现代CSS技术，包括Flexbox、Grid布局、CSS动画等。在项目中实现了复杂的响应式设计和交互动效，注重用户体验。',
    features: ['响应式设计', 'CSS动画', 'Flexbox/Grid', '预处理器']
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
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
/* 标题分割线 */
.title-divider {
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #84cc16, #22c55e);
  margin: 0 auto;
  border-radius: 2px;
}

/* 时间轴间距 */
.space-y-16 > * + * {
  margin-top: 4rem;
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
  animation: dotPulse 0.6s ease;
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

/* 进度条动画 */
.skill-progress {
  transition-delay: 0.3s;
}

/* 圆点脉冲动画 */
@keyframes dotPulse {
  0% {
    box-shadow: 0 0 0 0 rgba(132, 204, 22, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(132, 204, 22, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(132, 204, 22, 0);
  }
}

/* 响应式处理 */
@media (max-width: 768px) {
  .w-96 {
    width: 90%;
    max-width: 350px;
  }
  
  /* 移动端时间轴调整 */
  .justify-end {
    justify-content: flex-start !important;
  }
  
  /* 移动端圆点位置调整 */
  .absolute.left-1\/2 {
    left: 2rem;
    transform: translateX(0) translateY(-50%);
  }
  
  /* 移动端中心线调整 */
  .absolute.left-1\/2.w-0\.5 {
    left: 2rem;
    transform: translateX(-50%);
  }

  /* 移动端卡片动画调整 */
  .timeline-card {
    transform: translateX(-20px);
  }
}
</style> 