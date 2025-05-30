<template>
  <router-link 
    :to="`/works/${work.id}`"
    class="work-card  z-20"
  >
    <!-- 图片区域 -->
    <div 
      class="image-container"
      @mousemove="handleMouseMove"
      @mouseleave="resetTransform"
      :style="backgroundStyle"
    >
    </div>

    <!-- 内容区域 -->
    <div class="content">
      <h3 class="title">{{ work.title }}</h3>
      <p class="description">{{ work.description }}</p>
      
      <!-- 标签 -->
      <div class="tags">
        <span 
          v-for="tag in work.tags" 
          :key="tag"
          class="tag"
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
.work-card {
  display: block;
  text-decoration: none;
  transition: all 0.3s ease;
  overflow: hidden;
}

.image-container {
  height: 320px;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s ease-out;
  transform-style: preserve-3d;
  border-radius: 1rem 1rem 0 0;
}

.content {
  padding: 1.25rem;
}

.title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.description {
  color: #6b7280;
  line-height: 1.5;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: #f0fdf4;
  color: #059669;
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
}
</style> 