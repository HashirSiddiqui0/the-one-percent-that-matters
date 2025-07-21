import { useRef, useEffect, useState } from 'react'
import { useScroll, useSpring, useTransform, MotionValue } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

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
}

export const useAdvancedParallax = (
  ref: React.RefObject<HTMLElement>,
  options: ParallaxOptions = {}
): ParallaxResult => {
  const {
    speed = 0.5,
    damping = 20,
    stiffness = 100,
    smooth = true,
    threshold = 0,
    rootMargin = "-20% 0px -20% 0px"
  } = options

  // Intersection observer for optimized performance
  const [inViewRef, isInView] = useInView({
    threshold,
    rootMargin,
    triggerOnce: false
  })

  // Combine refs
  useEffect(() => {
    if (ref.current) {
      inViewRef(ref.current)
    }
  }, [ref, inViewRef])

  // Scroll progress and velocity
  const { scrollYProgress, scrollY } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Smooth progress with spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    damping,
    stiffness,
    mass: 0.1,
    restDelta: 0.001
  })

  // Calculate velocity from scrollY
  const velocity = useTransform(scrollY, (latest) => scrollY.getVelocity())

  // Smooth velocity with spring physics
  const smoothVelocity = useSpring(velocity, {
    damping: damping * 2,
    stiffness: stiffness * 2,
    mass: 0.1,
    restDelta: 0.001
  })

  // Transform progress into parallax Y position
  const parallaxY = useTransform(
    smooth ? smoothProgress : scrollYProgress,
    [0, 1],
    [`${speed * 100}%`, `${-speed * 100}%`]
  )

  return {
    parallaxY,
    progress: smooth ? smoothProgress : scrollYProgress,
    velocity: smooth ? smoothVelocity : velocity,
    isInView
  }
}
