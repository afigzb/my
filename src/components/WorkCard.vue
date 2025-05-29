<template>
  <router-link 
    :to="`/works/${work.id}`"
    class="work-card"
  >
    <!-- 图片区域 -->
    <div 
      class="image-container"
      @mousemove="handleMouseMove"
      @mouseleave="resetTransform"
      :style="backgroundStyle"
    >
      <div class="image-overlay">
        <div class="work-category">
          {{ work.tags[0] }}
        </div>
      </div>
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
  background: white;
}


.image-container {
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s ease-out;
  transform-style: preserve-3d;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 20px;
}

.work-category {
  font-size: 1rem;
  font-weight: 500;
  color: white;
  background: rgba(22, 163, 74, 0.8);
  padding: 6px 16px;
  border-radius: 0;
  backdrop-filter: blur(10px);
}

.content {
  padding: 32px;
  background: white;
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #000000;
  margin-bottom: 12px;
  line-height: 1.4;
}

.description {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 20px;
  font-size: 1.1rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background: #f9fafb;
  color: #374151;
  padding: 6px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 0;
  font-size: 0.9rem;
  font-weight: 500;
}

.tag:first-child {
  background: #16a34a;
  color: white;
  border-color: #16a34a;
}
</style> 