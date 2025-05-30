<template>
  <!-- Hero 区域 -->
  <section class="section-base min-h-screen text-gray-800 flex items-center overflow-hidden" ref="heroSection">
    <!-- 背景装饰 -->
    <BackgroundDecorator variant="hero" viewBox="0 0 1200 1000" />
    
    <!-- 与全局线条的连接装饰 -->
    <div class="connection-elements">
      <div class="connection-dot top"></div>
      <div class="connection-dot bottom"></div>
    </div>

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
              <span class="px-4 py-2 card-base card-hover text-sm font-medium cursor-pointer">
                {{ skill }}
              </span>
            </drag-follow>
          </div>
        </div>

        <!-- CTA 按钮 - 添加回弹效果 -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style="animation-delay: 1.2s;">
          <!-- 主要按钮 - 双层回弹 -->
          <drag-follow 
            max-offset="20" 
            follow-speed="0.01" 
            spring-constant="0.7" 
            damping-factor="0.3" 
            maxBounceTimes="10" 
            bounce-threshold="0.3"
          >
            <button 
              class="button-primary relative inline-flex items-center justify-center w-[200px] h-[48px]"
              @click="$emit('scroll-to-works')"
            >
              <div class="absolute">
                <drag-follow 
                  max-offset="15" 
                  follow-speed="0.008" 
                  spring-constant="0.8" 
                  damping-factor="0.25" 
                  maxBounceTimes="10" 
                  bounce-threshold="0.2"
                >
                  <div class="relative w-[200px] h-[48px] flex items-center justify-center">
                    <div class="absolute">
                      查看我的作品
                    </div>
                  </div>
                </drag-follow>
              </div>
            </button>
          </drag-follow>

          <!-- 次要按钮 - 双层回弹 -->
          <drag-follow 
            max-offset="20" 
            follow-speed="0.01" 
            spring-constant="0.7" 
            damping-factor="0.3" 
            max-bounce-times="10" 
            bounce-threshold="0.3"
          >
            <button 
              class="button-secondary relative inline-flex items-center justify-center w-[180px] h-[48px]"
              @click="$emit('scroll-to-skills')"
            >
              <div class="absolute">
                <drag-follow 
                  max-offset="15" 
                  follow-speed="0.008" 
                  spring-constant="0.8" 
                  damping-factor="0.25" 
                  maxBounceTimes="10" 
                  bounce-threshold="0.2"
                >
                  <div class="relative w-[180px] h-[48px] flex items-center justify-center">
                    <div class="absolute">
                      了解技能
                    </div>
                  </div>
                </drag-follow>
              </div>
            </button>
          </drag-follow>
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
import { ref, onMounted } from 'vue'
import BackgroundDecorator from './BackgroundDecorator.vue'
import { usePageAnimations } from '../composables/usePageAnimations.js'

// 定义事件
defineEmits(['scroll-to-works', 'scroll-to-skills'])

const heroSection = ref(null)

// 技能列表
const skills = ['Vue.js', 'React', 'TypeScript', 'Node.js', 'Python']

// 动态加载 drag-follow 组件
const loadDragFollowComponent = async () => {
  if (!customElements.get('drag-follow')) {
    try {
      await import('../OldComponents/components/FocusDiv/FocusDiv.js')
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
/* 连接装饰元素 */
.connection-elements {
  position: absolute;
  left: 15%;
  top: 0;
  bottom: 0;
  z-index: 2;
  pointer-events: none;
}

.connection-dot {
  position: absolute;
  width: 6px;
  height: 6px;
  background: rgba(132, 204, 22, 0.8);
  border-radius: 50%;
  left: -2.5px;
  box-shadow: 0 0 10px rgba(132, 204, 22, 0.3);
}

.connection-dot.top {
  top: 20%;
  animation: float 6s ease-in-out infinite;
}

.connection-dot.bottom {
  bottom: 15%;
  animation: float 6s ease-in-out infinite 3s;
}

/* 响应式调整连接元素位置 */
@media (max-width: 1024px) {
  .connection-elements {
    left: 8%;
  }
}

@media (max-width: 768px) {
  .connection-elements {
    left: 5%;
  }
  
  .connection-dot {
    display: none;
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .min-h-screen {
    min-height: 100vh;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
}
</style> 