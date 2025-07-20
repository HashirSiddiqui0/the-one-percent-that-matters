'use client'

import React, { memo, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface ParallaxLayer {
  children: React.ReactNode
  speed?: number
  opacity?: number
  blur?: number
  scale?: number
}

interface ParallaxContainerProps {
  children: React.ReactNode
  layers?: ParallaxLayer[]
  className?: string
  style?: React.CSSProperties
}

/**
 * Highly optimized ParallaxContainer with minimal performance overhead
 * Uses CSS transforms and GPU acceleration for smooth animations
 */
const ParallaxContainer: React.FC<ParallaxContainerProps> = memo(({ 
  children, 
  layers = [], 
  className = '', 
  style = {} 
}) => {
  const shouldReduceMotion = useReducedMotion()

  // Memoized layer styles for better performance
  const optimizedLayers = useMemo(() => {
    if (shouldReduceMotion) {
      // Static layers for reduced motion
      return layers.map((layer, index) => ({
        ...layer,
        speed: 0,
        style: {
          opacity: layer.opacity || 1,
          filter: layer.blur ? `blur(${layer.blur}px)` : 'none',
          transform: `scale(${layer.scale || 1})`,
          willChange: 'auto'
        }
      }))
    }

    // Optimized layers for normal motion
    return layers.map((layer, index) => ({
      ...layer,
      style: {
        opacity: layer.opacity || 1,
        filter: layer.blur ? `blur(${layer.blur}px)` : 'none',
        transform: `scale(${layer.scale || 1}) translateZ(0)`,
        willChange: 'transform',
        backfaceVisibility: 'hidden' as const,
        perspective: '1000px'
      }
    }))
  }, [layers, shouldReduceMotion])

  // Memoized container styles with enhanced performance
  const containerStyles = useMemo(() => ({
    position: 'relative' as const,
    isolation: 'isolate' as const,
    contain: 'layout style paint' as const,
    willChange: 'transform' as const,
    transform: 'translateZ(0)' as const,
    backfaceVisibility: 'hidden' as const,
    perspective: '1000px' as const,
    ...style
  }), [style])

  return (
    <div 
      className={`parallax-container ${className}`}
      style={containerStyles}
    >
      {/* Background Layers - Optimized */}
      {optimizedLayers.map((layer, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 parallax-layer"
          style={layer.style}
          initial={{ opacity: 0 }}
          animate={{ opacity: layer.opacity || 1 }}
          transition={{ 
            duration: shouldReduceMotion ? 0.1 : 1.2,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          {layer.children}
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
})

ParallaxContainer.displayName = 'ParallaxContainer'

export default ParallaxContainer 