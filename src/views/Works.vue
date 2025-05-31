<template>
  <div class="works-container">
    <!-- 背景装饰 -->
    <BackgroundDecorator variant="works" viewBox="0 0 1200 1000" />

    <div class="pb-16"></div>
    <!-- 翻页书 -->
    <section class="works-section">
      <div class="works-wrapper">
        <div class="book-flex-container">
          <div id="worksBook" ref="worksBook" class="book-container">
            <!-- 封面 -->
            <div class="page cover">
              <div class="cover-content">
                <h2>作品集</h2>
                <p>前端技术探索与实践</p>
                <div class="operation-guide">
                  <div class="guide-item">
                    <svg class="guide-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>点击图片查看演示</span>
                  </div>
                  <div class="guide-item">
                    <svg class="guide-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                    <span>拖拽页面角落翻页</span>
                  </div>
                </div>
                <div class="cover-decoration">
                  <div class="decoration-line"></div>
                  <div class="decoration-circle"></div>
                </div>
              </div>
            </div>
            
            <!-- 作品页面 -->
            <div 
              v-for="work in worksData" 
              :key="work.id" 
              class="page work-page"
            >
              <div class="work-content">
                <a :href="work.demoUrl" target="_blank" class="work-image-link">
                  <div class="work-image">
                    <img :src="work.image" :alt="work.title" />
                    <div class="image-overlay">
                      <div class="demo-button">
                        <svg class="demo-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        查看演示
                      </div>
                    </div>
                  </div>
                </a>
                <div class="work-info">
                  <h3>{{ work.title }}</h3>
                  <p class="work-desc">{{ work.description }}</p>
                  <div class="work-tags">
                    <span v-for="tag in work.tags" :key="tag" class="tag">
                      {{ tag }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 封底 -->
            <div class="page back-cover">
              <div class="back-cover-content">
                <h2>感谢浏览</h2>
                <p>持续创新，永不止步</p>
                <div class="back-decoration">
                  <div class="progress-ring">
                    <svg class="progress-svg" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" class="progress-bg"/>
                      <circle cx="50" cy="50" r="45" class="progress-fill"/>
                    </svg>
                    <div class="progress-text">∞</div>
                  </div>
                </div>
                <p class="back-subtitle">更多精彩项目敬请期待</p>
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
        width: 500,
        height: 600,
        size: "fixed",
        flippingTime: 1000,
        drawShadow: true,
        maxShadowOpacity: 0.5,
        usePortrait: true,
        autoSize: true,
        showCover: false,
        mobileScrollSupport: true
      })

      pageFlip.loadFromHTML(pages)
      console.log('翻页书已加载完成！')
    }
  }
}
</script>

<style>
/* 主容器样式 */
.works-container {
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(236, 252, 203, 0.3) 0%, rgba(220, 252, 231, 0.3) 100%);
  padding: 0;
  margin: 0;
}

.works-section {
  position: relative;
  z-index: 10;
  padding-bottom: 8rem;
  padding-top: 4rem;
}

.works-wrapper {
  margin: 0 auto;
  padding: 0 1.5rem;
}

.book-flex-container {
  display: flex;
  justify-content: center;
}

/* SVG 图标样式 */
.demo-icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.5rem;
}

/* 书本容器 */
.book-container {
  margin: 20px auto;
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);
  border-radius: 12px;
  overflow: hidden;
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

/* 封面样式 - 调整为更柔和但仍有深度的颜色 */
.page.cover {
  background: linear-gradient(135deg, #65a30d 0%, #16a34a 50%, #0891b2 100%);
  color: white;
}

.cover-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: center;
}

.page.cover h2 {
  color: white;
  font-size: 36px;
  margin-bottom: 15px;
  font-weight: 300;
  text-shadow: 0 2px 10px rgba(0,0,0,0.3);
}

.page.cover p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 18px;
  margin-bottom: 30px;
  text-shadow: 0 1px 5px rgba(0,0,0,0.2);
}

.operation-guide {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
}

.guide-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.guide-icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.5rem;
}

.guide-item span {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

.cover-decoration {
  position: absolute;
  bottom: 60px;
  width: 200px;
  height: 60px;
}

.decoration-line {
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 0.4);
  margin-bottom: 20px;
  border-radius: 1px;
}

.decoration-circle {
  width: 40px;
  height: 40px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  margin: 0 auto;
}

/* 封底样式 - 改回绿色系 */
.page.back-cover {
  background: linear-gradient(135deg, #48d1a6 0%, #189672 100%);
  color: white;
}

.back-cover-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: center;
}

.page.back-cover h2 {
  color: white;
  font-size: 32px;
  margin-bottom: 15px;
  font-weight: 300;
  text-shadow: 0 2px 10px rgba(0,0,0,0.3);
}

.page.back-cover p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 18px;
  margin-bottom: 30px;
  text-shadow: 0 1px 5px rgba(0,0,0,0.2);
}

.back-decoration {
  margin-bottom: 30px;
}

.progress-ring {
  position: relative;
  width: 80px;
  height: 80px;
}

.progress-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

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

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  font-weight: 300;
  color: white;
}

.back-subtitle {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
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

.work-content {
  width: 100%;
  max-width: 420px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.work-image-link {
  text-decoration: none;
  display: block;
}

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

.work-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
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

.work-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: left;
}

.work-info h3 {
  color: #374151;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 12px;
  line-height: 1.3;
}

.work-desc {
  color: #6b7280;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 20px;
  flex: 1;
}

.work-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
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