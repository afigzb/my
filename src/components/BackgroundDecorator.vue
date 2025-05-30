<template>
  <svg class="absolute inset-0 w-full h-full pointer-events-none" :viewBox="viewBox" preserveAspectRatio="xMidYMid slice">
    <!-- 渐变定义 -->
    <defs>
      <linearGradient :id="`gradient1-${uniqueId}`" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#f0f9ff;stop-opacity:0.6" />
        <stop offset="100%" style="stop-color:#ecfdf5;stop-opacity:0.6" />
      </linearGradient>
      <linearGradient :id="`gradient2-${uniqueId}`" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#a7f3d0;stop-opacity:0.4" />
        <stop offset="100%" style="stop-color:#bef264;stop-opacity:0.4" />
      </linearGradient>
      <linearGradient :id="`gradient3-${uniqueId}`" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#ecfccb;stop-opacity:0.6" />
        <stop offset="100%" style="stop-color:#d9f99d;stop-opacity:0.6" />
      </linearGradient>
    </defs>
    
    <!-- 大圆形装饰 -->
    <circle v-for="(circle, index) in decorations.circles" :key="`circle-${index}`"
      :cx="circle.cx" :cy="circle.cy" :r="circle.r" 
      :fill="`url(#gradient${circle.gradient}-${uniqueId})`" 
      :opacity="circle.opacity"
      :class="circle.animation" />
    
    <!-- 几何线条 -->
    <path v-for="(path, index) in decorations.paths" :key="`path-${index}`"
      :d="path.d" :stroke="path.stroke" :stroke-width="path.strokeWidth" 
      fill="none" :opacity="path.opacity" :class="path.animation" />
    
    <!-- 装饰点 -->
    <circle v-for="(dot, index) in decorations.dots" :key="`dot-${index}`"
      :cx="dot.cx" :cy="dot.cy" :r="dot.r" 
      :fill="dot.fill" :opacity="dot.opacity"
      :class="dot.animation" :style="dot.style" />
    
    <!-- 几何形状 -->
    <polygon v-for="(polygon, index) in decorations.polygons" :key="`polygon-${index}`"
      :points="polygon.points" :fill="polygon.fill" 
      :opacity="polygon.opacity" :class="polygon.animation" />
    
    <!-- 矩形装饰 -->
    <rect v-for="(rect, index) in decorations.rects" :key="`rect-${index}`"
      :x="rect.x" :y="rect.y" :width="rect.width" :height="rect.height"
      :fill="rect.fill" :opacity="rect.opacity" :rx="rect.rx"
      :transform="rect.transform" :class="rect.animation" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: value => ['hero', 'about', 'skills', 'default'].includes(value)
  },
  viewBox: {
    type: String,
    default: '0 0 1200 800'
  }
})

// 生成唯一ID避免渐变冲突
const uniqueId = computed(() => Math.random().toString(36).substr(2, 9))

