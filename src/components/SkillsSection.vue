<template>
  <!-- 展示区域 -->
  <section class="section-base" ref="skillsSection">
    <div class="mx-auto pt-32 sm:px-6 lg:px-8">
      <!-- 第一个水平滚动容器 - 正向滚动 -->
      <div 
        ref="scrollContainer1"
        class="skills-scroll-container overflow-x-auto mb-16"
      >
        <div class="skills-wrapper flex gap-12 pb-6">
          <drag-follow
            v-for="skill in skills" 
            :key="skill.name + '-1'"
            max-offset="15" 
            follow-speed="0.01" 
            spring-constant="0.75" 
            damping-factor="0.35" 
            max-bounce-times="6" 
            bounce-threshold="0.2"
          >
            <div class="my-4 skill-card flex-shrink-0 p-8 w-80 text-center bg-white/40 backdrop-blur-sm rounded-2xl border border-gray-100">
              <!-- 大标题 -->
              <h2 class="text-3xl font-light text-gray-700 mb-6">{{ skill.name }}</h2>
              
              <!-- 描述标签 -->
              <span class="inline-block px-8 py-3 bg-lime-50 text-lime-600 text-xs font-medium rounded-full border border-lime-100">
                {{ skill.description }}
              </span>
            </div>
          </drag-follow>
        </div>
      </div>

      <!-- 第二个水平滚动容器 - 反向滚动 -->
      <div 
        ref="scrollContainer2"
        class="skills-scroll-container overflow-x-auto mb-16"
      >
        <div class="skills-wrapper flex gap-12 pb-6 h-full">
          <drag-follow
            v-for="skill in skills" 
            :key="skill.name + '-2'"
            max-offset="15" 
            follow-speed="0.01" 
            spring-constant="0.75" 
            damping-factor="0.35" 
            max-bounce-times="6" 
            bounce-threshold="0.2"
          >
            <div class="my-4 skill-card flex-shrink-0 p-8 w-80 text-center bg-white/40 backdrop-blur-sm rounded-2xl border border-gray-100">
              <!-- 大标题 -->
              <h2 class="text-3xl font-light text-gray-700 mb-6">{{ skill.name }}</h2>
              
              <!-- 描述标签 -->
              <span class="inline-block px-8 py-3 bg-cyan-50 text-cyan-600 font-medium text-xs rounded-full border border-cyan-100">
                {{ skill.description }}
              </span>
            </div>
          </drag-follow>
        </div>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="relative py-20">
      <!-- 背景装饰 -->
      <BackgroundDecorator variant="skills" />
      
      <!-- 中心内容区域 -->
      <div class="relative z-10 max-w-4xl mx-auto text-center px-6">
        <!-- 标题区域 -->
        <div class="mb-12">
          <h3 class="text-2xl font-light text-gray-600 mb-4">设计理念</h3>
          <div class="title-divider mb-8"></div>
        </div>
        
        <!-- 设计理念卡片 -->
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="concept in designConcepts" :key="concept.title"
            class="card-base card-hover">
            <div class="w-12 h-12 bg-lime-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-lime-100">
              <svg class="w-6 h-6 text-lime-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="concept.iconPath" />
              </svg>
            </div>
            <h4 class="text-lg font-medium text-gray-800 mb-2">{{ concept.title }}</h4>
            <p class="text-sm text-gray-600">{{ concept.description }}</p>
          </div>
        </div>
        
        <!-- 装饰性引用 -->
        <div class="mt-16">
          <blockquote class="text-lg text-gray-500 font-light italic">
            "简洁是最终的复杂"
          </blockquote>
          <cite class="text-sm text-gray-400 mt-2 block">— Leonardo da Vinci</cite>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import BackgroundDecorator from './BackgroundDecorator.vue'
import { usePageAnimations } from '../composables/usePageAnimations.js'

const skillsSection = ref(null)
const scrollContainer1 = ref(null)
const scrollContainer2 = ref(null)

// 技能数据
const skills = ref([
  { name: '组件封装', description: '注重复用与解耦' },
  { name: '面向对象', description: '封装继承多态实践' },
  { name: '开发原则', description: 'DRY/KISS/YAGNI 应用' },
  { name: '数据驱动', description: '用数据驱动界面渲染' },
  { name: '用户交互', description: '偏好动态交互设计' },
  { name: '职责划分', description: '遵循 SRP/MVC 思维' },
  { name: '响应式设计', description: '兼容多端设备展示' },
  { name: '性能优化', description: '优化加载与渲染性能' },
  { name: '结构可维护', description: '代码清晰便于维护' }
])

// 设计理念
const designConcepts = [
  {
    title: '高效简洁',
    description: '追求代码的简洁性和执行效率，拒绝过度工程化',
    iconPath: 'M13 10V3L4 14h7v7l9-11h-7z'
  },
  {
    title: '模块化思维',
    description: '构建可复用的组件，保持代码结构的清晰与可维护性',
    iconPath: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
  },
  {
    title: '用户体验',
    description: '以用户为中心，创造流畅自然的交互体验',
    iconPath: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
  }
]

// 全局滚轮事件处理
const handleGlobalWheel = (event) => {
  event.preventDefault()
  
  // 第一个容器正向滚动
  if (scrollContainer1.value) {
    scrollContainer1.value.scrollLeft += event.deltaY
  }
  
  // 第二个容器反向滚动
  if (scrollContainer2.value) {
    scrollContainer2.value.scrollLeft -= event.deltaY
  }
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
usePageAnimations()

// 组件挂载后的处理
onMounted(() => {
  loadDragFollowComponent()
  
  // 添加全局滚轮事件监听
  window.addEventListener('wheel', handleGlobalWheel, { passive: false })
  
  // 设置第二个容器的初始滚动位置到最右边
  setTimeout(() => {
    if (scrollContainer2.value) {
      scrollContainer2.value.scrollLeft = scrollContainer2.value.scrollWidth - scrollContainer2.value.clientWidth
    }
  }, 100)
})

onUnmounted(() => {
  // 清理全局滚轮事件监听
  window.removeEventListener('wheel', handleGlobalWheel)
})
</script>

<style scoped>
/* 隐藏滚动条 */
.skills-scroll-container::-webkit-scrollbar {
  display: none;
}

.skills-scroll-container {
  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-behavior: smooth;
}

/* 技能卡片样式 */
.skill-card {
  min-width: 320px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.skill-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

/* 技能包装器 */
.skills-wrapper {
  width: max-content;
  padding: 0 2rem;
}
</style> 