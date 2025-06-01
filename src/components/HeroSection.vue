<template>
  <!-- Hero 区域 -->
  <section class="section-base min-h-screen text-gray-800 flex items-center overflow-hidden" ref="heroSection">
    <!-- 背景装饰 -->
    <BackgroundDecorator variant="hero" viewBox="0 0 1200 1000" />
    
    <!-- 与全局线条的连接装饰 -->
    <div class="connection-elements absolute left-[15%] top-0 bottom-0 z-[2] pointer-events-none">
      <div class="connection-dot absolute w-1.5 h-1.5 bg-lime-500/80 rounded-full -left-0.5 top-[20%] shadow-lime-500/30 connection-dot-top"></div>
      <div class="connection-dot absolute w-1.5 h-1.5 bg-lime-500/80 rounded-full -left-0.5 bottom-[15%] shadow-lime-500/30 connection-dot-bottom"></div>
    </div>

    <div class="mx-auto px-4 sm:px-8 w-full relative z-10">
      <div class="text-center mx-auto">
        <!-- 欢迎文字动画 -->
        <div class="animate-fade-in-up relative mb-6 sm:mb-8" style="animation-delay: 0.2s;">
          <svg class="welcome-text-svg mx-auto w-full max-w-xs sm:max-w-md lg:max-w-2xl" viewBox="0 0 800 80" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#84cc16;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#22c55e;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#06b6d4;stop-opacity:1" />
              </linearGradient>
            </defs>
            
            <!-- 描边文字 (底层) -->
            <text x="400" y="40" class="welcome-text-stroke" text-anchor="middle" dominant-baseline="middle">
              Welcome to My Digital World
            </text>
            
            <!-- 填充文字 (上层，使用CSS动画) -->
            <text x="400" y="40" class="welcome-text-fill" text-anchor="middle" dominant-baseline="middle">
              Welcome to My Digital World
            </text>
          </svg>
          
          <!-- 装饰性粒子效果 -->
          <div class="particles-container absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
            <div class="particle absolute w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gradient-to-r from-lime-500 to-green-500 rounded-full opacity-70 shadow-lime-500/50" v-for="i in 8" :key="i" :style="getParticleStyle(i)"></div>
          </div>
        </div>

        <!-- 副标题 -->
        <p class="text-lg sm:text-xl lg:text-2xl mb-4 sm:mb-6 text-gray-600 max-w-2xl mx-auto animate-fade-in-up font-light" style="animation-delay: 0.6s;">
          前端开发工程师
        </p>

        <!-- 描述文字 -->
        <div class="mb-8 sm:mb-10 animate-fade-in-up" style="animation-delay: 0.8s;">
          <p class="text-sm sm:text-base lg:text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
            专注于创建优秀的用户体验，探索前端技术的无限可能
          </p>
        </div>
        
        <!-- 技能标签云 -->
        <div class="mb-10 sm:mb-12 animate-fade-in-up" style="animation-delay: 1s;">
          <div class="flex flex-wrap justify-center gap-x-2 gap-y-12 sm:gap-x-3 sm:gap-y-3">
            <drag-follow 
              v-for="skill in skills" 
              :key="skill"
              max-offset="15" 
              follow-speed="0.01" 
              spring-constant="0.75" 
              damping-factor="0.35" 
              max-bounce-times="6" 
              bounce-threshold="0.2"
            >
              <span class="px-3 py-1.5 sm:px-4 sm:py-2 card-base card-hover text-xs sm:text-sm font-medium cursor-pointer">
                {{ skill }}
              </span>
            </drag-follow>
          </div>
        </div>

        <!-- CTA 按钮 - 添加回弹效果 -->
        <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center animate-fade-in-up" style="animation-delay: 1.2s;">
          <!-- 主要按钮 -->
          <drag-follow 
            max-offset="20" 
            follow-speed="0.01" 
            spring-constant="0.7" 
            damping-factor="0.3" 
            maxBounceTimes="10" 
            bounce-threshold="0.3"
          >
            <button 
              class="button-primary px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base"
              @click="navigateToWorks"
            >
              查看我的作品
            </button>
          </drag-follow>

          <!-- 次要按钮 -->
          <drag-follow 
            max-offset="20" 
            follow-speed="0.01" 
            spring-constant="0.7" 
            damping-factor="0.3" 
            max-bounce-times="10" 
            bounce-threshold="0.3"
          >
            <button 
              class="button-secondary px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base"
              @click="navigateToSkills"
            >
              了解技能
            </button>
          </drag-follow>
        </div>
      </div>
    </div>

    <!-- 向下滚动提示 -->
    <div class="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <div class="w-5 h-8 sm:w-6 sm:h-10 border-2 border-lime-400 rounded-full flex justify-center bg-white/50 backdrop-blur-sm">
        <div class="w-0.5 h-2 sm:w-1 sm:h-3 bg-lime-500 rounded-full mt-1.5 sm:mt-2 animate-scroll-indicator"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BackgroundDecorator from './BackgroundDecorator.vue'
