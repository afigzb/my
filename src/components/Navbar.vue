<template>
  <nav class="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
    <div class="nav-capsule bg-white/60 backdrop-blur-xl border border-white/20 rounded-full px-8 py-4 shadow-lg shadow-black/5">
      <div class="flex space-x-10">
        <router-link 
          to="/" 
          class="nav-link px-5 py-3 text-sm font-medium text-gray-700 transition-all duration-200 rounded-full group relative hover:text-gray-900 router-link-active:text-gray-900 router-link-active:font-semibold"
        >
          <span class="relative z-10 hover-scale">首页</span>
          <!-- 活跃指示器 -->
          <div v-if="$route.path === '/'" 
               class="absolute inset-0 bg-gradient-to-r from-lime-400/20 to-cyan-400/20 rounded-full"></div>
        </router-link>
        
        <router-link 
          to="/works" 
          class="nav-link px-5 py-3 text-sm font-medium text-gray-700 transition-all duration-200 rounded-full group relative hover:text-gray-900 router-link-active:text-gray-900 router-link-active:font-semibold"
        >
          <span class="relative z-10 hover-scale">作品</span>
          <div v-if="$route.path === '/works'" 
               class="absolute inset-0 bg-gradient-to-r from-lime-400/20 to-cyan-400/20 rounded-full"></div>
        </router-link>
        
        <router-link 
          to="/skills" 
          class="nav-link px-5 py-3 text-sm font-medium text-gray-700 transition-all duration-200 rounded-full group relative hover:text-gray-900 router-link-active:text-gray-900 router-link-active:font-semibold"
        >
          <span class="relative z-10 hover-scale">技能</span>
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
/* 只保留Tailwind无法实现的样式 */
.nav-capsule {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.hover-scale:hover {
  transform: scale(1.05);
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