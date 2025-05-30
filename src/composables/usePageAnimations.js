import { nextTick, onMounted, onUnmounted, ref } from 'vue'

/**
 * 页面动画管理 Composable
 * @param {Object} options 配置选项
 * @param {boolean} options.enableScrollEffects 是否启用滚动效果
 * @param {number} options.staggerDelay 错开动画的延迟时间
 * @param {boolean} options.enableLazyLoad 是否启用懒加载
 */
export function usePageAnimations(options = {}) {
  const {
    enableScrollEffects = false,
    staggerDelay = 0.2,
    enableLazyLoad = true
  } = options

  const isLoaded = ref(false)
  const visibleSections = ref(new Set())

  // 初始化淡入动画（仅首屏内容）
  const initFadeInAnimations = () => {
    nextTick(() => {
      const animatedElements = document.querySelectorAll('.animate-fade-in-up:not(.lazy-load)')
      animatedElements.forEach((el, index) => {
        if (!el.style.animationDelay) {
          el.style.animationDelay = `${index * staggerDelay}s`
        }
      })
      isLoaded.value = true
    })
  }

  // 懒加载动画
  const initLazyAnimations = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const section = entry.target
        const sectionId = section.dataset.section || 'unknown'
        
        if (!visibleSections.value.has(sectionId)) {
          visibleSections.value.add(sectionId)
          
          // 延迟加载该区域的动画元素
          setTimeout(() => {
            const lazyElements = section.querySelectorAll('.animate-fade-in-up.lazy-load')
            lazyElements.forEach((el, index) => {
              el.style.animationDelay = `${index * 0.1}s`
              el.classList.add('animate-start')
            })
          }, 200)
        }
      }
    })
  }

  // Intersection Observer for lazy loading
  let observer = null
  const enableLazyLoading = () => {
    if (!enableLazyLoad) return

    observer = new IntersectionObserver(initLazyAnimations, {
      threshold: 0.1,
      rootMargin: '50px 0px'
    })

    // 观察所有section
    const sections = document.querySelectorAll('[data-section]')
    sections.forEach(section => observer.observe(section))
  }

  // 滚动视差效果处理（简化版）
  const handleScrollEffects = () => {
    if (!enableScrollEffects || !isLoaded.value) return

    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll('.parallax-element')
    
    // 使用requestAnimationFrame优化性能
    requestAnimationFrame(() => {
      parallaxElements.forEach((el, index) => {
        const speed = 0.5 + (index * 0.1)
        if (el.style) {
          el.style.transform = `translateY(${scrolled * speed}px)`
        }
      })
    })
  }

  // 添加滚动监听（节流）
  let scrollCleanup = null
  let scrollTimeout = null
  const enableScrollListener = () => {
    if (enableScrollEffects) {
      const throttledScroll = () => {
        if (scrollTimeout) return
        scrollTimeout = setTimeout(() => {
          handleScrollEffects()
          scrollTimeout = null
        }, 16) // ~60fps
      }

      window.addEventListener('scroll', throttledScroll, { passive: true })
      scrollCleanup = () => {
        window.removeEventListener('scroll', throttledScroll)
        if (scrollTimeout) clearTimeout(scrollTimeout)
      }
    }
  }

  // 页面可见性动画
  const animateOnVisible = (selector, animationClass = 'animate-fade-in-up') => {
    const visibilityObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animationClass)
          visibilityObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })

    const elements = document.querySelectorAll(selector)
    elements.forEach(el => visibilityObserver.observe(el))

    return () => visibilityObserver.disconnect()
  }

  // 预加载关键资源
  const preloadCritical = () => {
    // 预加载字体和关键图片
    const preloadFont = document.createElement('link')
    preloadFont.rel = 'preload'
    preloadFont.as = 'font'
    preloadFont.type = 'font/woff2'
    preloadFont.crossOrigin = 'anonymous'
    document.head.appendChild(preloadFont)
  }

  // 自动清理函数
  let cleanupFunctions = []

  onMounted(() => {
    preloadCritical()
    initFadeInAnimations()
    
    // 延迟初始化非关键功能
    setTimeout(() => {
      enableLazyLoading()
      enableScrollListener()
    }, 500)
  })

  onUnmounted(() => {
    if (scrollCleanup) scrollCleanup()
    if (observer) observer.disconnect()
    cleanupFunctions.forEach(cleanup => cleanup())
  })

  return {
    isLoaded,
    visibleSections,
    initFadeInAnimations,
    animateOnVisible,
    handleScrollEffects
  }
}

/**
 * 通用样式常量
 */
export const THEME_COLORS = {
  background: 'bg-gray-50',
  primary: 'bg-lime-500',
  primaryHover: 'hover:bg-lime-600',
  primaryLight: 'bg-lime-50',
  primaryText: 'text-lime-700',
  accent: 'bg-lime-400',
  card: 'bg-white/70',
  cardBorder: 'border-gray-100',
  text: {
    primary: 'text-gray-800',
    secondary: 'text-gray-600',
    light: 'text-gray-500'
  }
}

/**
 * 通用动画类
 */
export const ANIMATIONS = {
  fadeInUp: 'animate-fade-in-up',
  float: 'animate-float',
  floatReverse: 'animate-float-reverse',
  ping: 'animate-ping',
  pulse: 'animate-pulse',
  bounce: 'animate-bounce'
}

/**
 * 通用CSS类生成器
 */
export const createCardClass = (variant = 'default') => {
  const baseClass = `${THEME_COLORS.card} backdrop-blur-sm p-6 rounded-lg ${THEME_COLORS.cardBorder} hover:shadow-lg transition-all duration-300`
  
  const variants = {
    default: baseClass,
    hover: `${baseClass} hover:${THEME_COLORS.primaryLight} hover:${THEME_COLORS.primaryText}`,
    button: `px-6 py-3 ${THEME_COLORS.card} backdrop-blur-sm ${THEME_COLORS.text.primary} rounded-lg hover:${THEME_COLORS.primaryLight} hover:${THEME_COLORS.primaryText} transition-all duration-300 transform hover:scale-105 border ${THEME_COLORS.cardBorder} shadow-lg`
  }
  
  return variants[variant] || variants.default
} 