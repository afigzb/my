<template>
  <!-- 展示区域 -->
  <section class="section-base" ref="skillsSection">
    <div class="mx-auto pt-12 sm:pt-16 px-4 sm:px-8">
      <!-- 第一个水平滚动容器 - 正向滚动 -->
      <div 
        ref="scrollContainer1"
        class="skills-scroll-container overflow-x-auto mb-8 sm:mb-12"
      >
        <div class="skills-wrapper flex gap-6 sm:gap-12 pb-6 w-max px-4 sm:px-8">
          <drag-follow 
            v-for="skill in skillsData" 
            :key="skill.name + '-1'"
            max-offset="15" 
            follow-speed="0.01" 
            spring-constant="0.75" 
            damping-factor="0.35" 
            max-bounce-times="6" 
            bounce-threshold="0.2"
          >
            <div class="my-4 skill-card flex-shrink-0 p-6 sm:p-8 w-64 sm:w-80 text-center bg-white/40 backdrop-blur-sm rounded-2xl border border-gray-100 min-w-64 sm:min-w-80 transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-lg">
              <!-- 大标题 -->
              <h2 class="text-2xl sm:text-3xl font-light text-gray-700 mb-4 sm:mb-6">{{ skill.name }}</h2>
              
              <!-- 描述标签 -->
              <span class="inline-block px-6 py-2 sm:px-8 sm:py-3 bg-lime-50 text-lime-600 text-xs font-medium rounded-full border border-lime-100">
                {{ skill.description }}
              </span>
            </div>
          </drag-follow>
        </div>
      </div>

      <!-- 第二个水平滚动容器 - 反向滚动 -->
      <div 
        ref="scrollContainer2"
        class="skills-scroll-container overflow-x-auto mb-8 sm:mb-12"
      >
        <div class="skills-wrapper flex gap-6 sm:gap-12 pb-6 h-full w-max px-4 sm:px-8">
          <drag-follow
            v-for="skill in skillsData" 
            :key="skill.name + '-2'"
            max-offset="15" 
            follow-speed="0.01" 
            spring-constant="0.75" 
            damping-factor="0.35" 
            max-bounce-times="6" 
            bounce-threshold="0.2"
          >
            <div class="my-4 skill-card flex-shrink-0 p-6 sm:p-8 w-64 sm:w-80 text-center bg-white/40 backdrop-blur-sm rounded-2xl border border-gray-100 min-w-64 sm:min-w-80 transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-lg">
              <!-- 大标题 -->
              <h2 class="text-2xl sm:text-3xl font-light text-gray-700 mb-4 sm:mb-6">{{ skill.name }}</h2>
              
              <!-- 描述标签 -->
              <span class="inline-block px-6 py-2 sm:px-8 sm:py-3 bg-cyan-50 text-cyan-600 font-medium text-xs rounded-full border border-cyan-100">
                {{ skill.description }}
              </span>
            </div>
          </drag-follow>
        </div>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="relative py-12 sm:py-16">
      <!-- 背景装饰 -->
      <BackgroundDecorator variant="skills" />
      
      <!-- 中心内容区域 -->
      <div class="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6">
        <!-- 标题区域 -->
        <div class="mb-8 sm:mb-12">
          <h3 class="text-xl sm:text-2xl font-light text-gray-600 mb-4">设计理念</h3>
          <div class="title-divider mb-6 sm:mb-8"></div>
        </div>
        
        <!-- 设计理念卡片 -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div 
          v-for="concept in designConceptsData" 
          :key="concept.title"
            class="card-base card-hover">
            <div class="w-10 h-10 sm:w-12 sm:h-12 bg-lime-50 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 border border-lime-100">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 text-lime-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="concept.iconPath" />
              </svg>
            </div>
            <h4 class="text-base sm:text-lg font-medium text-gray-800 mb-2">{{ concept.title }}</h4>
            <p class="text-sm text-gray-600 leading-relaxed">{{ concept.description }}</p>
          </div>
        </div>
        
        <!-- 装饰性引用 -->
        <div>
          <blockquote class="text-base sm:text-lg text-gray-500 font-light italic mb-2">
            "简洁是最终的复杂"
          </blockquote>
          <cite class="text-sm text-gray-400 block">— Leonardo da Vinci</cite>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import BackgroundDecorator from './BackgroundDecorator.vue'
import { usePageAnimations } from '../composables/usePageAnimations.js'
import { skills, designConcepts } from '../utils/skillsData.js'

const skillsSection = ref(null)
const scrollContainer1 = ref(null)
const scrollContainer2 = ref(null)

// 从数据文件导入
const skillsData = ref(skills)
const designConceptsData = ref(designConcepts)


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
/* 只保留Tailwind无法实现的样式 */
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
  min-width: 256px; /* 移动端 w-64 */
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

@media (min-width: 640px) {
  .skill-card {
    min-width: 320px; /* 桌面端 w-80 */
  }
}

.skill-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

/* 技能包装器 */
.skills-wrapper {
  width: max-content;
  padding: 0 1rem;
}

@media (min-width: 640px) {
  .skills-wrapper {
    padding: 0 2rem;
  }
}
</style> 