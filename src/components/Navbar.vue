<template>
  <nav class="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
    <div class="nav-capsule bg-white/60 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3 shadow-lg shadow-black/5">
      <div class="flex space-x-8">
        <router-link 
          to="/" 
          class="nav-link group relative"
        >
          <span class="relative z-10">首页</span>
          <!-- 活跃指示器 -->
          <div v-if="$route.path === '/'" 
               class="absolute inset-0 bg-gradient-to-r from-lime-400/20 to-cyan-400/20 rounded-full"></div>
        </router-link>
        
        <router-link 
          to="/works" 
          class="nav-link group relative"
        >
          <span class="relative z-10">作品</span>
          <div v-if="$route.path === '/works'" 
               class="absolute inset-0 bg-gradient-to-r from-lime-400/20 to-cyan-400/20 rounded-full"></div>
        </router-link>
        
        <router-link 
          to="/skills" 
          class="nav-link group relative"
        >
          <span class="relative z-10">技能</span>
          <div v-if="$route.path === '/skills'" 
               class="absolute inset-0 bg-gradient-to-r from-lime-400/20 to-cyan-400/20 rounded-full"></div>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
// 纯净简约，无需额外逻辑
</script>

<style scoped>
.nav-capsule {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.nav-link {
  @apply px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 rounded-full;
}

.nav-link:hover {
  @apply text-gray-900;
}

.nav-link:hover .relative.z-10 {
  transform: scale(1.05);
}

/* 当前页面的链接样式 */
.router-link-active {
  @apply text-gray-900 font-semibold;
}

/* 悬停效果 */
.nav-link:not(.router-link-active):hover::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(132, 204, 22, 0.1), rgba(6, 182, 212, 0.1));
  border-radius: 9999px;
  opacity: 0;
  animation: fadeIn 0.2s ease-out forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
</style> 