import { usePageAnimations } from '../composables/usePageAnimations.js'

const router = useRouter()
const heroSection = ref(null)

// 技能列表
const skills = ['Vue.js', 'JavaScript', 'Canvas', 'webComponent', 'C#']

// 页面跳转方法
const navigateToWorks = () => {
  router.push('/works')
}

const navigateToSkills = () => {
  router.push('/skills')
}

// 计算粒子样式
const getParticleStyle = (index) => {
  const positions = [
    { left: '10%', top: '20%' },
    { left: '85%', top: '30%' },
    { left: '15%', top: '70%' },
    { left: '90%', top: '65%' },
    { left: '25%', top: '15%' },
    { left: '75%', top: '80%' },
    { left: '5%', top: '50%' },
    { left: '95%', top: '40%' }
  ]
  
  const position = positions[index - 1] || { left: '50%', top: '50%' }
  
  return {
    left: position.left,
    top: position.top,
    animationDelay: `${index * 0.5}s`
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
usePageAnimations({
  enableScrollEffects: true,
  staggerDelay: 0.2
})

onMounted(() => {
  loadDragFollowComponent()
})
</script>

<style scoped>
/* 只保留Tailwind无法实现的复杂动画和样式 */
.connection-dot {
  box-shadow: 0 0 10px rgba(132, 204, 22, 0.3);
}

.connection-dot-top {
  animation: float 6s ease-in-out infinite;
}

.connection-dot-bottom {
  animation: float 6s ease-in-out infinite 3s;
}

/* 欢迎文字SVG动画样式 */
.welcome-text-svg {
  width: 100%;
  max-width: 800px;
  height: auto;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));
}

.welcome-text-stroke {
  font-family: 'Arial', sans-serif;
  font-size: 36px;
  font-weight: bold;
  fill: none;
  stroke: url(#textGradient);
  stroke-width: 2;
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: drawText 2.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) forwards, strokeGlow 2s ease-in-out 4.5s infinite alternate;
}

.welcome-text-fill {
  font-family: 'Arial', sans-serif;
  font-size: 36px;
  font-weight: bold;
  fill: url(#textGradient);
  clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%);
  animation: fillFromLeft 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 2.5s forwards;
}

@keyframes drawText {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes strokeGlow {
  0% {
    filter: drop-shadow(0 0 5px rgba(132, 204, 22, 0.3));
  }
  100% {
    filter: drop-shadow(0 0 20px rgba(132, 204, 22, 0.6)) drop-shadow(0 0 30px rgba(34, 197, 94, 0.4));
  }
}

@keyframes fillFromLeft {
  0% {
    clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%);
  }
  100% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
  }
}

.particle {
  animation: float 4s ease-in-out infinite;
  box-shadow: 0 0 10px rgba(132, 204, 22, 0.5);
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) scale(1);
    opacity: 0.7;
  }
  50% {
    transform: translateY(-20px) scale(1.2);
    opacity: 1;
  }
}
</style> 