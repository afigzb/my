<template>
  <router-link 
    :to="`/works/${work.id}`"
    class="work-card z-20"
  >
    <!-- 图片区域 -->
    <div 
      class="image-container"
      @mousemove="handleMouseMove"
      @mouseleave="resetTransform"
      :style="backgroundStyle"
    >
      <div class="image-overlay">

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
  background: white/60;
  backdrop-filter: blur(4px);
  border-radius: 1rem;
  border: 1px solid rgb(229, 231, 235);
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
  margin-bottom: 24px;
  border-radius: 1rem;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 20px;
}

.content {
  padding: 20px;
  background: transparent;
}

.title {
  font-size: 1.25rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 12px;
  line-height: 1.4;
}

.description {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 20px;
  font-size: 0.875rem;
  height: 3.2em; /* 固定高度为两行文本 */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 限制为两行 */
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background: #f0fdf4;
  color: #16a34a;
  padding: 4px 12px;
  border: 1px solid #bbf7d0;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.tag:first-child {
  background: #ecfdf5;
  color: #059669;
  border-color: #a7f3d0;
}
</style> 