// 根据variant配置不同的装饰元素
const decorations = computed(() => {
  const configs = {
    hero: {
      circles: [
        { cx: 200, cy: 200, r: 100, gradient: 1, opacity: 0.5, animation: 'animate-float' },
        { cx: 1000, cy: 800, r: 150, gradient: 2, opacity: 0.4, animation: 'animate-float-reverse' },
        { cx: 1100, cy: 300, r: 80, gradient: 3, opacity: 0.6, animation: 'animate-float' }
      ],
      paths: [
        { d: 'M 0,500 Q 300,350 600,480 T 1200,450', stroke: '#a7f3d0', strokeWidth: 3, opacity: 0.7, animation: 'animate-pulse' },
        { d: 'M 0,600 Q 400,700 800,550 T 1200,580', stroke: '#bef264', strokeWidth: 2, opacity: 0.6, animation: '' },
        { d: 'M 0,300 Q 200,200 500,320 T 1200,280', stroke: '#84cc16', strokeWidth: 1.5, opacity: 0.5, animation: '' }
      ],
      dots: [
        { cx: 150, cy: 400, r: 4, fill: '#84cc16', opacity: 0.8, animation: 'animate-ping', style: '' },
        { cx: 950, cy: 600, r: 6, fill: '#65a30d', opacity: 0.7, animation: 'animate-ping', style: 'animation-delay: 1s;' },
        { cx: 800, cy: 200, r: 5, fill: '#a3e635', opacity: 0.9, animation: 'animate-ping', style: 'animation-delay: 2s;' }
      ],
      polygons: [
        { points: '100,600 140,550 180,600', fill: '#ecfccb', opacity: 0.7, animation: 'animate-float' },
        { points: '1050,150 1090,120 1130,170', fill: '#d9f99d', opacity: 0.6, animation: 'animate-float-reverse' }
      ],
      rects: [
        { x: 50, y: 250, width: 20, height: 20, fill: '#84cc16', opacity: 0.4, rx: 2, transform: 'rotate(45 60 260)', animation: 'animate-float' }
      ]
    },
    about: {
      circles: [
        { cx: 100, cy: 150, r: 60, gradient: 1, opacity: 0.5, animation: '' },
        { cx: 1100, cy: 600, r: 90, gradient: 2, opacity: 0.4, animation: '' }
      ],
      paths: [
        { d: 'M 0,400 Q 200,300 500,380 T 1200,350', stroke: '#a7f3d0', strokeWidth: 2, opacity: 0.7, animation: '' },
        { d: 'M 0,450 Q 300,550 700,420 T 1200,400', stroke: '#bef264', strokeWidth: 1.5, opacity: 0.6, animation: '' }
      ],
      dots: [
        { cx: 250, cy: 250, r: 3, fill: '#84cc16', opacity: 0.7, animation: '', style: '' },
        { cx: 800, cy: 500, r: 5, fill: '#65a30d', opacity: 0.6, animation: '', style: '' },
        { cx: 950, cy: 200, r: 4, fill: '#a3e635', opacity: 0.8, animation: '', style: '' }
      ],
      polygons: [
        { points: '150,500 180,470 210,500', fill: '#ecfccb', opacity: 0.7, animation: '' },
        { points: '1000,150 1030,130 1060,170', fill: '#d9f99d', opacity: 0.6, animation: '' }
      ],
      rects: []
    },
    skills: {
      circles: [
        { cx: 150, cy: 100, r: 80, gradient: 1, opacity: 0.4, animation: '' },
        { cx: 1050, cy: 450, r: 120, gradient: 2, opacity: 0.3, animation: '' }
      ],
      paths: [
        { d: 'M 0,300 Q 300,200 600,280 T 1200,250', stroke: '#a7f3d0', strokeWidth: 2, opacity: 0.6, animation: '' },
        { d: 'M 0,320 Q 400,420 800,300 T 1200,280', stroke: '#bef264', strokeWidth: 1.5, opacity: 0.5, animation: '' }
      ],
      dots: [
        { cx: 300, cy: 180, r: 4, fill: '#84cc16', opacity: 0.6, animation: '', style: '' },
        { cx: 700, cy: 380, r: 6, fill: '#65a30d', opacity: 0.5, animation: '', style: '' },
        { cx: 900, cy: 120, r: 3, fill: '#a3e635', opacity: 0.7, animation: '', style: '' }
      ],
      polygons: [
        { points: '80,400 120,350 160,400', fill: '#ecfccb', opacity: 0.6, animation: '' },
        { points: '950,200 990,180 1030,220', fill: '#d9f99d', opacity: 0.5, animation: '' }
      ],
      rects: []
    }
  }
  
  return configs[props.variant] || configs.default || configs.hero
})
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
}

@keyframes floatReverse {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-reverse {
  animation: floatReverse 8s ease-in-out infinite;
}
</style> 