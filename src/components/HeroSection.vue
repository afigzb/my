<template>
  <!-- Hero 区域 -->
  <section class="section-base min-h-screen text-gray-800 flex items-center overflow-hidden" ref="heroSection">
    <!-- 背景装饰 -->
    <BackgroundDecorator variant="hero" viewBox="0 0 1200 1000" />

    <div class="mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
      <div class="text-center max-w-4xl mx-auto">
        <!-- 问候语 -->
        <div class="mb-6 animate-fade-in-up" style="animation-delay: 0.2s;">
          <h2 class="text-2xl font-light text-gray-600 mb-2">你好，我是</h2>
          <div class="title-divider"></div>
        </div>

        <!-- 主标题 -->
        <h1 class="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up text-gray-800" style="animation-delay: 0.4s;">
          [姓名]
        </h1>

        <!-- 副标题 -->
        <p class="text-xl md:text-2xl mb-8 text-gray-600 max-w-2xl mx-auto animate-fade-in-up font-light" style="animation-delay: 0.6s;">
          前端开发工程师
        </p>

        <!-- 描述文字 -->
        <div class="mb-12 animate-fade-in-up" style="animation-delay: 0.8s;">
          <p class="text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
            专注于创建优秀的用户体验，将设计理念转化为高质量的代码实现
          </p>
        </div>
        
        <!-- 技能标签云 -->
        <div class="mb-12 animate-fade-in-up" style="animation-delay: 1s;">
          <div class="flex flex-wrap justify-center gap-3">
            <span v-for="skill in skills" :key="skill" 
              class="px-4 py-2 card-base card-hover text-sm font-medium">
              {{ skill }}
            </span>
          </div>
        </div>

        <!-- CTA 按钮 -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style="animation-delay: 1.2s;">
          <button 
            class="button-primary"
            @click="$emit('scroll-to-works')"
          >
            查看我的作品
          </button>
          <button 
            class="button-secondary"
            @click="$emit('scroll-to-skills')"
          >
            了解技能
          </button>
        </div>
      </div>
    </div>

    <!-- 向下滚动提示 -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <div class="w-6 h-10 border-2 border-lime-400 rounded-full flex justify-center bg-white/50 backdrop-blur-sm">
        <div class="w-1 h-3 bg-lime-500 rounded-full mt-2 animate-scroll-indicator"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import BackgroundDecorator from './BackgroundDecorator.vue'
import { usePageAnimations } from '../composables/usePageAnimations.js'

// 定义事件
defineEmits(['scroll-to-works', 'scroll-to-skills'])

const heroSection = ref(null)

// 技能列表
const skills = ['Vue.js', 'React', 'TypeScript', 'Node.js', 'Python']

// 使用动画管理
usePageAnimations({
  enableScrollEffects: true,
  staggerDelay: 0.2
})
</script>

<style scoped>
/* 响应式调整 */
@media (max-width: 768px) {
  .min-h-screen {
    min-height: 100vh;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
}
</style> 