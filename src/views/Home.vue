<template>
  <div>
    <!-- 滚动阻尼容器 -->
    <sliding-damping damping="0.03" touch-damping="0.15" limit-speed="100">
      <!-- Hero 区域 -->
      <HeroSection 
        @scroll-to-works="scrollToSection('.works-section')"
        @scroll-to-skills="scrollToSection('.skills-section')"
      />

      <!-- 技能展示区域 -->
      <div class="skills-section">
        <SkillsSection />
      </div>

      <!-- 作品展示预览 -->
      <section class="section-base bg-white works-section">
        <div class="mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-black mb-4">精选作品</h2>
            <p class="text-xl text-gray-600">展示我最近的一些项目作品</p>
          </div>
          
          <!-- 作品网格 -->
          <div class="grid grid-cols-2 gap-8">
            <WorkCard 
              v-for="work in featuredWorks" 
              :key="work.id" 
              :work="work"
            />
          </div>

          <!-- 查看全部按钮 -->
          <div class="text-center mt-12">
            <router-link 
              to="/works" 
              class="button-secondary inline-flex items-center"
            >
              查看全部作品
            </router-link>
          </div>
        </div>
      </section>

      <!-- 关于我区域 -->
      <AboutSection />

      <!-- 服务展示区域 -->
      <ServicesSection />
    </sliding-damping>

    <!-- 可拖拽的音乐播放器 -->
    <draggable-container initial-x-percent="90" initial-y-percent="55">
      <audio-player
        :playlist="musicPlaylist"
        audio-base-path="../../public/demos/components/AudioPlayer/audio/"
        initial-volume="40"
        auto-play="false"
        initial-play-mode="LIST_LOOP"
      ></audio-player>
    </draggable-container>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { worksData } from '../utils/worksData.js'
import { usePageAnimations } from '../composables/usePageAnimations.js'
import WorkCard from '../components/WorkCard.vue'
import HeroSection from '../components/HeroSection.vue'
import SkillsSection from '../components/SkillsSection.vue'
import AboutSection from '../components/AboutSection.vue'

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

// Web Components 动态加载配置
const webComponents = [
  { name: 'sliding-damping', path: '../../public/demos/components/SlidingDamping/SlidingDamping.js' },
  { name: 'draggable-container', path: '../../public/demos/components/DragDropContainer/DragDropContainer.js' },
  { name: 'audio-player', path: '../../public/demos/components/AudioPlayer/src/AudioPlayer.js' }
]

// 动态加载 Web Components
const loadWebComponents = async () => {
  for (const component of webComponents) {
    if (!customElements.get(component.name)) {
      try {
        await import(component.path)
      } catch (error) {
        console.warn(`Failed to load component: ${component.name}`, error)
      }
    }
  }
}

// 使用动画管理（启用滚动效果）
usePageAnimations({
  enableScrollEffects: true,
  staggerDelay: 0.15
})

onMounted(() => {
  loadWebComponents()
})
</script>

<style scoped>
/* 确保滚动阻尼容器占满全屏 */
sliding-damping {
  display: block;
  width: 100%;
  min-height: 100vh;
  position: relative;
  z-index: 1;
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