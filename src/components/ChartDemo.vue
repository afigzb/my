<template>
  <div class="chart-container">
    <h3 class="text-2xl font-bold mb-4 text-white">数据可视化示例</h3>
    <div ref="chartRef" class="w-full h-64 bg-white rounded-lg shadow-lg"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref(null)
let chartInstance = null

onMounted(() => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value)
    
    const option = {
      title: {
        text: '技能熟练度',
        left: 'center',
        textStyle: {
          fontSize: 16
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: ['HTML', 'CSS', 'JavaScript', 'Vue', 'Vite']
      },
      yAxis: {
        type: 'value',
        max: 100
      },
      series: [{
        data: [95, 90, 85, 80, 75],
        type: 'bar',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#667eea' },
            { offset: 1, color: '#764ba2' }
          ])
        }
      }]
    }
    
    chartInstance.setOption(option)
    
    // 响应式调整
    window.addEventListener('resize', handleResize)
  }
})

const handleResize = () => {
  if (chartInstance) {
    chartInstance.resize()
  }
}

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose()
  }
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.chart-container {
  margin-top: 2rem;
}
</style> 