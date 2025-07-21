'use client'

import { motion, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import { 
  FiTarget,
  FiEye,
  FiGlobe,
  FiUsers,
  FiUnlock,
  FiCpu,
  FiLock,
  FiPower,
  FiPlay,
  FiPause,
  FiRotateCcw,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi'
import ParallaxContainer from './ParallaxContainer'
import { useAdvancedParallax } from '@/hooks/useAdvancedParallax'
import { EASING } from '@/lib/utils'

interface SolutionModule {
  id: string
  name: string
  solves: string
  method: string
  evidence: string
  impact: string
  icon: React.ReactNode
  color: string
  deploymentStatus: 'classified' | 'operational' | 'enhanced'
}

interface DeploymentStats {
  problems_solved: number
  fraud_prevented: string
  uptime: string
  accuracy: string
}

const ShuftiDifference: React.FC = () => {
  const [activeSolution, setActiveSolution] = useState(0)
  const [deploymentPhase, setDeploymentPhase] = useState<'locked' | 'unlocking' | 'revealed'>('locked')
  const [isDeploying, setIsDeploying] = useState(false)
  
  const {
    parallaxY: baseParallax,
    progress,
    velocity,
    isInView,
    ref: sectionRef
  } = useAdvancedParallax({
    speed: 0.6, // Ultra-smooth speed for silky motion
    damping: 15, // Ultra-low damping for buttery smooth movement
    stiffness: 120, // Reduced stiffness for fluid motion
    smooth: true // Enable smooth interpolation
  })

  // Ultra-smooth transforms with refined curves
  const gridScale = useTransform(progress, [0, 0.3, 0.7, 1], [0.92, 1.08, 1.02, 0.96])
  const deploymentGlow = useSpring(
    useTransform(progress, [0.1, 0.8], [0, 1]),
    { damping: 12, stiffness: 80 } // Ultra-smooth spring response
  )
  
  // Refined momentum effects for silky smooth parallax
  const momentumY = useTransform(velocity, [-1000, 1000], ['-1.2%', '1.2%'])
  const momentumRotate = useTransform(velocity, [-1000, 1000], [-0.15, 0.15])
  const momentumScale = useTransform(velocity, [-1000, 0, 1000], [0.992, 1, 1.008])
  
  // Additional transforms for parallax layers
  const layerScale = useTransform(progress, [0, 1], [0.95, 1.05])
  const layerRotate = useTransform(progress, [0, 1], [-2, 2])
  
  // Header transforms
  const headerY = useTransform(progress, [0, 0.5, 1], ['-3%', '0%', '3%'])
  const headerScale = useTransform(progress, [0, 0.5, 1], [0.98, 1.01, 0.99])
  const headerRotate = useTransform(progress, [0, 1], [-0.5, 0.5])
  const badgeY = useTransform(progress, [0, 1], ['-1%', '1%'])
  const titleScale = useTransform(progress, [0, 0.3, 0.7, 1], [0.96, 1.04, 1.01, 0.97])
  const titleY = useTransform(progress, [0, 1], ['-2%', '2%'])
  const descriptionY = useTransform(progress, [0, 0.5, 1], ['2%', '0%', '-2%'])
  const descriptionScale = useTransform(progress, [0, 1], [0.99, 1.01])
  const descriptionOpacity = useTransform(progress, [0, 0.2, 0.8, 1], [0.7, 1, 1, 0.9])
  
  // Dashboard transforms
  const dashboardY = useTransform(progress, [0, 0.5, 1], ['-2%', '0%', '2%'])
  const dashboardScale = useTransform(progress, [0, 0.3, 0.7, 1], [0.98, 1.02, 1.01, 0.99])
  const dashboardRotate = useTransform(progress, [0, 1], [-0.3, 0.3])
  
  // Overlay transforms
  const overlayY = useTransform(progress, [0, 0.5, 1], ['-4%', '0%', '4%'])
  const overlayScale = useTransform(progress, [0, 1], [0.98, 1.02])
  const overlayRotate = useTransform(progress, [0, 1], [-0.2, 0.2])

  // Memoized solution modules for maximum performance
  const solutionModules: SolutionModule[] = useMemo(() => [
    {
      id: 'SOLUTION_001',
      name: 'THE EDGE CASE ELIMINATOR',
      solves: 'Handles the 1% of cases that break all other systems',
      method: 'Specialized AI trained on 10,847 documented edge cases with human expert backup',
      evidence: 'Zero edge case failures in the last 12 months across 150M+ verifications',
      impact: 'Eliminated the blind spots that allow fraud to flourish',
      icon: <FiTarget className="w-8 h-8" />,
      color: 'text-green-400',
      deploymentStatus: 'enhanced'
    },
    {
      id: 'SOLUTION_002',
      name: 'THE DEEPFAKE DETECTOR',
      solves: 'Defeats AI-generated documents that fool traditional OCR',
      method: 'Multi-layer computer vision analyzing 247 security features per document',
      evidence: 'Caught 100% of deepfake attempts in Singapore banking breach simulation',
      impact: 'Singapore-style breaches become impossible',
      icon: <FiEye className="w-8 h-8" />,
      color: 'text-blue-400',
      deploymentStatus: 'operational'
    },
    {
      id: 'SOLUTION_003',
      name: 'THE REGIONAL SPECIALIST',
      solves: 'Eliminates false positives from document variations across 240+ countries',
      method: 'Local expertise combined with machine learning for every global market',
      evidence: '40% improvement in emerging market conversion rates',
      impact: 'Global reach without sacrificing accuracy',
      icon: <FiGlobe className="w-8 h-8" />,
      color: 'text-purple-400',
      deploymentStatus: 'operational'
    },
    {
      id: 'SOLUTION_004',
      name: 'THE HUMAN EXPERT NETWORK',
      solves: 'Provides final verification for edge cases too complex for automation',
      method: '24/7 expert review network with 15-second response time',
      evidence: '100% customer satisfaction on complex case resolution',
      impact: 'No legitimate customer ever gets blocked',
      icon: <FiUsers className="w-8 h-8" />,
      color: 'text-orange-400',
      deploymentStatus: 'enhanced'
    },
    {
      id: 'SOLUTION_005',
      name: 'THE THREAT INTELLIGENCE ENGINE',
      solves: 'Proactively identifies and counters emerging fraud patterns',
      method: 'Real-time analysis of global fraud attempts with predictive modeling',
      evidence: 'Detected 15 new attack vectors before industry-wide breaches',
      impact: 'Always one step ahead of fraudsters',
      icon: <FiUnlock className="w-8 h-8" />,
      color: 'text-yellow-400',
      deploymentStatus: 'enhanced'
    },
    {
      id: 'SOLUTION_006',
      name: 'THE QUANTUM PROCESSOR',
      solves: 'Eliminates speed vs accuracy trade-offs',
      method: 'Sub-second verification with quantum-accelerated processing',
      evidence: '99.9% uptime while maintaining 99.8% accuracy on edge cases',
      impact: 'No more choosing between speed and security',
      icon: <FiCpu className="w-8 h-8" />,
      color: 'text-cyan-400',
      deploymentStatus: 'operational'
    }
  ], [])

  // Memoized deployment stats for maximum performance
  const deploymentStats: DeploymentStats = useMemo(() => ({
    problems_solved: 6,
    fraud_prevented: '$47.2M',
    uptime: '99.97%',
    accuracy: '99.8%'
  }), [])

  // Ultra-optimized deployment phases based on scroll position
  useEffect(() => {
    const unsubscribe = progress.onChange((latest) => {
      if (latest >= 0.4) {
        setDeploymentPhase('revealed')
      } else if (latest >= 0.2) {
        setDeploymentPhase('unlocking')
      } else {
        setDeploymentPhase('locked')
      }
    })
    return unsubscribe
  }, [progress])

  // Ultra-optimized active solution control based on scroll position
  useEffect(() => {
      const unsubscribe = progress.onChange((latest) => {
      if (deploymentPhase === 'revealed' && latest >= 0.4) {
          const progressInRevealed = (latest - 0.4) / (0.8 - 0.4)
          const newIndex = Math.floor(progressInRevealed * solutionModules.length)
          setActiveSolution(Math.min(newIndex, solutionModules.length - 1))
        }
      })
      return unsubscribe
  }, [deploymentPhase, progress, solutionModules.length])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'enhanced': return 'text-green-400 bg-green-400/20'
      case 'operational': return 'text-blue-400 bg-blue-400/20'
      case 'classified': return 'text-yellow-400 bg-yellow-400/20'
      default: return 'text-gray-400 bg-gray-400/20'
    }
  }

  // Navigation handlers
  const handlePrevious = useCallback(() => {
    setActiveSolution(prev => prev === 0 ? solutionModules.length - 1 : prev - 1)
  }, [solutionModules.length])

  const handleNext = useCallback(() => {
    setActiveSolution(prev => (prev + 1) % solutionModules.length)
  }, [solutionModules.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (deploymentPhase === 'revealed') {
        if (event.key === 'ArrowLeft') {
          handlePrevious()
        } else if (event.key === 'ArrowRight') {
          handleNext()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [deploymentPhase, handlePrevious, handleNext])

  // Ultra-smooth parallax layers with refined motion
  const parallaxLayers = useMemo(() => [
    {
      children: (
        <motion.div 
          className="absolute inset-0"
          style={{
          backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(14, 165, 233, 0.18) 0%, transparent 55%),
              radial-gradient(circle at 80% 80%, rgba(34, 197, 94, 0.18) 0%, transparent 55%)
            `,
            scale: momentumScale,
            filter: 'blur(0.2px)'
          }}
        />
      ),
      speed: -0.3, // Ultra-smooth background movement
      opacity: 0.35,
      blur: 0.2
    },
    {
      children: (
        <motion.div 
          className="absolute inset-0"
          style={{
            scale: gridScale,
            backgroundImage: `
              linear-gradient(rgba(14, 165, 233, 0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(14, 165, 233, 0.06) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px, 80px 80px'
          }}
        />
      ),
      speed: 0.15, // Ultra-smooth grid movement
      opacity: 0.45
    },
    {
      children: (
        <motion.div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.1) 0%, transparent 65%)`,
            scale: deploymentGlow,
            rotateZ: momentumRotate,
            filter: 'blur(0.1px)'
          }}
        />
      ),
      speed: 0.08, // Ultra-smooth glow movement
      opacity: 0.3
    },
    {
      children: (
        <motion.div 
          className="absolute inset-0"
          style={{
            background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(34, 197, 94, 0.04) 90deg, transparent 180deg, rgba(14, 165, 233, 0.04) 270deg, transparent 360deg)`,
            scale: momentumScale,
            rotateZ: momentumRotate
          }}
        />
      ),
      speed: 0.05,
      opacity: 0.25
    },
    {
      children: (
        <motion.div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 30% 70%, rgba(14, 165, 233, 0.05) 0%, transparent 50%)`,
            scale: layerScale,
            rotateZ: layerRotate
          }}
        />
      ),
      speed: 0.02,
      opacity: 0.2
    }
  ], [gridScale, deploymentGlow, momentumScale, momentumRotate, layerScale, layerRotate])

  return (
    <ParallaxContainer
      layers={parallaxLayers}
      className="py-24 bg-gradient-to-b from-black via-shufti-950/15 to-black min-h-screen"
    >
      <section ref={sectionRef} className="relative">
        {/* Ultra-Smooth Unlocking Animation Overlay with Refined Parallax */}
        <motion.div
          className="absolute inset-0 pointer-events-none gpu-optimized"
          style={{ 
            y: overlayY,
            scale: overlayScale,
            rotateZ: overlayRotate
          }}
          animate={{
            background: deploymentPhase === 'unlocking' ? [
              'linear-gradient(90deg, transparent 0%, rgba(14, 165, 233, 0.15) 50%, transparent 100%)',
              'linear-gradient(90deg, transparent 100%, rgba(14, 165, 233, 0.15) 150%, transparent 200%)'
            ] : 'linear-gradient(90deg, transparent 0%, transparent 100%)'
          }}
          transition={{ duration: 3, repeat: deploymentPhase === 'unlocking' ? Infinity : 0, ease: "easeInOut" }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Ultra-Smooth Solution Header with Refined Parallax */}
          <motion.div 
            className="text-center mb-16"
            style={{ 
              y: headerY,
              scale: headerScale,
              rotateZ: headerRotate
            }}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center gap-3 bg-green-600/20 border border-green-600/50 text-green-400 px-6 py-3 rounded-full text-sm font-mono mb-6"
              style={{ 
                y: badgeY,
                scale: momentumScale
              }}
              animate={{ 
                boxShadow: [
                  '0 0 20px rgba(34, 197, 94, 0.3)',
                  '0 0 40px rgba(34, 197, 94, 0.6)',
                  '0 0 20px rgba(34, 197, 94, 0.3)'
                ]
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <FiUnlock className="w-4 h-4" />
              SOLUTIONS DECLASSIFIED
              <FiUnlock className="w-4 h-4" />
            </motion.div>
            
            <motion.h2 
              className="text-5xl md:text-7xl font-black text-white mb-6 font-mono smooth-text"
              style={{ 
                scale: titleScale,
                y: titleY,
                rotateZ: momentumRotate
              }}
            >
              THE<span className="text-shufti-400">SOLUTION</span>
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
              style={{ 
                y: descriptionY,
                scale: descriptionScale,
                opacity: descriptionOpacity
              }}
            >
              Now that the problems are exposed, here's how Shufti Pro's technology
              <span className="text-shufti-400 font-semibold"> actually solves each critical failure.</span>
            </motion.p>
          </motion.div>

          {/* Ultra-Smooth Deployment Status Dashboard with Refined Parallax */}
          <motion.div
            className="mb-16"
            style={{ 
              y: dashboardY,
              scale: dashboardScale,
              rotateZ: dashboardRotate
            }}
          >
            <motion.div
              className="bg-gray-900 border border-shufti-500/30 rounded-2xl p-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  {deploymentPhase === 'locked' && <FiLock className="w-8 h-8 text-yellow-400" />}
                  {deploymentPhase === 'unlocking' && (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                      <FiRotateCcw className="w-8 h-8 text-shufti-400" />
                    </motion.div>
                  )}
                  {deploymentPhase === 'revealed' && <FiPower className="w-8 h-8 text-green-400" />}
                  
                  <h3 className="text-2xl font-bold text-white font-mono">
                    {deploymentPhase === 'locked' && 'SOLUTIONS CLASSIFIED'}
                    {deploymentPhase === 'unlocking' && 'DECLASSIFYING SOLUTIONS'}
                    {deploymentPhase === 'revealed' && 'SOLUTIONS DEPLOYED'}
                  </h3>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-gray-400 font-mono mb-1">DEPLOYMENT STATUS</div>
                  <div className={`text-lg font-bold font-mono ${
                    deploymentPhase === 'locked' ? 'text-yellow-400' :
                    deploymentPhase === 'unlocking' ? 'text-shufti-400' :
                    'text-green-400'
                  }`}>
                    {deploymentPhase === 'locked' && 'STANDBY'}
                    {deploymentPhase === 'unlocking' && 'INITIALIZING'}
                    {deploymentPhase === 'revealed' && 'ACTIVE'}
                  </div>
                </div>
              </div>

              {/* Enhanced Solution Grid */}
              <AnimatePresence mode="wait">
                {deploymentPhase === 'locked' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12"
                  >
                    <FiLock className="w-24 h-24 text-yellow-400 mx-auto mb-6 opacity-50" />
                    <h4 className="text-2xl font-bold text-yellow-400 mb-4 font-mono">
                      CLASSIFIED TECHNOLOGY
                    </h4>
                    <p className="text-gray-400">
                      Advanced solutions require proper clearance level...
                    </p>
                  </motion.div>
                )}

                {deploymentPhase === 'unlocking' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      animate={{ 
                        boxShadow: [
                          '0 0 40px rgba(14, 165, 233, 0.5)',
                          '0 0 80px rgba(14, 165, 233, 0.8)',
                          '0 0 40px rgba(14, 165, 233, 0.5)'
                        ]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="inline-block p-6 rounded-full"
                    >
                      <FiUnlock className="w-24 h-24 text-shufti-400" />
                    </motion.div>
                    <h4 className="text-2xl font-bold text-shufti-400 mb-4 font-mono">
                      DECLASSIFYING SOLUTIONS
                    </h4>
                    <p className="text-xl text-gray-300">
                      Preparing deployment of advanced verification technology...
                    </p>
                  </motion.div>
                )}

                {deploymentPhase === 'revealed' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-8"
                  >
                    {/* Enhanced Active Solution Display with Premium Navigation */}
                    <div className="relative group">
                      {/* Enhanced Navigation Arrows with Better UX */}
                      <motion.button
                        onClick={handlePrevious}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-gradient-to-r from-shufti-500/30 to-shufti-600/30 border-2 border-shufti-400/60 rounded-full flex items-center justify-center text-shufti-300 hover:text-white hover:border-shufti-400 transition-all duration-500 backdrop-blur-md shadow-lg hover:shadow-2xl group-hover:left-4"
                        whileHover={{ 
                          scale: 1.15, 
                          boxShadow: '0 0 30px rgba(14, 165, 233, 0.6), 0 0 60px rgba(14, 165, 233, 0.3)',
                          x: -5
                        }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, x: -30, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.6, ease: EASING.outExpo }}
                      >
                        <motion.div
                          animate={{ x: [-2, 2, -2] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <FiChevronLeft className="w-7 h-7" />
                        </motion.div>
                    <motion.div
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-shufti-400/20 to-transparent"
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                      </motion.button>

                      <motion.button
                        onClick={handleNext}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-gradient-to-l from-shufti-500/30 to-shufti-600/30 border-2 border-shufti-400/60 rounded-full flex items-center justify-center text-shufti-300 hover:text-white hover:border-shufti-400 transition-all duration-500 backdrop-blur-md shadow-lg hover:shadow-2xl group-hover:right-4"
                        whileHover={{ 
                          scale: 1.15, 
                          boxShadow: '0 0 30px rgba(14, 165, 233, 0.6), 0 0 60px rgba(14, 165, 233, 0.3)',
                          x: 5
                        }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, x: 30, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.6, ease: EASING.outExpo }}
                      >
                        <motion.div
                          animate={{ x: [2, -2, 2] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <FiChevronRight className="w-7 h-7" />
                        </motion.div>
                        <motion.div
                          className="absolute inset-0 rounded-full bg-gradient-to-l from-shufti-400/20 to-transparent"
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                      </motion.button>

                      {/* Slide Counter Indicator */}
                      <motion.div
                        className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md border border-shufti-400/30 rounded-full px-4 py-2 text-xs font-mono text-shufti-300"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        {activeSolution + 1} / {solutionModules.length}
                      </motion.div>

                      {/* Enhanced Content Container */}
                      <motion.div
                        className="bg-gradient-to-br from-shufti-500/15 via-shufti-500/10 to-shufti-600/15 border-2 border-shufti-400/40 rounded-2xl p-8 mx-20 shadow-2xl backdrop-blur-sm relative overflow-hidden"
                        layout
                        transition={{ duration: 0.4, ease: EASING.outExpo }}
                        whileHover={{ 
                          borderColor: 'rgba(14, 165, 233, 0.6)',
                          boxShadow: '0 0 40px rgba(14, 165, 233, 0.2)'
                        }}
                      >
                        {/* Animated Background Pattern */}
                        <motion.div
                          className="absolute inset-0 opacity-20"
                          style={{
                            backgroundImage: `
                              radial-gradient(circle at 20% 20%, rgba(14, 165, 233, 0.3) 0%, transparent 50%),
                              radial-gradient(circle at 80% 80%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)
                            `
                          }}
                          animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, 0]
                          }}
                          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeSolution}
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -30, scale: 0.95 }}
                            transition={{ duration: 0.6, ease: EASING.outExpo }}
                            className="gpu-optimized relative z-10"
                          >
                            {/* Enhanced Header with Icon Animation */}
                            <div className="flex items-start justify-between mb-8">
                              <div className="flex items-center gap-6">
                                <motion.div 
                                  className={`${solutionModules[activeSolution].color} p-3 bg-gradient-to-br from-shufti-500/20 to-shufti-600/20 rounded-xl border border-shufti-400/30`}
                                  animate={{ 
                                    rotate: [0, 5, -5, 0],
                                    scale: [1, 1.05, 1]
                                  }}
                                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                >
                                {solutionModules[activeSolution].icon}
                                </motion.div>
                              <div>
                                  <motion.h4 
                                    className="text-2xl font-bold text-white font-mono mb-2"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                  >
                                  {solutionModules[activeSolution].name}
                                  </motion.h4>
                                  <motion.div 
                                    className="flex items-center gap-2"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                  >
                                    <span className={`text-xs px-3 py-1 rounded-full font-mono border ${getStatusColor(solutionModules[activeSolution].deploymentStatus)}`}>
                                    {solutionModules[activeSolution].deploymentStatus.toUpperCase()}
                                  </span>
                                    <motion.div
                                      className="w-2 h-2 bg-green-400 rounded-full"
                                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                                      transition={{ duration: 2, repeat: Infinity }}
                                    />
                                  </motion.div>
                              </div>
                            </div>
                          </div>

                            {/* Enhanced Content Grid with Staggered Animations */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <motion.div 
                                className="space-y-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                              >
                                <motion.div
                                  className="bg-gradient-to-r from-shufti-500/10 to-transparent p-4 rounded-lg border border-shufti-400/20"
                                  whileHover={{ 
                                    borderColor: 'rgba(14, 165, 233, 0.4)',
                                    backgroundColor: 'rgba(14, 165, 233, 0.15)'
                                  }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <h5 className="text-sm font-bold text-shufti-400 mb-3 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-shufti-400 rounded-full" />
                                    SOLVES
                                  </h5>
                                  <p className="text-gray-300 text-sm leading-relaxed">{solutionModules[activeSolution].solves}</p>
                                </motion.div>
                                <motion.div
                                  className="bg-gradient-to-r from-shufti-500/10 to-transparent p-4 rounded-lg border border-shufti-400/20"
                                  whileHover={{ 
                                    borderColor: 'rgba(14, 165, 233, 0.4)',
                                    backgroundColor: 'rgba(14, 165, 233, 0.15)'
                                  }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <h5 className="text-sm font-bold text-shufti-400 mb-3 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-shufti-400 rounded-full" />
                                    METHOD
                                  </h5>
                                  <p className="text-gray-300 text-sm leading-relaxed">{solutionModules[activeSolution].method}</p>
                                </motion.div>
                              </motion.div>
                              <motion.div 
                                className="space-y-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                              >
                                <motion.div
                                  className="bg-gradient-to-r from-green-500/10 to-transparent p-4 rounded-lg border border-green-400/20"
                                  whileHover={{ 
                                    borderColor: 'rgba(34, 197, 94, 0.4)',
                                    backgroundColor: 'rgba(34, 197, 94, 0.15)'
                                  }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <h5 className="text-sm font-bold text-green-400 mb-3 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                                    EVIDENCE
                                  </h5>
                                  <p className="text-gray-300 text-sm leading-relaxed">{solutionModules[activeSolution].evidence}</p>
                                </motion.div>
                                <motion.div
                                  className="bg-gradient-to-r from-green-500/10 to-transparent p-4 rounded-lg border border-green-400/20"
                                  whileHover={{ 
                                    borderColor: 'rgba(34, 197, 94, 0.4)',
                                    backgroundColor: 'rgba(34, 197, 94, 0.15)'
                                  }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <h5 className="text-sm font-bold text-green-400 mb-3 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                                    IMPACT
                                  </h5>
                                  <p className="text-gray-300 text-sm leading-relaxed">{solutionModules[activeSolution].impact}</p>
                                </motion.div>
                              </motion.div>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </motion.div>
                    </div>

                    {/* Enhanced Solution Navigation with Progress */}
                    <div className="flex flex-col items-center gap-4">
                      {/* Progress Bar */}
                      <motion.div 
                        className="w-full max-w-md h-1 bg-gray-800 rounded-full overflow-hidden"
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                      >
                        <motion.div
                          className="h-full bg-gradient-to-r from-shufti-400 to-green-400 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${((activeSolution + 1) / solutionModules.length) * 100}%` }}
                          transition={{ duration: 0.6, ease: EASING.outExpo }}
                        />
                    </motion.div>

                      {/* Enhanced Dot Navigation */}
                      <div className="flex justify-center gap-4">
                        {solutionModules.map((solution, index) => (
                        <motion.button
                          key={index}
                          onClick={() => setActiveSolution(index)}
                            className={`relative group transition-all duration-500 ${
                            index === activeSolution 
                                ? 'scale-125' 
                                : 'scale-100 hover:scale-110'
                          }`}
                            whileHover={{ scale: 1.3 }}
                          whileTap={{ scale: 0.9 }}
                          >
                            {/* Dot Background */}
                            <div className={`w-4 h-4 rounded-full transition-all duration-500 ${
                              index === activeSolution 
                                ? 'bg-gradient-to-r from-shufti-400 to-green-400 shadow-lg shadow-shufti-400/50' 
                                : 'bg-gray-600 hover:bg-gray-500'
                            }`} />
                            
                            {/* Active State Ring */}
                            {index === activeSolution && (
                              <motion.div
                                className="absolute inset-0 w-4 h-4 rounded-full border-2 border-shufti-400"
                                animate={{ 
                                  scale: [1, 1.5, 1],
                                  opacity: [1, 0, 1]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                            )}
                            
                            {/* Tooltip */}
                            <motion.div
                              className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md border border-shufti-400/30 rounded-lg px-3 py-2 text-xs font-mono text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                              initial={{ y: 10 }}
                              whileHover={{ y: 0 }}
                            >
                              {solution.name}
                              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80" />
                            </motion.div>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Deployment Statistics */}
                    <motion.div
                      className="grid grid-cols-2 md:grid-cols-4 gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      {[
                        { label: 'Problems Solved', value: deploymentStats.problems_solved.toString(), color: 'text-green-400' },
                        { label: 'Fraud Prevented', value: deploymentStats.fraud_prevented, color: 'text-shufti-400' },
                        { label: 'System Uptime', value: deploymentStats.uptime, color: 'text-blue-400' },
                        { label: 'Edge Case Accuracy', value: deploymentStats.accuracy, color: 'text-yellow-400' }
                      ].map((stat, index) => (
                        <div key={index} className="text-center p-4 bg-gray-800/50 rounded-lg">
                          <div className={`text-2xl font-bold font-mono ${stat.color}`}>
                            {stat.value}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Solution Deployment CTA */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-shufti-500/20 to-green-500/20 border border-shufti-500/30 rounded-2xl p-8 max-w-4xl mx-auto">
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {/* Official Shufti Pro Logo */}
                <motion.div
                  className="mb-6"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <img 
                    src="/sp-white-Logo.webp" 
                    alt="Shufti Pro" 
                    className="h-12 mx-auto mb-4"
                  />
                </motion.div>

                <FiPower className="w-12 h-12 text-shufti-400 mx-auto mb-4" />
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 font-mono smooth-text">
                  DEPLOY THE <span className="text-shufti-400">SOLUTION</span>
                </h3>
                <p className="text-xl text-gray-300 mb-8">
                  The investigation is complete. The problems are exposed. The solutions are proven.
                  <br />
                  <span className="text-shufti-400 font-semibold">It's time to deploy the technology that handles the critical 1%.</span>
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    className="bg-shufti-500 hover:bg-shufti-600 text-white font-bold py-4 px-8 rounded-lg font-mono uppercase tracking-wide gpu-optimized"
                    whileHover={{ 
                      scale: 1.05, 
                      boxShadow: '0 0 30px rgba(14, 165, 233, 0.5)',
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open('https://shuftipro.com/get-started', '_blank')}
                  >
                    DEPLOY SHUFTI PRO
                  </motion.button>
                  <motion.button
                    className="border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-black font-bold py-4 px-8 rounded-lg font-mono uppercase tracking-wide gpu-optimized"
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open('https://shuftipro.com/api-documentation', '_blank')}
                  >
                    TECHNICAL SPECIFICATIONS
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </ParallaxContainer>
  )
}

export default ShuftiDifference 