'use client'

import { useEffect, useState, useRef, useCallback } from 'react'

interface ScrollOptimizationConfig {
  throttleMs?: number
  velocityThreshold?: number
  momentumDuration?: number
  enableMomentum?: boolean
  reducedMotionFallback?: boolean
}

interface ScrollMetrics {
  isScrolling: boolean
  velocity: number
  direction: 'up' | 'down' | 'none'
  position: number
  deltaY: number
}

/**
 * Highly optimized scroll hook with minimal performance overhead
 * Reduced complexity while maintaining essential functionality
 */
export const useScrollOptimization = (config: ScrollOptimizationConfig = {}) => {
  const {
    throttleMs = 16, // 60fps target
    velocityThreshold = 2,
    momentumDuration = 150,
    enableMomentum = true,
    reducedMotionFallback = true
  } = config

  const [metrics, setMetrics] = useState<ScrollMetrics>({
    isScrolling: false,
    velocity: 0,
    direction: 'none',
    position: 0,
    deltaY: 0
  })

  const lastScrollTime = useRef(0)
  const lastScrollY = useRef(0)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()
  const isThrottled = useRef(false)
  const prefersReducedMotion = useRef(false)
  
  // Check for reduced motion preference once
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      prefersReducedMotion.current = mediaQuery.matches
    }
  }, [])

  // Optimized scroll handler with minimal calculations
  const handleScroll = useCallback(() => {
    if (isThrottled.current) return
    
    isThrottled.current = true
    
    // Use requestAnimationFrame for optimal performance
    requestAnimationFrame(() => {
      const currentTime = performance.now()
      const currentY = window.scrollY
      
      // Simple velocity calculation
      const timeDelta = currentTime - lastScrollTime.current
      const yDelta = currentY - lastScrollY.current
      const velocity = timeDelta > 0 ? Math.abs(yDelta) / timeDelta : 0
      
      // Direction calculation
      const direction: 'up' | 'down' | 'none' = 
        yDelta > 0 ? 'down' : yDelta < 0 ? 'up' : 'none'
      
      // Update metrics efficiently
      setMetrics(prev => ({
        ...prev,
        isScrolling: true,
        velocity: Math.round(velocity * 10) / 10, // Reduced precision for performance
        direction,
        position: currentY,
        deltaY: yDelta
      }))
      
      // Simple momentum optimization
      if (enableMomentum && !prefersReducedMotion.current) {
        if (velocity > velocityThreshold) {
          document.body.classList.add('momentum-scroll')
        } else {
          document.body.classList.remove('momentum-scroll')
        }
      }
      
      // Update references
      lastScrollTime.current = currentTime
      lastScrollY.current = currentY
      
      // Clear scrolling state after delay
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        setMetrics(prev => ({ ...prev, isScrolling: false }))
        if (enableMomentum) {
          document.body.classList.remove('momentum-scroll')
        }
      }, momentumDuration)
      
      // Reset throttle
      setTimeout(() => {
        isThrottled.current = false
      }, throttleMs)
    })
  }, [velocityThreshold, enableMomentum, momentumDuration, throttleMs])

  // Optimized event listener setup
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Use passive listeners for better performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      // Clean up momentum classes
      if (enableMomentum) {
        document.body.classList.remove('momentum-scroll')
      }
    }
  }, [handleScroll, enableMomentum])

  return metrics
} 