<template>
  <!-- 关于我区域 -->
  <section class="section-base" ref="aboutSection">
    <!-- 背景装饰 -->
    <BackgroundDecorator variant="about" />

    <div class="relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <!-- 标题区域 -->
        <div class="text-center mb-16">
          <h2 class="text-2xl font-light text-gray-600 mb-4">关于我</h2>
          <div class="title-divider mb-8"></div>
        </div>

        <!-- 主内容区域 -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <!-- 左侧内容 -->
          <div>
            <!-- 核心价值卡片 -->
            <div class="grid gap-6 mb-10">
              <div v-for="value in coreValues" :key="value.title" 
                class="card-base card-hover">
                <div class="flex items-center mb-4">
                  <div class="w-10 h-10 bg-lime-50 rounded-full flex items-center justify-center mr-4 border border-lime-100">
                    <component :is="'svg'" class="w-5 h-5 text-lime-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="value.iconPath" />
                    </component>
                  </div>
                  <h3 class="text-lg font-medium text-gray-800">{{ value.title }}</h3>
                </div>
                <p class="text-sm text-gray-600 leading-relaxed">{{ value.description }}</p>
              </div>
            </div>

            <!-- 个人链接 -->
            <div class="flex flex-wrap gap-4">
              <a v-for="link in personalLinks" :key="link.name"
                :href="link.url" target="_blank"
                class="button-secondary inline-flex items-center">
                <component :is="'svg'" class="w-5 h-5 mr-2" :fill="link.iconFill" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="link.iconPath" />
                </component>
                {{ link.name }}
              </a>
            </div>
          </div>

          <!-- 右侧装饰区域 -->
          <div class="relative">
            <!-- 主要装饰卡片 - 只匹配核心价值卡片的高度 -->
            <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-100" style="height: 380px;">
              <div class="text-center h-full flex flex-col justify-center">
                <!-- 头像 -->
                <div class="w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-6 border border-lime-100 overflow-hidden">
                  <img src="/img/touxiang.jpg" alt="头像" class="w-full h-full object-cover" />
                </div>
                
                <!-- 技能标签云 -->
                <div class="space-y-3">
                  <div class="flex flex-wrap justify-center gap-2">
                    <span v-for="skill in skillTags.frontend" :key="skill" 
                      class="px-3 py-1 bg-lime-50 text-lime-600 text-xs rounded-full border border-lime-100">
                      {{ skill }}
                    </span>
                  </div>
                  <div class="flex flex-wrap justify-center gap-2">
                    <span v-for="skill in skillTags.backend" :key="skill"
                      class="px-3 py-1 bg-cyan-50 text-cyan-600 text-xs rounded-full border border-cyan-100">
                      {{ skill }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 装饰元素 - 恢复柔和颜色 -->
            <div class="absolute -top-4 -right-4 w-16 h-16 bg-lime-50/50 rounded-full border border-lime-100/30"></div>
            <div class="absolute -bottom-4 -left-4 w-20 h-20 bg-cyan-50/50 rounded-full border border-cyan-100/30"></div>
            
            <!-- 浮动标签 -->
            <div v-for="(label, index) in floatingLabels" :key="label.text"
              class="absolute bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg text-sm font-medium text-gray-600 border border-gray-100 shadow-sm"
              :class="label.position">
              {{ label.text }}
            </div>
          </div>
        </div>

        <!-- 底部装饰性引用 -->
        <div class="text-center mt-20">
          <blockquote class="text-lg text-gray-500 font-light italic mb-2">
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

const aboutSection = ref(null)

// 核心价值
const coreValues = [
  {
    title: '技术探索者',
    description: '热衷于探索新技术，通过博客分享开发心得与技术见解',
    iconPath: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
  },
  {
    title: '开源贡献者',
    description: '积极参与开源项目，在GitHub上分享代码与协作开发',
    iconPath: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
  },
  {
    title: '持续学习者',
    description: '保持对新技术的敏感度，持续学习并实践最新的开发理念',
    iconPath: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
  }
]

// 个人链接
const personalLinks = [
  {
    name: '个人博客',
    url: 'https://blog.csdn.net/sahjiwij?spm=1000.2115.3001.10640',
    iconPath: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z',
    iconFill: 'none'
  },
  {
    name: 'GitHub',
    url: 'https://github.com/afigzb?tab=repositories',
    iconPath: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
    iconFill: 'currentColor'
  }
]

// 技能标签
const skillTags = {
  frontend: ['Vue.js', 'JavaScript', '‌Ant Design'],
  backend: ['webComponent', 'C#', '设计思维']
}

// 浮动标签
const floatingLabels = [
  { text: '前端工程师', position: '-top-6 left-8' },
  { text: 'UI/UX 爱好者', position: '-bottom-6 right-8' }
]

// 使用动画管理
usePageAnimations()
</script>

<style scoped>
/* 组件特有样式 */
.space-y-3 > * + * {
  margin-top: 0.75rem;
}
</style> 