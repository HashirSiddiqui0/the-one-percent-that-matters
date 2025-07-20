'use client'

import React, { memo, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface PerformanceMetrics {
  fps: number
  memoryUsed: number
  renderTime: number
  scrollLatency: number
}

/**
 * Lightweight Performance Monitor for development only
 * Minimal overhead, essential metrics only
 */
const PerformanceMonitor: React.FC = memo(() => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    memoryUsed: 0,
    renderTime: 0,
    scrollLatency: 0
  })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== 'development') return

    let frameCount = 0
    let lastTime = performance.now()
    let animationFrame: number

    const updateMetrics = () => {
      const currentTime = performance.now()
      frameCount++

      // Update FPS every second
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
        
        // Get memory info if available
        const memory = (performance as any).memory
        const memoryUsed = memory ? Math.round(memory.usedJSHeapSize / 1048576) : 0
        
        setMetrics(prev => ({
          ...prev,
          fps,
          memoryUsed,
          renderTime: Math.round(currentTime - lastTime)
        }))

        frameCount = 0
        lastTime = currentTime
      }

      animationFrame = requestAnimationFrame(updateMetrics)
    }

    updateMetrics()

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [])

  // Toggle visibility on key press
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'p' && e.ctrlKey) {
        setIsVisible(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  // Don't render in production
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50 text-xs text-gray-500 font-mono">
        Press Ctrl+P for perf
      </div>
    )
  }

  const getStatusColor = (fps: number) => {
    if (fps >= 55) return 'text-green-400'
    if (fps >= 30) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50 bg-black/90 border border-gray-600 rounded-lg p-3 font-mono text-xs"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="space-y-1">
        <div className="text-blue-400 font-bold mb-2">Performance Monitor</div>
        
        <div className="flex justify-between">
          <span className="text-gray-400">FPS:</span>
          <span className={getStatusColor(metrics.fps)}>{metrics.fps}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-400">Memory:</span>
          <span className="text-gray-300">{metrics.memoryUsed}MB</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-400">Render:</span>
          <span className="text-gray-300">{metrics.renderTime}ms</span>
        </div>
        
        <div className="border-t border-gray-600 pt-1 mt-2">
          <div className="text-xs text-gray-500">Ctrl+P to toggle</div>
        </div>
      </div>
    </motion.div>
  )
})

PerformanceMonitor.displayName = 'PerformanceMonitor'

export default PerformanceMonitor 