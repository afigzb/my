<template>
  <!-- 关于我区域 -->
  <section class="section-base" ref="aboutSection">
    <!-- 背景装饰 -->
    <BackgroundDecorator variant="about" />

    <div class="relative z-10 mx-auto px-4 sm:px-8">
      <div class="max-w-6xl mx-auto">
        <!-- 标题区域 -->
        <div class="text-center mb-12 sm:mb-16">
          <h2 class="text-xl sm:text-2xl font-light text-gray-600 mb-4">关于我</h2>
          <div class="title-divider mb-6 sm:mb-8"></div>
        </div>

        <!-- 主内容区域 -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <!-- 左侧内容 -->
          <div class="order-2 lg:order-1">
            <!-- 核心价值卡片 -->
            <div class="grid gap-4 sm:gap-6 mb-8 lg:mb-10">
              <div v-for="value in coreValuesData" :key="value.title" 
                class="card-base card-hover">
                <div class="flex items-center mb-3 sm:mb-4">
                  <div class="w-8 h-8 sm:w-10 sm:h-10 bg-lime-50 rounded-full flex items-center justify-center mr-3 sm:mr-4 border border-lime-100">
                    <component :is="'svg'" class="w-4 h-4 sm:w-5 sm:h-5 text-lime-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="value.iconPath" />
                    </component>
                  </div>
                  <h3 class="text-base sm:text-lg font-medium text-gray-800">{{ value.title }}</h3>
                </div>
                <p class="text-sm text-gray-600 leading-relaxed">{{ value.description }}</p>
              </div>
            </div>

            <!-- 个人链接 -->
            <div class="flex flex-wrap gap-3 sm:gap-4">
              <a v-for="link in personalLinksData" :key="link.name"
                :href="link.url" target="_blank"
                class="button-secondary inline-flex items-center text-sm">
                <component :is="'svg'" class="w-4 h-4 sm:w-5 sm:h-5 mr-2" :fill="link.iconFill" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="link.iconPath" />
                </component>
                {{ link.name }}
              </a>
            </div>
          </div>

          <!-- 右侧装饰区域 -->
          <div class="relative order-1 lg:order-2">
            <!-- 主要装饰卡片 -->
            <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-100 h-72 sm:h-96">
              <div class="text-center h-full flex flex-col justify-center">
                <!-- 头像 -->
                <div class="w-20 h-20 sm:w-28 sm:h-28 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 border border-lime-100 overflow-hidden">
                  <img src="/img/touxiang.jpg" alt="头像" class="w-full h-full object-cover" />
                </div>
                
                <!-- 技能标签云 -->
                <div class="space-y-2 sm:space-y-3">
                  <div class="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                    <span v-for="skill in skillTagsData.frontend" :key="skill" 
                      class="px-2 py-1 sm:px-3 sm:py-1 bg-lime-50 text-lime-600 text-xs rounded-full border border-lime-100">
                      {{ skill }}
                    </span>
                  </div>
                  <div class="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                    <span v-for="skill in skillTagsData.backend" :key="skill"
                      class="px-2 py-1 sm:px-3 sm:py-1 bg-cyan-50 text-cyan-600 text-xs rounded-full border border-cyan-100">
                      {{ skill }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 装饰元素 -->
            <div class="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-12 h-12 sm:w-16 sm:h-16 bg-lime-50/50 rounded-full border border-lime-100/30"></div>
            <div class="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-16 h-16 sm:w-20 sm:h-20 bg-cyan-50/50 rounded-full border border-cyan-100/30"></div>
            
            <!-- 浮动标签 - 在移动端隐藏或调整位置 -->
            <div v-for="(label, index) in floatingLabelsData" :key="label.text"
              class="hidden sm:block absolute bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg text-sm font-medium text-gray-600 border border-gray-100 shadow-sm"
              :class="label.position">
              {{ label.text }}
            </div>
          </div>
        </div>

        <!-- 底部装饰性引用 -->
        <div class="text-center mt-16 sm:mt-20">
          <blockquote class="text-base sm:text-lg text-gray-500 font-light italic mb-2">
            "代码是诗歌，设计是艺术"
          </blockquote>
          <cite class="text-sm text-gray-400">— 开发者的浪漫</cite>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import BackgroundDecorator from './BackgroundDecorator.vue'
import { usePageAnimations } from '../composables/usePageAnimations.js'
import { coreValues, personalLinks, skillTags, floatingLabels } from '../utils/aboutData.js'

const aboutSection = ref(null)

// 从数据文件导入
const coreValuesData = ref(coreValues)
const personalLinksData = ref(personalLinks)
const skillTagsData = ref(skillTags)
const floatingLabelsData = ref(floatingLabels)

// 使用动画管理
usePageAnimations()
</script>

<style scoped>
/* 组件特有样式 */
.space-y-3 > * + * {
  margin-top: 0.75rem;
}
</style> 