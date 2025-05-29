<template>
  <nav class="fixed top-0 left-0 right-0 z-50" style="z-index: 9999;">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link to="/" class="text-xl font-bold text-black hover:text-green-600 transition">
          我的个人网站
        </router-link>
        
        <!-- 桌面导航 -->
        <div class="hidden md:flex space-x-8">
          <router-link 
            to="/" 
            class="nav-link"
            :class="{ 'text-green-600 font-semibold': $route.path === '/' }"
          >
            首页
          </router-link>
          <router-link 
            to="/works" 
            class="nav-link"
            :class="{ 'text-green-600 font-semibold': $route.path === '/works' }"
          >
            个人作品
          </router-link>
          <router-link 
            to="/skills" 
            class="nav-link"
            :class="{ 'text-green-600 font-semibold': $route.path === '/skills' }"
          >
            技术能力
          </router-link>
        </div>

        <!-- 移动端菜单按钮 -->
        <div class="md:hidden">
          <button 
            @click="toggleMobileMenu"
            class="text-gray-700 hover:text-black focus:outline-none"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    :d="mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'">
              </path>
            </svg>
          </button>
        </div>
      </div>

      <!-- 移动端菜单 -->
      <div v-show="mobileMenuOpen" class="md:hidden py-2">
        <div class="flex flex-col space-y-2">
          <router-link 
            to="/" 
            @click="mobileMenuOpen = false"
            class="mobile-nav-link"
            :class="{ 'text-green-600': $route.path === '/' }"
          >
            首页
          </router-link>
          <router-link 
            to="/works" 
            @click="mobileMenuOpen = false"
            class="mobile-nav-link"
            :class="{ 'text-green-600': $route.path === '/works' }"
          >
            个人作品
          </router-link>
          <router-link 
            to="/skills" 
            @click="mobileMenuOpen = false"
            class="mobile-nav-link"
            :class="{ 'text-green-600': $route.path === '/skills' }"
          >
            技术能力
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>

<style scoped>
.nav-link {
  @apply text-gray-700 hover:text-black px-3 py-2 text-sm font-medium transition-colors;
}

.mobile-nav-link {
  @apply block px-4 py-2 text-sm text-gray-700 hover:text-black transition-colors;
}
</style> 