import { nextTick, onMounted, ref } from 'vue'

/**
 * 简化的页面动画管理 Composable
 * @param {Object} options 配置选项
 */
export function usePageAnimations(options = {}) {
  const { staggerDelay = 0.2 } = options
  const isLoaded = ref(false)

  // 初始化淡入动画
  const initFadeInAnimations = () => {
    nextTick(() => {
      const animatedElements = document.querySelectorAll('.animate-fade-in-up')
      animatedElements.forEach((el, index) => {
        if (!el.style.animationDelay) {
          el.style.animationDelay = `${index * staggerDelay}s`
        }
      })
      isLoaded.value = true
    })
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

  onMounted(() => {
    initFadeInAnimations()
  })

  return {
    isLoaded,
    initFadeInAnimations,
    animateOnVisible
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