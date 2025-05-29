<template>
  <div>
    <!-- 滚动阻尼容器 -->
    <sliding-damping damping="0.03" touch-damping="0.15" limit-speed="100">
      <!-- Hero 区域 -->
      <section class="min-h-screen bg-black text-white flex items-center">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div class="text-center">
            <h1 class="text-5xl md:text-7xl font-bold mb-6">
              你好，我是 [姓名]
            </h1>
            <p class="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto">
              前端开发工程师 | 专注于创建优秀的用户体验
            </p>
          </div>
        </div>
      </section>

      <!-- 作品展示预览 -->
      <section class="py-20 bg-white">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-black mb-4">精选作品</h2>
            <p class="text-xl text-gray-600">展示我最近的一些项目作品</p>
          </div>
          
          <!-- 作品网格 -->
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <WorkCard 
              v-for="work in featuredWorks" 
              :key="work.id" 
              :work="work"
            />
          </div>
        </div>
      </section>
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
import WorkCard from '../components/WorkCard.vue'

// 获取所有作品（显示6张卡片）
const featuredWorks = computed(() => worksData.slice(0, 6))

// 音乐播放列表 - 使用实际存在的音频文件
const musicPlaylist = [
  {
    id: 'track1',
    title: 'July - Rhapsody',
    src: 'July - Rhapsody.mp3'
  },
  {
    id: 'track2', 
    title: 'iwamizu - Love at First Sight',
    src: 'iwamizu - Love at First Sight.mp3'
  },
  {
    id: 'track3',
    title: 'yutaka hirasaka - eternal moment', 
    src: 'yutaka hirasaka - eternal moment.mp3'
  },
  {
    id: 'track4',
    title: 'Saiakoup - Afterglow',
    src: 'Saiakoup - Afterglow.mp3'
  }
]

onMounted(() => {
  // 动态加载滚动阻尼组件
  if (!customElements.get('sliding-damping')) {
    import('../../public/demos/components/SlidingDamping/SlidingDamping.js')
  }
  
  // 动态加载拖拽组件
  if (!customElements.get('draggable-container')) {
    import('../../public/demos/components/DragDropContainer/DragDropContainer.js')
  }
  
  // 动态加载音乐播放器组件
  if (!customElements.get('audio-player')) {
    import('../../public/demos/components/AudioPlayer/src/AudioPlayer.js')
  }
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

/* 拖拽容器样式调整 */
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

/* 针对滚动阻尼容器内的内容调整 */
sliding-damping .min-h-screen {
  min-height: 100vh;
}

/* 确保滚动阻尼不影响导航栏 */
:host {
  position: relative;
}
</style> 