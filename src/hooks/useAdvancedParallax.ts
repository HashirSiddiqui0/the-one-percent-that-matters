import { useRef, useEffect } from 'react'
import { useScroll, useSpring, useTransform, MotionValue } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { EASING } from '@/lib/utils'

interface ParallaxOptions {
  speed?: number
  damping?: number
  stiffness?: number
  smooth?: boolean
  threshold?: number
  rootMargin?: string
}

interface ParallaxResult {
  parallaxY: MotionValue<string>
  progress: MotionValue<number>
  velocity: MotionValue<number>
  isInView: boolean
  ref: (node?: Element | null) => void
}

export const useAdvancedParallax = (options: ParallaxOptions = {}): ParallaxResult => {
  const {
    speed = 0.5,
    damping = 20,
    stiffness = 100,
    smooth = true,
    threshold = 0,
    rootMargin = "-20% 0px -20% 0px"
  } = options

  const elementRef = useRef<Element | null>(null)
  const [ref, inView] = useInView({
    threshold,
    rootMargin
  })

  // Update elementRef when inView ref changes
  useEffect(() => {
    return () => {
      const callback = (node?: Element | null) => {
        elementRef.current = node || null
        return ref(node)
      }
      callback(elementRef.current)
    }
  }, [ref])

  const { scrollY } = useScroll()
  
  const springConfig = {
    damping,
    stiffness,
    mass: 1
  }

  // Create smooth parallax effect
  const y = useTransform(scrollY, [0, 1000], [0, 500 * speed])
  const parallaxY = useSpring(smooth ? y : scrollY, springConfig)

  // Track progress for animations
  const progress = useTransform(scrollY, 
    (value) => {
      const element = elementRef.current
      if (!element) return 0
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const offsetTop = rect.top + value
      const total = windowHeight + rect.height
      return Math.max(0, Math.min(1, (value - offsetTop + windowHeight) / total))
    }
  )

  // Track velocity for dynamic effects
  const velocity = useSpring(useTransform(scrollY, [0, 1], [0, 1]), {
    damping: 50,
    stiffness: 400
  })

  return {
    parallaxY: useTransform(parallaxY, (value) => `${value}px`),
    progress,
    velocity,
    isInView: inView,
    ref
  }
}
