<template>
  <div class=" overflow-hidden works-container min-h-screen bg-gradient-to-br from-lime-100/30 to-green-100/30 p-0 m-0">
    <!-- 背景装饰 -->
    <BackgroundDecorator variant="works" viewBox="0 0 1200 1000" />

    <div class="pb-16"></div>
    <!-- 翻页书 -->
    <section class="works-section relative z-10 pb-32 pt-16">
      <div class="works-wrapper mx-auto px-6">
        <div class="book-flex-container flex justify-center">
          <div id="worksBook" ref="worksBook" class="book-container">
            <!-- 封面 -->
            <div class="page cover">
              <div class="cover-content flex flex-col items-center h-full justify-center">
                <h2 class="text-white text-4xl mb-4 font-light">作品集</h2>
                <p class="text-white/90 text-lg mb-8">前端技术探索与实践</p>
                <div class="operation-guide flex flex-col items-center mb-10">
                  <div class="guide-item flex items-center mb-2">
                    <svg class="guide-icon w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span class="text-sm text-white/80">点击图片查看演示</span>
                  </div>
                  <div class="guide-item flex items-center mb-2">
                    <svg class="guide-icon w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                    <span class="text-sm text-white/80">拖拽页面角落翻页</span>
                  </div>
                </div>
                <div class="cover-decoration absolute bottom-16 left-1/2 transform -translate-x-1/2 w-48 h-16">
                  <div class="decoration-line w-full h-0.5 bg-white/40 mb-6 rounded-sm"></div>
                  <div class="decoration-circle w-10 h-10 border-2 border-white/40 rounded-full mx-auto"></div>
                </div>
              </div>
            </div>
            
            <!-- 作品页面 -->
            <div 
              v-for="work in worksData" 
              :key="work.id" 
              class="page work-page"
            >
              <div class="work-content w-full max-w-420 h-full flex flex-col">
                <a :href="work.demoUrl" target="_blank" class="work-image-link no-underline block">
                  <div class="work-image">
                    <img :src="work.image" :alt="work.title" class="w-full h-full object-cover transition-transform duration-300" />
                    <div class="image-overlay">
                      <div class="demo-button">
                        <svg class="demo-icon w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        查看演示
                      </div>
                    </div>
                  </div>
                </a>
                <div class="work-info flex-1 flex flex-col text-left">
                  <h3 class="text-gray-700 text-xl font-semibold mb-3 leading-tight">{{ work.title }}</h3>
                  <p class="work-desc text-gray-500 text-sm leading-relaxed mb-5 flex-1">{{ work.description }}</p>
                  <div class="work-tags flex flex-wrap gap-2 mb-5">
                    <span v-for="tag in work.tags" :key="tag" class="tag">
                      {{ tag }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 封底 -->
            <div class="page back-cover">
              <div class="back-cover-content flex flex-col items-center h-full justify-center">
                <h2 class="text-white text-3xl mb-4 font-light">感谢浏览</h2>
                <p class="text-white/90 text-lg mb-8">持续创新，永不止步</p>
                <div class="back-decoration mb-8">
                  <div class="progress-ring relative w-20 h-20">
                    <svg class="progress-svg w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" class="progress-bg"/>
                      <circle cx="50" cy="50" r="45" class="progress-fill"/>
                    </svg>
                    <div class="progress-text absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-light text-white">∞</div>
                  </div>
                </div>
                <p class="back-subtitle text-white/80 text-sm">更多精彩项目敬请期待</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { worksData } from '../utils/worksData.js'
import BackgroundDecorator from '../components/BackgroundDecorator.vue'

const worksBook = ref(null)
let pageFlip = null

onMounted(() => {
  // 动态加载 page-flip 库
  const script = document.createElement('script')
  script.src = 'https://unpkg.com/page-flip@2.0.7/dist/js/page-flip.browser.js'
  script.onload = () => {
    // 等待Vue渲染完成后初始化
    setTimeout(initPageFlip, 500)
  }
  document.head.appendChild(script)
})

const initPageFlip = () => {
  if (worksBook.value && window.St) {
    const pages = worksBook.value.querySelectorAll('.page')
    
    if (pages.length > 0) {
      pageFlip = new window.St.PageFlip(worksBook.value, {
        width: 600,
        height: 600,
        size: "fixed",
        flippingTime: 1000,
        drawShadow: true,
        maxShadowOpacity: 0.5,
        usePortrait: true,
        autoSize: true,
        showCover: false
      })

      pageFlip.loadFromHTML(pages)
      console.log('翻页书已加载完成！')
    }
  }
}
</script>

<style>
/* 只保留Tailwind无法实现的复杂样式和page-flip必需样式 */

/* 书本容器 - page-flip需要的核心样式 */
.book-container {
  margin: 20px auto;
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);
  border-radius: 12px;
}

.page {
  background: white;
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  user-select: none;
}

/* 封面和封底的复杂渐变背景 */
.page.cover {
  background: linear-gradient(135deg, #65a30d 0%, #16a34a 50%, #0891b2 100%);
  color: white;
}

.page.cover h2 {
  text-shadow: 0 2px 10px rgba(0,0,0,0.3);
}

.page.cover p {
  text-shadow: 0 1px 5px rgba(0,0,0,0.2);
}

.page.back-cover {
  background: linear-gradient(135deg, #48d1a6 0%, #189672 100%);
  color: white;
}

.page.back-cover h2 {
  text-shadow: 0 2px 10px rgba(0,0,0,0.3);
}

.page.back-cover p {
  text-shadow: 0 1px 5px rgba(0,0,0,0.2);
}

/* 复杂动画 */
.progress-bg {
  fill: none;
  stroke: rgba(255, 255, 255, 0.3);
  stroke-width: 3;
}

.progress-fill {
  fill: none;
  stroke: white;
  stroke-width: 3;
  stroke-dasharray: 283;
  stroke-dashoffset: 70;
  animation: progressAnimation 3s ease-in-out infinite;
}

@keyframes progressAnimation {
  0% { stroke-dashoffset: 283; }
  50% { stroke-dashoffset: 70; }
  100% { stroke-dashoffset: 283; }
}

/* 作品页面样式 */
.work-page {
  padding: 25px;
  background: linear-gradient(135deg, #fefefe 0%, #f9fafb 100%);
}

/* 复杂的悬停效果和backdrop-filter */
.work-image {
  width: 100%;
  height: 220px;
  margin-bottom: 25px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}

.work-image:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.15);
}

.work-image:hover img {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.work-image:hover .image-overlay {
  opacity: 1;
}

.demo-button {
  color: #1f2937;
  font-size: 14px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.9);
  padding: 12px 20px;
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.demo-button:hover {
  background: rgba(255, 255, 255, 1);
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.tag {
  background: linear-gradient(135deg, #ecfccb 0%, #dcfce7 100%);
  color: #365314;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid #d9f99d;
}
</style> 