<script setup>
import ChartDemo from './components/ChartDemo.vue'
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-purple-700 text-white font-sans">
    <header class="text-center py-16 px-8">
      <h1 class="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
        你好！欢迎来到我的个人页面
      </h1>
      <p class="text-xl opacity-90">
        基于 Vite + Vue + Tailwind CSS + ECharts 构建
      </p>
    </header>
    
    <main class="max-w-4xl mx-auto px-8 pb-16">
      <section class="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 shadow-xl">
        <h2 class="text-2xl font-bold mb-4">关于我</h2>
        <p class="text-lg leading-relaxed">
          这是我的个人页面，使用现代化的前端技术栈构建。
          展示了我对 <span class="font-semibold text-yellow-300">Vite</span>、
          <span class="font-semibold text-green-300">Vue.js</span>、
          <span class="font-semibold text-cyan-300">Tailwind CSS</span> 和 
          <span class="font-semibold text-pink-300">ECharts</span> 的掌握能力。
        </p>
      </section>
      
      <section class="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 shadow-xl">
        <h2 class="text-2xl font-bold mb-6">技术栈</h2>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div class="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 text-center font-semibold 
                      border border-white/30 transition-all duration-300 hover:bg-white/30 
                      hover:transform hover:-translate-y-1 hover:shadow-lg">
            Vite
          </div>
          <div class="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 text-center font-semibold 
                      border border-white/30 transition-all duration-300 hover:bg-white/30 
                      hover:transform hover:-translate-y-1 hover:shadow-lg">
            Vue
          </div>
          <div class="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 text-center font-semibold 
                      border border-white/30 transition-all duration-300 hover:bg-white/30 
                      hover:transform hover:-translate-y-1 hover:shadow-lg">
            JavaScript
          </div>
          <div class="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 text-center font-semibold 
                      border border-white/30 transition-all duration-300 hover:bg-white/30 
                      hover:transform hover:-translate-y-1 hover:shadow-lg">
            Tailwind
          </div>
          <div class="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 text-center font-semibold 
                      border border-white/30 transition-all duration-300 hover:bg-white/30 
                      hover:transform hover:-translate-y-1 hover:shadow-lg col-span-2 md:col-span-1">
            ECharts
          </div>
        </div>
      </section>

      <section class="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl">
        <ChartDemo />
      </section>
    </main>
  </div>
</template>

<style scoped>
/* 自定义样式，如果需要的话 */
</style>
