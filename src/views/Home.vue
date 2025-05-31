<template>
  <div class="relative">    
    <!-- 滚动阻尼容器 -->
    <sliding-damping damping="0.03" touch-damping="0.15" limit-speed="100">
      <div class="global-vertical-line animate-vertical-pulse"></div>

      <!-- Hero 区域 - 立即加载 -->
      <HeroSection />

      <!-- 技能展示区域 - 懒加载 -->
      <div class="skills-section" data-section="skills" ref="skillsRef">
        <Suspense>
          <template #default>
            <SkillsSection v-if="shouldLoadSkills" />
          </template>
          <template #fallback>
            <div class="section-base">
              <div class="loading-placeholder">
                <div class="animate-pulse space-y-4">
                  <div class="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
                  <div class="grid grid-cols-3 gap-4 mt-8">
                    <div v-for="i in 6" :key="i" class="h-32 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Suspense>
      </div>

      <!-- 作品展示预览 - 部分懒加载 -->
      <section class="section-base bg-white works-section py-12" data-section="works" ref="worksRef">
        <div class="mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-black mb-4 animate-fade-in-up">精选作品</h2>
            <p class="text-xl text-gray-600 animate-fade-in-up">展示我最近的一些项目作品</p>
          </div>
          
          <!-- 作品网格 - 轻量级组件，可以直接加载 -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <WorkCard 
              v-for="work in featuredWorks" 
              :key="work.id" 
              :work="work"
              class="animate-fade-in-up"
            />
          </div>

          <!-- 查看全部按钮 -->
          <div class="text-center">
            <router-link 
              to="/works" 
              class="button-secondary inline-flex items-center animate-fade-in-up"
            >
              查看全部作品
            </router-link>
          </div>
        </div>
      </section>

      <!-- 关于我区域 - 懒加载 -->
      <div data-section="about" ref="aboutRef">
        <Suspense>
          <template #default>
            <AboutSection v-if="shouldLoadAbout" />
          </template>
          <template #fallback>
            <div class="section-base">
              <div class="loading-placeholder">
                <div class="animate-pulse space-y-4">
                  <div class="h-8 bg-gray-200 rounded w-1/4 mx-auto"></div>
                  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                    <div class="space-y-4">
                      <div v-for="i in 4" :key="i" class="h-20 bg-gray-200 rounded"></div>
                    </div>
                    <div class="h-64 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Suspense>
      </div>
    </sliding-damping>

    <!-- 音乐播放器 - 延迟加载，避免阻塞首屏 -->
    <div v-if="shouldLoadAudioPlayer">
      <draggable-container initial-x-percent="90" initial-y-percent="85">
        <audio-player
          audio-base-path="/demos/components/AudioPlayer/audio/"
          initial-volume="40"
          auto-play="false"
          initial-play-mode="LIST_LOOP"
        ></audio-player>
      </draggable-container>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, nextTick, defineAsyncComponent } from 'vue'
import { worksData } from '../utils/worksData.js'

// 立即加载的轻量级组件
import HeroSection from '../components/HeroSection.vue'
import WorkCard from '../components/WorkCard.vue'

// 异步加载的重型组件
const SkillsSection = defineAsyncComponent(() => 
  import('../components/SkillsSection.vue')
)
const AboutSection = defineAsyncComponent(() => 
  import('../components/AboutSection.vue')
)

// 加载状态管理
const shouldLoadSkills = ref(false)
const shouldLoadAbout = ref(false)
const shouldLoadAudioPlayer = ref(false)

// DOM 引用
const skillsRef = ref(null)
const worksRef = ref(null)
const aboutRef = ref(null)

// 获取精选作品（显示6张卡片）
const featuredWorks = computed(() => worksData.slice(0, 6))

// 智能懒加载策略
const setupIntersectionObserver = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target
        
        // 根据不同区域触发不同的加载
        if (element === skillsRef.value && !shouldLoadSkills.value) {
          shouldLoadSkills.value = true
          console.log('开始加载技能组件...')
        } else if (element === aboutRef.value && !shouldLoadAbout.value) {
          shouldLoadAbout.value = true
          console.log('开始加载关于组件...')
        }
        
        // 加载后停止观察
        observer.unobserve(element)
      }
    })
  }, {
    threshold: 0.1,
    rootMargin: '200px 0px' // 提前200px开始加载
  })

  // 观察需要懒加载的区域
  nextTick(() => {
    if (skillsRef.value) observer.observe(skillsRef.value)
    if (aboutRef.value) observer.observe(aboutRef.value)
  })
}

// 延迟加载音频播放器和Web组件
const loadSecondaryComponents = async () => {
  // 延迟2秒加载音频播放器，避免阻塞首屏
  setTimeout(() => {
    shouldLoadAudioPlayer.value = true
  }, 2000)

  // 加载 Web Components
  const components = [
    { name: 'sliding-damping', path: '/demos/components/SlidingDamping/SlidingDamping.js' },
    { name: 'draggable-container', path: '/demos/components/DragDropContainer/DragDropContainer.js' },
    { name: 'audio-player', path: '/demos/components/AudioPlayer/src/AudioPlayer.js' }
  ]

  for (const component of components) {
    if (!customElements.get(component.name)) {
      try {
        const script = document.createElement('script')
        script.type = 'module'
        script.src = component.path
        document.head.appendChild(script)
      } catch (error) {
        console.warn(`Failed to load component: ${component.name}`, error)
      }
    }
  }
}

onMounted(() => {
  // 立即设置懒加载观察器
  setupIntersectionObserver()
  
  // 延迟加载次要组件
  loadSecondaryComponents()
})
</script>

<style scoped>
/* 加载占位符样式 */
.loading-placeholder {
  @apply max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16;
}

/* 全局竖向连接线 */
.global-vertical-line {
  position: fixed;
  left: 15%;
  top: 0;
  bottom: 0;
  width: 1px;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(132, 204, 22, 0.3) 10%,
    rgba(132, 204, 22, 0.5) 30%,
    rgba(132, 204, 22, 0.6) 50%,
    rgba(132, 204, 22, 0.5) 70%,
    rgba(132, 204, 22, 0.3) 90%,
    transparent 100%
  );
  z-index: 10;
  pointer-events: none;
}

/* 在不同屏幕尺寸调整位置 */
@media (max-width: 1024px) {
  .global-vertical-line {
    left: 8%;
  }
}

@media (max-width: 768px) {
  .global-vertical-line {
    left: 5%;
  }
}

/* 确保滚动阻尼容器占满全屏 */
sliding-damping {
  display: block;
  width: 100%;
  min-height: 100vh;
  position: relative;
  z-index: 0;
}

/* 拖拽容器层级调整 */
draggable-container {
  z-index: 10000;
}

/* 防止滚动阻尼影响拖拽功能 */
draggable-container * {
  pointer-events: auto;
}

/* 确保音乐播放器不被导航栏遮挡 */
draggable-container audio-player {
  margin-top: 0;
}

/* 平滑滚动 */
html {
  scroll-behavior: smooth;
}
</style> 