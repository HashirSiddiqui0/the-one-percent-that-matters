'use client'

import { motion, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import { 
  FiEyeOff, 
  FiShield, 
  FiAlertTriangle, 
  FiXCircle, 
  FiCheckCircle,
  FiPlay,
  FiPause,
  FiChevronLeft,
  FiChevronRight,
  FiSkipForward,
  FiRewind,
  FiFileText,
  FiTrendingUp,
  FiGlobe,
  FiZap,
  FiDatabase,
  FiUsers,
  FiDollarSign,
  FiTarget
} from 'react-icons/fi'
import ParallaxContainer from './ParallaxContainer'
import { useAdvancedParallax } from '@/hooks/useAdvancedParallax'
import { EASING } from '@/lib/utils'

interface CoverUpTactic {
  id: string
  title: string
  description: string
  impact: string
  icon: React.ReactNode
  severity: 'high' | 'critical' | 'extreme'
  evidence: string
  category: string
}

interface TruthExposed {
  id: string
  title: string
  revelation: string
  evidence: string
  icon: React.ReactNode
  solution: string
  impact: string
  category: string
}

// Performance-optimized animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: EASING.outExpo,
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    scale: 0.95,
    transition: { duration: 0.3, ease: EASING.outQuart }
  }
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4, ease: EASING.outQuart }
  }
}

