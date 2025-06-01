<template>
  <router-link 
    :to="`/works/${work.id}`"
    class="block no-underline transition-all duration-300 ease-in-out overflow-hidden z-20"
  >
    <!-- 图片区域 -->
    <div 
      class="h-48 sm:h-64 lg:h-80 relative overflow-hidden transition-transform duration-200 ease-out rounded-t-2xl preserve-3d"
      @mousemove="handleMouseMove"
      @mouseleave="resetTransform"
      :style="backgroundStyle"
    >
    </div>

    <!-- 内容区域 -->
    <div class="p-4 sm:p-5">
      <h3 class="text-base sm:text-lg font-semibold text-gray-700 mb-2">{{ work.title }}</h3>
      <p class="text-gray-500 leading-relaxed mb-3 sm:mb-4 text-sm line-clamp-2">{{ work.description }}</p>
      
      <!-- 标签 -->
      <div class="flex flex-wrap gap-1.5 sm:gap-2">
        <span 
          v-for="tag in work.tags" 
          :key="tag"
          class="bg-green-50 text-emerald-600 px-2 py-1 sm:px-3 sm:py-1 rounded-lg text-xs font-medium"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  work: {
    type: Object,
    required: true
  }
})

const rotateX = ref(0)
const rotateY = ref(0)

const backgroundStyle = computed(() => {
  const transform = `perspective(1000px) rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg)`
  
  if (props.work.image) {
    return {
      transform,
      backgroundImage: `url(${props.work.image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
  } else {
    return {
      transform,
      background: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)'
    }
  }
})

const handleMouseMove = (event) => {
  const card = event.currentTarget
  const rect = card.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  
  const mouseX = event.clientX - centerX
  const mouseY = event.clientY - centerY
  
  // 计算旋转角度，限制在-10到10度之间
  const maxRotation = 10
  rotateX.value = -(mouseY / rect.height) * maxRotation
  rotateY.value = (mouseX / rect.width) * maxRotation
}

const resetTransform = () => {
  rotateX.value = 0
  rotateY.value = 0
}
</script>

<style scoped>
/* 只保留Tailwind无法实现的样式 */
.preserve-3d {
  transform-style: preserve-3d;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 