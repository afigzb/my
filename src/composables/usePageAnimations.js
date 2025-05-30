import { nextTick, onMounted, onUnmounted } from 'vue'

/**
 * 页面动画管理 Composable
 * @param {Object} options 配置选项
 * @param {boolean} options.enableScrollEffects 是否启用滚动效果
 * @param {number} options.staggerDelay 错开动画的延迟时间
 */
export function usePageAnimations(options = {}) {
  const {
    enableScrollEffects = false,
    staggerDelay = 0.2
  } = options

  // 初始化淡入动画
  const initFadeInAnimations = () => {
    nextTick(() => {
      const animatedElements = document.querySelectorAll('.animate-fade-in-up')
      animatedElements.forEach((el, index) => {
        if (!el.style.animationDelay) {
          el.style.animationDelay = `${index * staggerDelay}s`
        }
      })
    })
  }

  // 滚动视差效果处理
  const handleScrollEffects = () => {
    if (!enableScrollEffects) return

    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll('.parallax-element')
    
    parallaxElements.forEach((el, index) => {
      const speed = 0.5 + (index * 0.1)
      if (el.style) {
        el.style.transform = `translateY(${scrolled * speed}px)`
      }
    })
  }

  // 添加滚动监听
  let scrollCleanup = null
  const enableScrollListener = () => {
    if (enableScrollEffects) {
      window.addEventListener('scroll', handleScrollEffects, { passive: true })
      scrollCleanup = () => window.removeEventListener('scroll', handleScrollEffects)
    }
  }

  // 页面可见性动画
  const animateOnVisible = (selector, animationClass = 'animate-fade-in-up') => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animationClass)
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })

    const elements = document.querySelectorAll(selector)
    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }

  // 自动清理函数
  let cleanupFunctions = []

  onMounted(() => {
    initFadeInAnimations()
    enableScrollListener()
  })

  onUnmounted(() => {
    if (scrollCleanup) scrollCleanup()
    cleanupFunctions.forEach(cleanup => cleanup())
  })

  return {
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