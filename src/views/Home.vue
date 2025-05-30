<template>
  <div class="relative">    
    <!-- 滚动阻尼容器 -->
    <sliding-damping damping="0.03" touch-damping="0.15" limit-speed="100">
      <div class="global-vertical-line animate-vertical-pulse"></div>

      <!-- Hero 区域 - 首屏优先加载 -->
      <HeroSection 
        @scroll-to-works="scrollToSection('.works-section')"
        @scroll-to-skills="scrollToSection('.skills-section')"
      />

      <!-- 技能展示区域 - 懒加载 -->
      <div class="skills-section" data-section="skills">
        <Suspense>
          <template #default>
            <SkillsSection v-if="isSkillsVisible" />
          </template>
          <template #fallback>
            <div class="section-base">
              <div class="skeleton-section">
                <div class="skeleton h-8 w-48 mx-auto mb-8"></div>
                <div class="grid grid-cols-3 gap-8">
                  <div v-for="i in 3" :key="i" class="skeleton h-32"></div>
                </div>
              </div>
            </div>
          </template>
        </Suspense>
      </div>

      <!-- 作品展示预览 - 懒加载 -->
      <section class="section-base bg-white works-section" data-section="works">
        <div class="mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-black mb-4 animate-fade-in-up lazy-load">精选作品</h2>
            <p class="text-xl text-gray-600 animate-fade-in-up lazy-load">展示我最近的一些项目作品</p>
          </div>
          
          <!-- 作品网格 -->
          <div class="grid grid-cols-2 gap-8">
            <template v-if="isWorksVisible">
              <WorkCard 
                v-for="work in featuredWorks" 
                :key="work.id" 
                :work="work"
                class="animate-fade-in-up lazy-load"
              />
            </template>
            <template v-else>
              <div v-for="i in 4" :key="i" class="skeleton h-64"></div>
            </template>
          </div>

          <!-- 查看全部按钮 -->
          <div class="text-center mt-12">
            <router-link 
              to="/works" 
              class="button-secondary inline-flex items-center animate-fade-in-up lazy-load"
            >
              查看全部作品
            </router-link>
          </div>
        </div>
      </section>

      <!-- 关于我区域 - 懒加载 -->
      <div data-section="about">
        <Suspense>
          <template #default>
            <AboutSection v-if="isAboutVisible" />
          </template>
          <template #fallback>
            <div class="section-base">
              <div class="skeleton-section">
                <div class="skeleton h-8 w-32 mx-auto mb-8"></div>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
                  <div class="space-y-4">
                    <div v-for="i in 3" :key="i" class="skeleton h-24"></div>
                  </div>
                  <div class="skeleton h-64"></div>
                </div>
              </div>
            </div>
          </template>
        </Suspense>
      </div>
    </sliding-damping>

    <!-- 可拖拽的音乐播放器 - 直接加载 -->
    <draggable-container initial-x-percent="90" initial-y-percent="85">
      <audio-player
        :playlist="musicPlaylist"
        audio-base-path="./src/OldComponents/components/AudioPlayer/audio/"
        initial-volume="40"
        auto-play="false"
        initial-play-mode="LIST_LOOP"
      ></audio-player>
    </draggable-container>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, defineAsyncComponent } from 'vue'
import { worksData } from '../utils/worksData.js'
import { usePageAnimations } from '../composables/usePageAnimations.js'

// 立即加载的关键组件
import HeroSection from '../components/HeroSection.vue'
import WorkCard from '../components/WorkCard.vue'

// 异步加载的组件
const SkillsSection = defineAsyncComponent(() => 
  import('../components/SkillsSection.vue')
)
const AboutSection = defineAsyncComponent(() => 
  import('../components/AboutSection.vue')
)

// 组件可见性状态
const isSkillsVisible = ref(false)
const isWorksVisible = ref(false)
const isAboutVisible = ref(false)

// 获取精选作品（显示4张卡片）
const featuredWorks = computed(() => worksData.slice(0, 4))

// 音乐播放列表配置
const musicPlaylist = [
  { id: 'track1', title: 'July - Rhapsody', src: 'July - Rhapsody.mp3' },
  { id: 'track2', title: 'iwamizu - Love at First Sight', src: 'iwamizu - Love at First Sight.mp3' },
  { id: 'track3', title: 'yutaka hirasaka - eternal moment', src: 'yutaka hirasaka - eternal moment.mp3' },
  { id: 'track4', title: 'Saiakoup - Afterglow', src: 'Saiakoup - Afterglow.mp3' }
]

// 平滑滚动到指定区域
const scrollToSection = (sectionClass) => {
  const element = document.querySelector(sectionClass)
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }
}

// 动态加载 Web Components
const loadWebComponents = async () => {
  try {
    // 使用 ES 模块导入替代动态脚本加载
    if (!customElements.get('sliding-damping')) {
      await import('../OldComponents/components/SlidingDamping/SlidingDamping.js')
    }
    if (!customElements.get('draggable-container')) {
      await import('../OldComponents/components/DragDropContainer/DragDropContainer.js')
    }
    if (!customElements.get('audio-player')) {
      await import('../OldComponents/components/AudioPlayer/src/AudioPlayer.js')
    }
  } catch (error) {
    console.warn('Failed to load Web Components:', error)
  }
}

// 分步加载组件
const initProgressiveLoading = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionName = entry.target.dataset.section
        
        switch (sectionName) {
          case 'skills':
            setTimeout(() => { isSkillsVisible.value = true }, 200)
            break
          case 'works':
            setTimeout(() => { isWorksVisible.value = true }, 300)
            break
          case 'about':
            setTimeout(() => { isAboutVisible.value = true }, 400)
            break
        }
        
        observer.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.1,
    rootMargin: '100px 0px'
  })

  // 观察所有section
  setTimeout(() => {
    const sections = document.querySelectorAll('[data-section]')
    sections.forEach(section => observer.observe(section))
  }, 1000)
}

// 使用动画管理（启用懒加载）
const { isLoaded, visibleSections } = usePageAnimations({
  enableScrollEffects: true,
  staggerDelay: 0.15,
  enableLazyLoad: true
})

onMounted(async () => {
  // 优先加载关键 Web Components
  await loadWebComponents()
  
  // 初始化分步加载
  initProgressiveLoading()
})
</script>

<style scoped>
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

/* 骨架屏区域 */
.skeleton-section {
  @apply max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20;
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