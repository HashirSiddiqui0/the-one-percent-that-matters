import { useScroll, useSpring, useTransform, MotionValue } from 'framer-motion'
import { RefObject, useEffect, useState, useRef } from 'react'

interface ParallaxConfig {
  speed?: number
  damping?: number
  stiffness?: number
  range?: [number, number]
  output?: [string, string]
  smooth?: boolean
  threshold?: number
}

interface AdvancedParallaxHook {
  scrollY: MotionValue<number>
  parallaxY: MotionValue<string>
  progress: MotionValue<number>
  isInView: boolean
  velocity: MotionValue<number>
}

export const useAdvancedParallax = (
  ref: RefObject<HTMLElement>,
  config: ParallaxConfig = {}
): AdvancedParallaxHook => {
  const {
    speed = 0.5,
    damping = 50,
    stiffness = 400,
    range = [0, 1],
    output = ['0%', `${speed * 100}%`],
    smooth = true,
    threshold = 0.1
  } = config

  const [isInView, setIsInView] = useState(false)
  const intersectionRef = useRef<IntersectionObserver>()

  // Enhanced scroll tracking with velocity
  const { scrollYProgress, scrollY } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Smooth parallax with spring physics
  const smoothProgress = smooth 
    ? useSpring(scrollYProgress, { damping, stiffness })
    : scrollYProgress

  // Ultra-smooth parallax transformation with refined easing
  const parallaxY = useTransform(
    smoothProgress,
    range,
    output,
    {
      ease: (t: number) => {
        // Refined easing for silky smooth parallax
        return t < 0.5 
          ? 16 * t * t * t * t * t 
          : 1 - Math.pow(-2 * t + 2, 5) / 2
      }
    }
  )

  // Scroll velocity for momentum effects
  const velocity = useTransform(scrollY, (latest) => scrollY.getVelocity())

  // Intersection Observer for performance optimization
  useEffect(() => {
    if (!ref.current) return

    intersectionRef.current = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting || entry.intersectionRatio > threshold)
      },
      {
        threshold,
        rootMargin: '50px'
      }
    )

    intersectionRef.current.observe(ref.current)

    return () => {
      if (intersectionRef.current) {
        intersectionRef.current.disconnect()
      }
    }
  }, [ref, threshold])

  return {
    scrollY,
    parallaxY,
    progress: smoothProgress,
    isInView,
    velocity
  }
}
