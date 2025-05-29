<template>
  <div class="min-h-screen bg-white">
    <!-- 页面标题 -->
    <section class="py-20">
      <div class="mx-auto px-6 text-center">
        <h1 class="text-3xl font-light text-black mb-4">
          作品集
        </h1>
        <p class="text-gray-600 text-lg">
          一些前端技术的探索与实践
        </p>
      </div>
    </section>

    <!-- 作品网格 -->
    <section class="pb-20">
      <div class="mx-auto px-6">
        <div class="grid md:grid-cols-2 gap-8">
          <WorkCard 
            v-for="work in worksData" 
            :key="work.id" 
            :work="work"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { worksData } from '../utils/worksData.js'
import WorkCard from '../components/WorkCard.vue'
</script> 