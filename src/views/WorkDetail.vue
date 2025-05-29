<template>
  <div class="h-screen bg-white overflow-hidden" v-if="work">
    <!-- 简化的顶部导航 -->
    <nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-14">
          <!-- 左侧导航 -->
          <div class="flex items-center space-x-6">
            <button 
              @click="$router.back()"
              class="flex items-center text-gray-600 hover:text-black transition text-sm font-medium"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              返回
            </button>
            
            <div class="h-4 w-px bg-gray-300"></div>
            
            <router-link 
              to="/"
              class="text-gray-600 hover:text-black transition text-sm font-medium"
            >
              首页
            </router-link>
            
            <router-link 
              to="/works"
              class="text-gray-600 hover:text-black transition text-sm font-medium"
            >
              作品列表
            </router-link>
            
            <router-link 
              to="/skills"
              class="text-gray-600 hover:text-black transition text-sm font-medium"
            >
              技术能力
            </router-link>
          </div>

          <!-- 右侧操作 -->
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-500">{{ work.title }}</span>
            
            <div class="h-4 w-px bg-gray-300"></div>
            
            <a 
              :href="work.demoUrl" 
              target="_blank"
              class="flex items-center text-green-600 hover:text-green-700 transition text-sm font-medium"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
              新窗口打开
            </a>
          </div>
        </div>
      </div>
    </nav>

    <!-- 内容展示区域 -->
    <div class="relative">
      <!-- iframe 展示区域 -->
      <iframe 
        :src="work.demoUrl"
        class="w-full h-[calc(100vh-3.5rem)] border-0"
        :title="work.title"
      ></iframe>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getWorkById } from '../utils/worksData.js'

const route = useRoute()

// 获取作品数据
const work = computed(() => getWorkById(route.params.id))
</script>

<style scoped>
/* 确保iframe无边框无间距 */
iframe {
  display: block;
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
}
</style>
