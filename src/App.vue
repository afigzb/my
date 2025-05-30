<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'

const route = useRoute()
const isTransitioning = ref(false)

// 流体光标实例
let fluidCursor = null

// 判断是否为作品详情页
const isWorkDetailPage = computed(() => {
  return route.name === 'WorkDetail'
})

// 过渡事件处理
const onBeforeLeave = () => {
  isTransitioning.value = true
}

const onAfterEnter = () => {
  isTransitioning.value = false
}

// 初始化流体光标
onMounted(() => {
  // 动态导入光标效果脚本
  const script = document.createElement('script')
  script.src = '/src/OldComponents/components/CursorShape/newCursor2.js'
  script.onload = () => {
    // 脚本加载完成后初始化光标
    if (window.FluidCursor) {
      fluidCursor = new window.FluidCursor().init()
      // 暴露到全局方便调试
      window.fluidCursor = fluidCursor
    }
  }
  document.head.appendChild(script)
})

// 销毁流体光标
onUnmounted(() => {
  if (fluidCursor) {
    fluidCursor.destroy()
    fluidCursor = null
  }
})
</script>

<template>
  <div id="app">
    <!-- 导航栏 - 作品详情页不显示，过渡期间也不显示 -->
    <Navbar v-if="!isWorkDetailPage && !isTransitioning" />
      
    <!-- 路由视图 - 白色圆形扩散过渡效果 -->
    <router-view v-slot="{ Component }">
      <transition 
        name="circle-expand" 
        mode="out-in"
        @before-leave="onBeforeLeave"
        @after-enter="onAfterEnter"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  cursor: none; /* 隐藏默认光标 */
}

/* 全局隐藏光标样式 */
:global(*) {
  cursor: none !important;
}

/* 白色蒙版环形呈现效果 */
.circle-expand-enter-active,
.circle-expand-leave-active {
  transition: all 0.5s ease;
  position: relative;
}

.circle-expand-leave-to {
  opacity: 0;
}

.circle-expand-enter-from {
  clip-path: circle(0% at 50% 50%);
}

.circle-expand-enter-to {
  clip-path: circle(100% at 50% 50%);
}

/* 离开页面的白色蒙版 */
.circle-expand-leave-active::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: white;
  z-index: 99999;
  animation: whiteMaskFadeIn 0.4s ease-out forwards;
  pointer-events: none;
}

/* 进入页面的环形裁剪动画 */
.circle-expand-enter-active {
  animation: circleReveal 0.8s ease-out forwards;
  z-index: 100000;
}

@keyframes whiteMaskFadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes circleReveal {
  0% {
    clip-path: circle(0% at 50% 50%);
  }
  100% {
    clip-path: circle(100% at 50% 50%);
  }
}

/* 确保过渡效果不会影响布局 */
.circle-expand-enter-active,
.circle-expand-leave-active {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