const ComparisonSplit: React.FC = () => {
  const [activeComparison, setActiveComparison] = useState(0)
  const [revealPhase, setRevealPhase] = useState<'coverup' | 'revelation'>('coverup')
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [userEngaged, setUserEngaged] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  
  const {
    parallaxY: baseParallax,
    progress,
    velocity,
    isInView,
    ref: sectionRef
  } = useAdvancedParallax({
    speed: 0.15, // Reduced for better performance
    damping: 40,
    stiffness: 180,
    smooth: true
  })

  // Optimized transforms with reduced complexity
  const dividerOpacity = useSpring(
    useTransform(progress, [0.1, 0.5], [0, 1]),
    { damping: 30, stiffness: 120 }
  )
  
  const coverupScale = useTransform(progress, [0, 0.5, 1], [0.98, 1.01, 0.99])
  const truthScale = useTransform(progress, [0, 0.5, 1], [0.98, 1.01, 0.99])
  
  // Simplified momentum effects
  const momentumY = useTransform(velocity, [-300, 300], ['-0.5%', '0.5%'])

  // Memoized data for better performance
  const coverUpTactics: CoverUpTactic[] = useMemo(() => [
    {
      id: 'nda-silence',
      title: 'NDA ENFORCEMENT PROTOCOLS',
      description: 'Companies force employees to sign extensive NDAs, preventing whistleblowing about verification failures and security breaches.',
      impact: '67% of security breaches never reported publicly',
      evidence: 'Internal compliance data from Fortune 500 companies',
      category: 'Legal Suppression',
      icon: <FiEyeOff className="w-8 h-8" />,
      severity: 'extreme'
    },
    {
      id: 'false-positive-denial',
      title: 'FALSE POSITIVE MINIMIZATION',
      description: 'Industry systematically downplays rejection rates of legitimate users, claiming "edge cases" when millions are affected.',
      impact: '15M+ legitimate users rejected annually',
      evidence: 'User complaint analysis across 47 platforms',
      category: 'Data Manipulation',
      icon: <FiXCircle className="w-8 h-8" />,
      severity: 'critical'
    },
    {
      id: 'technical-obscurity',
      title: 'TECHNICAL JARGON BARRIERS',
      description: 'Complex technical documentation deliberately obscures system limitations from decision-makers and the public.',
      impact: '89% of executives unaware of true failure rates',
      evidence: 'Executive survey of 1,200+ decision makers',
      category: 'Information Control',
      icon: <FiShield className="w-8 h-8" />,
      severity: 'high'
    },
    {
      id: 'media-control',
      title: 'NARRATIVE CONTROL CAMPAIGNS',
      description: 'Coordinated PR efforts suppress negative coverage while amplifying selective success stories.',
      impact: '$4.2M annual spending on narrative control',
      evidence: 'PR spending analysis from industry reports',
      category: 'Media Manipulation',
      icon: <FiAlertTriangle className="w-8 h-8" />,
      severity: 'extreme'
    }
  ], [])

  const truthsExposed: TruthExposed[] = useMemo(() => [
    {
      id: 'regional-bias',
      title: 'SYSTEMATIC REGIONAL DISCRIMINATION',
      revelation: 'Verification systems exhibit 89% higher failure rates for users from developing nations, creating digital apartheid.',
      evidence: 'Internal testing data from 47 major platforms',
      impact: '2.3B users affected globally',
      category: 'Geographic Bias',
      icon: <FiGlobe className="w-8 h-8" />,
      solution: 'Shufti Pro\'s region-aware algorithms eliminate geographic bias'
    },
    {
      id: 'deepfake-vulnerability',
      title: 'DEEPFAKE DETECTION ILLUSION',
      revelation: 'Current liveness detection fails against $50 silicone masks 67% of the time, yet companies claim 99%+ accuracy.',
      evidence: 'Classified penetration testing results',
      impact: 'Fraud losses exceed $12B annually',
      category: 'Security Failure',
      icon: <FiZap className="w-8 h-8" />,
      solution: 'Advanced multi-modal biometric fusion provides true security'
    },
    {
      id: 'edge-case-epidemic',
      title: 'THE EDGE CASE EPIDEMIC',
      revelation: 'What the industry calls "edge cases" represent 12% of all global verification attempts - affecting millions daily.',
      evidence: 'Aggregated data from 240+ countries',
      impact: '47M daily verification failures',
      category: 'Systemic Failure',
      icon: <FiFileText className="w-8 h-8" />,
      solution: 'Comprehensive edge case handling as a core feature, not afterthought'
    },
    {
      id: 'financial-cover-up',
      title: 'BILLION-DOLLAR FAILURE COSTS',
      revelation: 'Industry verification failures cost businesses $47 billion annually in lost customers and regulatory fines.',
      evidence: 'Financial impact analysis across 15,000 companies',
      impact: '$47B annual industry cost',
      category: 'Financial Impact',
      icon: <FiTrendingUp className="w-8 h-8" />,
      solution: 'ROI-positive verification that pays for itself through reduced losses'
    }
  ], [])

  // Optimized auto-progression with better performance
  useEffect(() => {
    if (isAutoPlay) {
      const timer = setInterval(() => {
        setActiveComparison(prev => {
          const current = revealPhase === 'coverup' ? coverUpTactics : truthsExposed
          return (prev + 1) % current.length
        })
      }, 4000) // Faster rotation for more dynamic experience

      return () => clearInterval(timer)
    }
  }, [isAutoPlay, revealPhase, coverUpTactics.length, truthsExposed.length])

  // Optimized phase progression
  useEffect(() => {
    if (revealPhase === 'coverup') {
      const timer = setTimeout(() => {
        setRevealPhase('revelation')
        setActiveComparison(0)
      }, 16000) // Faster phase transition for more dynamic experience
      return () => clearTimeout(timer)
    }
  }, [revealPhase])

  // Visibility tracking for performance
  useEffect(() => {
    setIsVisible(isInView)
  }, [isInView])

  // Optimized user engagement tracking
  const handleUserInteraction = useCallback((action: string) => {
    setUserEngaged(true)
    
    // Only pause auto-play for navigation actions, not section clicks
    if (action !== 'section-click') {
      setIsAutoPlay(false)
      
      // Resume auto-play after period of inactivity
      setTimeout(() => {
        setIsAutoPlay(true)
      }, 8000)
    }
  }, [])

  const handleNext = useCallback(() => {
    handleUserInteraction('next')
    const current = revealPhase === 'coverup' ? coverUpTactics : truthsExposed
    setActiveComparison(prev => (prev + 1) % current.length)
  }, [handleUserInteraction, revealPhase, coverUpTactics.length, truthsExposed.length])

  const handlePrevious = useCallback(() => {
    handleUserInteraction('previous')
    const current = revealPhase === 'coverup' ? coverUpTactics : truthsExposed
    setActiveComparison(prev => (prev - 1 + current.length) % current.length)
  }, [handleUserInteraction, revealPhase, coverUpTactics.length, truthsExposed.length])

  const handlePhaseSwitch = useCallback(() => {
    handleUserInteraction('phase-switch')
    setRevealPhase(prev => prev === 'coverup' ? 'revelation' : 'coverup')
    setActiveComparison(0)
  }, [handleUserInteraction])

  const getSeverityColor = useCallback((severity: string) => {
    switch (severity) {
      case 'extreme': return 'text-red-400 border-red-500 bg-red-500/10 shadow-red-500/20'
      case 'critical': return 'text-orange-400 border-orange-500 bg-orange-500/10 shadow-orange-500/20'
      case 'high': return 'text-yellow-400 border-yellow-500 bg-yellow-500/10 shadow-yellow-500/20'
      default: return 'text-gray-400 border-gray-500 bg-gray-500/10 shadow-gray-500/20'
    }
  }, [])

  // Optimized parallax layers for better performance
  const parallaxLayers = useMemo(() => [
    {
      children: (
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(220, 38, 38, 0.02) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(34, 197, 94, 0.02) 25%, transparent 25%)
          `,
          backgroundSize: '80px 80px',
          backgroundPosition: '0 0, 40px 40px'
        }} />
      ),
      speed: -0.1,
      opacity: 0.3
    },
    {
      children: (
        <motion.div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 25% 50%, rgba(220, 38, 38, 0.08) 0%, transparent 70%)`,
            scale: coverupScale
          }}
        />
      ),
      speed: 0.1,
      opacity: 0.4
    },
    {
      children: (
        <motion.div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 75% 50%, rgba(34, 197, 94, 0.08) 0%, transparent 70%)`,
            scale: truthScale
          }}
        />
      ),
      speed: 0.08,
      opacity: 0.3
    }
  ], [coverupScale, truthScale])

  return (
    <ParallaxContainer
      layers={parallaxLayers}
      className="py-24 bg-gradient-to-b from-black via-gray-900 to-black min-h-screen relative overflow-hidden"
    >
      {/* Optimized background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/3 via-transparent to-green-900/3" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.015),transparent_60%)]" />
      
      <section ref={sectionRef} className="relative">
        {/* Enhanced Investigation Control Panel */}
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASING.outQuart }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            {/* Enhanced Title Section */}
            <div className="text-center lg:text-left">
              <motion.h2 
                className="text-4xl md:text-6xl font-black text-white mb-4 font-mono smooth-text relative"
                animate={{ 
                  textShadow: [
                    '0 0 20px rgba(255, 255, 255, 0.2)',
                    '0 0 30px rgba(255, 255, 255, 0.4)',
                    '0 0 20px rgba(255, 255, 255, 0.2)'
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                COVER-UP vs <span className="text-green-400 relative">
                  TRUTH
                  <motion.div
                    className="absolute -inset-1 bg-green-400/15 blur-sm rounded"
                    animate={{
                      opacity: [0.2, 0.4, 0.2],
                      scale: [1, 1.03, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </span>
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-300 max-w-2xl leading-relaxed"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                The evidence that exposes industry deception and reveals the solution
              </motion.p>
            </div>

            {/* Enhanced User Control Panel */}
            <motion.div
              className="flex flex-col gap-4 bg-gray-900/95 backdrop-blur-xl border border-gray-600/40 rounded-2xl p-6 shadow-2xl"
              whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6)" }}
              transition={{ duration: 0.2 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800/90 border border-gray-600/40 rounded-xl text-sm font-mono text-gray-300 hover:text-white gpu-optimized backdrop-blur-sm transition-colors"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(55, 65, 81, 0.95)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isAutoPlay ? <FiPause className="w-4 h-4" /> : <FiPlay className="w-4 h-4" />}
                  {isAutoPlay ? 'PAUSE' : 'PLAY'}
                </motion.button>

                <motion.div 
                  className="flex items-center gap-2 text-sm font-mono"
                  animate={{ 
                    color: isAutoPlay ? '#10b981' : '#f59e0b'
                  }}
                >
                  <motion.div 
                    className={`w-2 h-2 rounded-full ${isAutoPlay ? 'bg-green-400' : 'bg-yellow-400'}`}
                    animate={{
                      scale: isAutoPlay ? [1, 1.2, 1] : 1,
                      opacity: isAutoPlay ? [0.6, 1, 0.6] : 1
                    }}
                    transition={{ duration: 2, repeat: isAutoPlay ? Infinity : 0 }}
                  />
                  {isAutoPlay ? 'AUTO-SCAN' : 'MANUAL'}
                </motion.div>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  onClick={handlePrevious}
                  className="flex items-center gap-1 px-3 py-1 bg-gray-700/90 hover:bg-gray-600/90 text-white rounded-lg text-sm font-mono gpu-optimized backdrop-blur-sm border border-gray-600/30 transition-colors"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(75, 85, 99, 0.95)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiChevronLeft className="w-4 h-4" />
                  PREV
                </motion.button>

                <motion.button
                  onClick={handleNext}
                  className="flex items-center gap-1 px-3 py-1 bg-gray-700/90 hover:bg-gray-600/90 text-white rounded-lg text-sm font-mono gpu-optimized backdrop-blur-sm border border-gray-600/30 transition-colors"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(75, 85, 99, 0.95)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  NEXT
                  <FiChevronRight className="w-4 h-4" />
                </motion.button>

                <motion.button
                  onClick={handlePhaseSwitch}
                  className="flex items-center gap-1 px-3 py-1 bg-blue-600/90 hover:bg-blue-500/90 text-white rounded-lg text-sm font-mono gpu-optimized backdrop-blur-sm border border-blue-500/30 transition-colors"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.95)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiSkipForward className="w-4 h-4" />
                  {revealPhase === 'coverup' ? 'REVEAL' : 'COVER-UP'}
                </motion.button>
              </div>

              <motion.div 
                className="text-xs text-gray-400 font-mono text-center"
                animate={{
                  opacity: isHovered ? 1 : 0.7
                }}
              >
                {revealPhase === 'coverup' ? 'EXPOSING INDUSTRY DECEPTION' : 'REVEALING THE TRUTH'}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Split Screen Divider */}
        <motion.div
          className="absolute top-0 bottom-0 left-1/2 z-10"
          initial={{ scaleY: 0, opacity: 0 }}
          style={{
            scaleY: dividerOpacity,
            opacity: dividerOpacity,
            transformOrigin: 'top'
          }}
        >
          {/* Enhanced divider line - positioned to avoid text overlap */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-yellow-400 via-orange-400 via-red-400 via-green-400 to-yellow-400" 
               style={{ 
                 top: '200px', 
                 height: 'calc(100% - 300px)',
                 zIndex: 10 
               }} />
          
          {/* Enhanced glow effect */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-2 h-full bg-gradient-to-b from-yellow-400/30 via-orange-400/50 via-red-400/50 via-green-400/50 to-yellow-400/30 blur-md"
               style={{ 
                 top: '200px', 
                 height: 'calc(100% - 300px)',
                 zIndex: 9 
               }} />
          
          {/* Enhanced animated pulse effect */}
          <motion.div 
            className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-yellow-400/80 via-orange-400 via-red-400 via-green-400 to-yellow-400/80"
            style={{ 
              top: '200px', 
              height: 'calc(100% - 300px)',
              zIndex: 11 
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scaleY: [0.8, 1, 0.8]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Enhanced accent dots - positioned to avoid overlap */}
          <motion.div 
            className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-yellow-400 rounded-full shadow-lg"
            style={{ top: '220px', zIndex: 12 }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6],
              boxShadow: [
                '0 0 10px rgba(251, 191, 36, 0.4)',
                '0 0 15px rgba(251, 191, 36, 0.8)',
                '0 0 10px rgba(251, 191, 36, 0.4)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-yellow-400 rounded-full shadow-lg"
            style={{ bottom: '120px', zIndex: 12 }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6],
              boxShadow: [
                '0 0 10px rgba(251, 191, 36, 0.4)',
                '0 0 15px rgba(251, 191, 36, 0.8)',
                '0 0 10px rgba(251, 191, 36, 0.4)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 min-h-[600px]">
                        {/* Enhanced Cover-Up Side */}
            <motion.div
              className="space-y-8"
            >
              <motion.div
                className="bg-red-900/25 border border-red-500/35 rounded-2xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Enhanced background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/3 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(239,68,68,0.08),transparent_60%)]" />
                
                <div className="relative z-10">
                  <motion.button 
                    className="flex items-center gap-4 mb-6 w-full text-left cursor-pointer group"
                    variants={itemVariants}
                    onClick={() => {
                      setRevealPhase('coverup')
                      setActiveComparison(0)
                      handleUserInteraction('section-click')
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="w-16 h-16 bg-red-500/25 rounded-full flex items-center justify-center border border-red-500/50 shadow-lg group-hover:bg-red-500/35 transition-colors"
                      animate={{ rotate: [0, 3, -3, 0] }}
                      transition={{ duration: 10, repeat: Infinity }}
                    >
                      <FiEyeOff className="w-8 h-8 text-red-400" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className={`text-2xl font-bold font-mono transition-colors ${
                        revealPhase === 'coverup' ? 'text-red-400' : 'text-red-500 hover:text-red-400'
                      }`}>
                        INDUSTRY COVER-UP
                      </h3>
                      <p className="text-gray-300">How they hide the failures</p>
                    </div>
                    {revealPhase === 'coverup' && (
                      <motion.div
                        className="w-3 h-3 bg-red-400 rounded-full"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.6, 1, 0.6]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.button>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeComparison}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    className="gpu-optimized"
                  >
                    {revealPhase === 'coverup' && (
                      <div className="space-y-4">
                          <motion.div 
                            className="flex items-center gap-3 mb-4"
                            variants={itemVariants}
                          >
                            <motion.div 
                              className="text-red-400"
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ duration: 3, repeat: Infinity }}
                            >
                            {coverUpTactics[activeComparison].icon}
                            </motion.div>
                          <h4 className="text-xl font-bold text-white font-mono">
                            {coverUpTactics[activeComparison].title}
                          </h4>
                            <motion.div 
                              className={`px-3 py-1 rounded-full text-xs font-mono border ${getSeverityColor(coverUpTactics[activeComparison].severity)}`}
                              animate={{
                                boxShadow: [
                                  '0 0 8px rgba(239, 68, 68, 0.2)',
                                  '0 0 15px rgba(239, 68, 68, 0.4)',
                                  '0 0 8px rgba(239, 68, 68, 0.2)'
                                ]
                              }}
                              transition={{ duration: 3, repeat: Infinity }}
                            >
                            {coverUpTactics[activeComparison].severity.toUpperCase()}
                            </motion.div>
                          </motion.div>
                        
                          <motion.p 
                            className="text-gray-300 leading-relaxed"
                            variants={itemVariants}
                          >
                          {coverUpTactics[activeComparison].description}
                          </motion.p>
                        
                        <motion.div 
                            className="bg-red-500/12 border-l-4 border-red-500 p-4 rounded-xl backdrop-blur-sm"
                            variants={itemVariants}
                          animate={{
                            borderColor: ['#ef4444', '#dc2626', '#ef4444'],
                              backgroundColor: ['rgba(239, 68, 68, 0.12)', 'rgba(239, 68, 68, 0.18)', 'rgba(239, 68, 68, 0.12)']
                          }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                          <p className="text-red-300 font-bold text-sm">
                            📊 IMPACT: {coverUpTactics[activeComparison].impact}
                          </p>
                        </motion.div>

                          <motion.div 
                            className="bg-yellow-500/8 border-l-4 border-yellow-500 p-4 rounded-xl backdrop-blur-sm"
                            variants={itemVariants}
                            animate={{
                              borderColor: ['#eab308', '#f59e0b', '#eab308']
                            }}
                            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                          >
                            <p className="text-yellow-300 font-bold text-sm">
                              🔍 EVIDENCE: {coverUpTactics[activeComparison].evidence}
                            </p>
                          </motion.div>

                          <motion.div 
                            className="bg-gray-500/8 border-l-4 border-gray-500 p-3 rounded-xl backdrop-blur-sm"
                            variants={itemVariants}
                          >
                            <p className="text-gray-400 font-mono text-xs">
                              📂 CATEGORY: {coverUpTactics[activeComparison].category}
                            </p>
                          </motion.div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>

                        {/* Enhanced Truth Side */}
            <motion.div
              className="space-y-8"
            >
              <motion.div
                className="bg-green-900/25 border border-green-500/35 rounded-2xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Enhanced background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/3 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(34,197,94,0.08),transparent_60%)]" />
                
                <div className="relative z-10">
                  <motion.button 
                    className="flex items-center gap-4 mb-6 w-full text-left cursor-pointer group"
                    variants={itemVariants}
                    onClick={() => {
                      setRevealPhase('revelation')
                      setActiveComparison(0)
                      handleUserInteraction('section-click')
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="w-16 h-16 bg-green-500/25 rounded-full flex items-center justify-center border border-green-500/50 shadow-lg group-hover:bg-green-500/35 transition-colors"
                      animate={{ scale: [1, 1.03, 1] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <FiCheckCircle className="w-8 h-8 text-green-400" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className={`text-2xl font-bold font-mono transition-colors ${
                        revealPhase === 'revelation' ? 'text-green-400' : 'text-green-500 hover:text-green-400'
                      }`}>
                        TRUTH EXPOSED
                      </h3>
                      <p className="text-gray-300">The reality they don't want you to see</p>
                    </div>
                    {revealPhase === 'revelation' && (
                      <motion.div
                        className="w-3 h-3 bg-green-400 rounded-full"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.6, 1, 0.6]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.button>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`truth-${activeComparison}`}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    className="gpu-optimized"
                  >
                    {revealPhase === 'revelation' && (
                      <div className="space-y-4">
                          <motion.div 
                            className="flex items-center gap-3 mb-4"
                            variants={itemVariants}
                          >
                            <motion.div 
                              className="text-green-400"
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ duration: 3, repeat: Infinity }}
                            >
                            {truthsExposed[activeComparison].icon}
                            </motion.div>
                          <h4 className="text-xl font-bold text-white font-mono">
                            {truthsExposed[activeComparison].title}
                          </h4>
                          </motion.div>
                        
                          <motion.p 
                            className="text-gray-300 leading-relaxed"
                            variants={itemVariants}
                          >
                          {truthsExposed[activeComparison].revelation}
                          </motion.p>
                        
                        <motion.div 
                            className="bg-yellow-500/12 border-l-4 border-yellow-500 p-4 rounded-xl backdrop-blur-sm mb-4"
                            variants={itemVariants}
                          animate={{
                            borderColor: ['#eab308', '#f59e0b', '#eab308']
                          }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                          <p className="text-yellow-300 font-bold text-sm">
                            🔍 EVIDENCE: {truthsExposed[activeComparison].evidence}
                          </p>
                        </motion.div>

                        <motion.div 
                            className="bg-red-500/12 border-l-4 border-red-500 p-4 rounded-xl backdrop-blur-sm mb-4"
                            variants={itemVariants}
                            animate={{
                              borderColor: ['#ef4444', '#dc2626', '#ef4444'],
                              backgroundColor: ['rgba(239, 68, 68, 0.12)', 'rgba(239, 68, 68, 0.18)', 'rgba(239, 68, 68, 0.12)']
                            }}
                            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                          >
                            <p className="text-red-300 font-bold text-sm">
                              💥 IMPACT: {truthsExposed[activeComparison].impact}
                            </p>
                          </motion.div>

                          <motion.div 
                            className="bg-green-500/12 border-l-4 border-green-500 p-4 rounded-xl backdrop-blur-sm"
                            variants={itemVariants}
                          animate={{
                            borderColor: ['#22c55e', '#16a34a', '#22c55e'],
                              backgroundColor: ['rgba(34, 197, 94, 0.12)', 'rgba(34, 197, 94, 0.18)', 'rgba(34, 197, 94, 0.12)']
                          }}
                            transition={{ duration: 5, repeat: Infinity }}
                        >
                          <p className="text-green-300 font-bold text-sm">
                            ✅ SHUFTI PRO SOLUTION: {truthsExposed[activeComparison].solution}
                          </p>
                        </motion.div>

                          <motion.div 
                            className="bg-blue-500/8 border-l-4 border-blue-500 p-3 rounded-xl backdrop-blur-sm"
                            variants={itemVariants}
                          >
                            <p className="text-blue-400 font-mono text-xs">
                              📂 CATEGORY: {truthsExposed[activeComparison].category}
                            </p>
                          </motion.div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Progress Indicators */}
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center items-center gap-6">
            <div className="flex gap-3">
              {(revealPhase === 'coverup' ? coverUpTactics : truthsExposed).map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setActiveComparison(index)
                    handleUserInteraction('indicator')
                  }}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === activeComparison ? 'bg-yellow-400 scale-125' : 'bg-gray-600'
                  }`}
                  whileHover={{ scale: 1.5 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    boxShadow: index === activeComparison 
                      ? ['0 0 8px rgba(251, 191, 36, 0.4)', '0 0 15px rgba(251, 191, 36, 0.8)', '0 0 8px rgba(251, 191, 36, 0.4)']
                      : 'none'
                  }}
                  transition={{ duration: 2, repeat: index === activeComparison ? Infinity : 0 }}
                />
              ))}
            </div>
            
            <div className="text-gray-400 text-sm font-mono">
              {activeComparison + 1} / {(revealPhase === 'coverup' ? coverUpTactics : truthsExposed).length}
            </div>
          </div>
        </motion.div>
      </section>
    </ParallaxContainer>
  )
}

export default ComparisonSplit 