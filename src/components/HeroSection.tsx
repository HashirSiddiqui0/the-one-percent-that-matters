'use client'

import React, { memo, useCallback, useMemo, useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { 
  FiFileText, 
  FiEyeOff,
  FiUnlock,
  FiChevronRight,
  FiDownload,
  FiPlay,
  FiPause,
  FiSkipForward,
  FiCpu,
  FiShield,
  FiGlobe
} from 'react-icons/fi'
import { EASING, ANIMATION_VARIANTS } from '@/lib/utils'

interface ClassifiedDocument {
  id: string
  title: string
  classification: 'TOP SECRET' | 'CLASSIFIED' | 'CONFIDENTIAL'
  source: string
  date: string
  preview: string
  shocking_stat: string
  redacted_count: number
}

// Static documents data
const CLASSIFIED_DOCS: ClassifiedDocument[] = [
  {
    id: 'DOC-2024-001',
    title: 'THE SINGAPORE INCIDENT',
    classification: 'TOP SECRET',
    source: 'Internal Banking Consortium Report',
    date: 'MARCH 15, 2024',
    preview: 'Operation DEEPFAKE resulted in catastrophic security breach. AI-generated documents bypassed verification systems of three major financial institutions. 847 fraudulent accounts established before detection.',
    shocking_stat: '847 FRAUDULENT ACCOUNTS OPENED IN 72 HOURS',
    redacted_count: 23
  },
  {
    id: 'DOC-2024-002', 
    title: 'PROJECT FALSE POSITIVE',
    classification: 'CLASSIFIED',
    source: 'Fintech Alliance Internal Memo',
    date: 'FEBRUARY 28, 2024',
    preview: 'Customer abandonment rates reaching critical levels. Regional ID variations causing systematic failures across Eastern European markets. 15,000+ legitimate users rejected in Q1.',
    shocking_stat: '15,000 LEGITIMATE CUSTOMERS TURNED AWAY',
    redacted_count: 17
  },
  {
    id: 'DOC-2024-003',
    title: 'THE MASK PROTOCOL FAILURE',
    classification: 'CONFIDENTIAL',
    source: 'Gaming Industry Security Brief',
    date: 'JANUARY 12, 2024',
    preview: 'Liveness detection systems compromised by advanced silicone masks. 312 underage accounts created on age-restricted platforms. System vulnerabilities remain unpatched.',
    shocking_stat: '312 UNDERAGE ACCOUNTS BYPASSED VERIFICATION',
    redacted_count: 12
  }
]

// Optimized DocumentCard component
const DocumentCard: React.FC<{ 
  document: ClassifiedDocument; 
  isActive: boolean; 
  onClick: () => void 
}> = memo(({ document, isActive, onClick }) => {
  const [isHovered, setIsHovered] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  
  const getClassificationColor = useCallback((classification: string) => {
    switch (classification) {
      case 'TOP SECRET': return 'bg-red-600 text-white'
      case 'CLASSIFIED': return 'bg-orange-600 text-white'
      case 'CONFIDENTIAL': return 'bg-yellow-600 text-black'
      default: return 'bg-gray-600 text-white'
    }
  }, [])

  const handleHoverStart = useCallback(() => setIsHovered(true), [])
  const handleHoverEnd = useCallback(() => setIsHovered(false), [])

  // Simplified animation props
  const animationProps = useMemo(() => ({
    initial: { opacity: 0, scale: 0.95 },
    animate: { 
      opacity: isActive ? 1 : 0.3,
      scale: isHovered ? 1.01 : 1
    },
    transition: { duration: shouldReduceMotion ? 0.1 : 0.3, ease: EASING.outQuart },
    whileHover: shouldReduceMotion ? {} : { 
      boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
      transition: { duration: 0.2 }
    },
    whileTap: shouldReduceMotion ? {} : { scale: 0.98 }
  }), [isActive, isHovered, shouldReduceMotion])

  return (
    <motion.div
      className="bg-yellow-50 border border-gray-400 rounded-xl p-4 sm:p-6 font-mono text-black shadow-lg cursor-pointer"
      {...animationProps}
      onClick={onClick}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
    >
      <div className="border-b-2 border-red-600 pb-3 sm:pb-4 mb-4 sm:mb-6">
        <div className="flex justify-between items-start mb-2">
          <div className={`px-2 sm:px-3 py-1 rounded ${getClassificationColor(document.classification)} font-bold text-xs sm:text-sm`}>
            {document.classification}
          </div>
          <div className="text-red-600 text-xs sm:text-sm font-bold">
            {document.date}
          </div>
        </div>
        
        <h3 className="text-lg sm:text-xl font-black text-red-800 mb-2">
          {document.title}
        </h3>
        
        <p className="text-gray-700 text-xs">
          SOURCE: {document.source}
        </p>
      </div>

      <div className="bg-black/90 text-green-400 p-3 sm:p-4 rounded font-mono text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
        {document.preview}
      </div>
      
      <div className="bg-red-100 border-l-4 border-red-500 p-3 sm:p-4 rounded mb-3 sm:mb-4">
        <p className="text-red-800 font-bold text-xs sm:text-sm">
          🚨 {document.shocking_stat}
        </p>
      </div>
      
      <div className="flex justify-between items-center text-xs text-gray-500 font-mono">
        <span className="text-xs">REDACTED SECTIONS: {document.redacted_count}</span>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-red-500 rounded-full" />
          <span className="text-xs">CLASSIFIED</span>
        </div>
      </div>
    </motion.div>
  )
})

DocumentCard.displayName = 'DocumentCard'

// Simplified background pattern
const BACKGROUND_PATTERN = {
  backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.01) 0%, transparent 2%, rgba(255,255,255,0.01) 4%)`,
  backgroundSize: '50px 50px',
  willChange: 'transform',
  transform: 'translateZ(0)'
} as const

// GPU-accelerated styles
const GPU_ACCELERATED_STYLES = {
  transform: 'translateZ(0)',
  willChange: 'transform, opacity',
  backfaceVisibility: 'hidden'
} as const

// Main HeroSection component with optimized performance
const HeroSection: React.FC = memo(() => {
  const [investigationPhase, setInvestigationPhase] = useState<'intro' | 'briefing' | 'documents' | 'revelation'>('intro')
  const [currentDoc, setCurrentDoc] = useState(0)
  const [typedText, setTypedText] = useState('')
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  
  const shouldReduceMotion = useReducedMotion()
  const targetText = "What the verification industry doesn't want you to know..."
  
  // Optimized refs
  const typewriterRef = useRef<NodeJS.Timeout | null>(null)
  const phaseTimerRef = useRef<NodeJS.Timeout | null>(null)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Memoized values
  const memoizedTargetText = useMemo(() => targetText, [])
  const memoizedShouldReduceMotion = useMemo(() => shouldReduceMotion, [shouldReduceMotion])
  
  // Optimized cleanup
  useEffect(() => {
    return () => {
      if (typewriterRef.current) {
        clearInterval(typewriterRef.current)
        typewriterRef.current = null
      }
      if (phaseTimerRef.current) {
        clearTimeout(phaseTimerRef.current)
        phaseTimerRef.current = null
      }
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
        autoPlayRef.current = null
      }
    }
  }, [])

  // Optimized typewriter effect
  useEffect(() => {
    if (investigationPhase === 'intro') {
      let index = 0
      const speed = memoizedShouldReduceMotion ? 20 : 80
      
      typewriterRef.current = setInterval(() => {
        if (index <= memoizedTargetText.length) {
          setTypedText(memoizedTargetText.slice(0, index))
          index++
        } else {
          if (typewriterRef.current) {
            clearInterval(typewriterRef.current)
            typewriterRef.current = null
          }
          phaseTimerRef.current = setTimeout(() => {
            setInvestigationPhase('briefing')
            phaseTimerRef.current = null
          }, memoizedShouldReduceMotion ? 1500 : 5000)
        }
      }, speed)
      
      return () => {
        if (typewriterRef.current) {
          clearInterval(typewriterRef.current)
          typewriterRef.current = null
        }
        if (phaseTimerRef.current) {
          clearTimeout(phaseTimerRef.current)
          phaseTimerRef.current = null
        }
      }
    }
  }, [investigationPhase, memoizedTargetText, memoizedShouldReduceMotion])

  // Optimized phase progression
  useEffect(() => {
    if (investigationPhase === 'briefing') {
      phaseTimerRef.current = setTimeout(() => {
        setInvestigationPhase('documents')
        phaseTimerRef.current = null
      }, memoizedShouldReduceMotion ? 3000 : 12000)
      return () => {
        if (phaseTimerRef.current) {
          clearTimeout(phaseTimerRef.current)
          phaseTimerRef.current = null
        }
      }
    }
    if (investigationPhase === 'documents') {
      phaseTimerRef.current = setTimeout(() => {
        setInvestigationPhase('revelation')
        phaseTimerRef.current = null
      }, memoizedShouldReduceMotion ? 2000 : 12000)
      return () => {
        if (phaseTimerRef.current) {
          clearTimeout(phaseTimerRef.current)
          phaseTimerRef.current = null
        }
      }
    }
  }, [investigationPhase, memoizedShouldReduceMotion])

  // Optimized document auto-play
  useEffect(() => {
    if (investigationPhase === 'documents' && isAutoPlay && !memoizedShouldReduceMotion) {
      autoPlayRef.current = setInterval(() => {
        setCurrentDoc(prev => (prev + 1) % CLASSIFIED_DOCS.length)
      }, 4000)
      return () => {
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current)
          autoPlayRef.current = null
        }
      }
    }
  }, [investigationPhase, isAutoPlay, memoizedShouldReduceMotion])

  // Optimized event handlers
  const handleNextDocument = useCallback(() => {
    setCurrentDoc(prev => (prev + 1) % CLASSIFIED_DOCS.length)
    setIsAutoPlay(false)
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
      autoPlayRef.current = null
    }
  }, [])

  const handleNextPhase = useCallback(() => {
    const phases: Array<'intro' | 'briefing' | 'documents' | 'revelation'> = ['intro', 'briefing', 'documents', 'revelation']
    const currentIndex = phases.indexOf(investigationPhase)
    if (currentIndex < phases.length - 1) {
      setInvestigationPhase(phases[currentIndex + 1])
    }
    if (typewriterRef.current) {
      clearInterval(typewriterRef.current)
      typewriterRef.current = null
    }
    if (phaseTimerRef.current) {
      clearTimeout(phaseTimerRef.current)
      phaseTimerRef.current = null
    }
  }, [investigationPhase])

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlay(prev => !prev)
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
      autoPlayRef.current = null
    }
  }, [])

  const handleViewDocuments = useCallback(() => {
    // Jump directly to documents phase
    setInvestigationPhase('documents')
    // Clear any existing timers
    if (typewriterRef.current) {
      clearInterval(typewriterRef.current)
      typewriterRef.current = null
    }
    if (phaseTimerRef.current) {
      clearTimeout(phaseTimerRef.current)
      phaseTimerRef.current = null
    }
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
      autoPlayRef.current = null
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-black overflow-hidden pt-8 sm:pt-12"
      style={GPU_ACCELERATED_STYLES}
    >
      {/* Simplified background */}
      <div 
        className="absolute inset-0 opacity-5" 
        style={{ ...BACKGROUND_PATTERN, ...GPU_ACCELERATED_STYLES }}
      />

      <div 
        className={`relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 ${investigationPhase === 'revelation' ? 'min-h-screen pt-20' : 'h-screen flex items-center justify-center'}`}
        style={GPU_ACCELERATED_STYLES}
      >
        <AnimatePresence mode="wait">
          {investigationPhase === 'intro' && (
            <motion.div
              key="intro"
              variants={ANIMATION_VARIANTS.fadeIn}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="text-center"
              style={GPU_ACCELERATED_STYLES}
            >
              <motion.div
                className="mb-6 sm:mb-8"
                animate={memoizedShouldReduceMotion ? {} : { 
                  boxShadow: [
                    '0 0 20px rgba(220, 38, 38, 0.3)',
                    '0 0 40px rgba(220, 38, 38, 0.5)',
                    '0 0 20px rgba(220, 38, 38, 0.3)'
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <FiEyeOff className="w-16 h-16 sm:w-20 sm:h-20 text-red-400 mx-auto mb-4 sm:mb-6" />
              </motion.div>
              
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6 sm:mb-8 font-mono px-2"
                animate={memoizedShouldReduceMotion ? {} : { 
                  textShadow: [
                    '0 0 15px rgba(255, 255, 255, 0.4)',
                    '0 0 30px rgba(255, 255, 255, 0.6)',
                    '0 0 15px rgba(255, 255, 255, 0.4)'
                  ]
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                CLASSIFIED INVESTIGATION
              </motion.h1>
              
              <div className="text-lg sm:text-2xl md:text-3xl text-yellow-400 font-mono h-12 sm:h-16 flex items-center justify-center mb-6 sm:mb-8 px-2">
                {typedText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-yellow-400 ml-1"
                >
                  |
                </motion.span>
              </div>

              <motion.button
                className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg font-mono uppercase tracking-wide flex items-center gap-2 sm:gap-3 mx-auto text-sm sm:text-base"
                onClick={handleNextPhase}
                whileHover={memoizedShouldReduceMotion ? {} : { 
                  scale: 1.03,
                  boxShadow: '0 0 20px rgba(220, 38, 38, 0.5)',
                  transition: { duration: 0.2 }
                }}
                whileTap={memoizedShouldReduceMotion ? {} : { scale: 0.97 }}
                                  variants={ANIMATION_VARIANTS.slideUp}
                initial="initial"
                animate="animate"
                transition={{ delay: 2 }}
              >
                <FiUnlock className="w-4 h-4 sm:w-5 sm:h-5" />
                BEGIN INVESTIGATION
                <FiChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
            </motion.div>
          )}

          {investigationPhase === 'briefing' && (
            <motion.div
              key="briefing"
              variants={ANIMATION_VARIANTS.scaleIn}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: EASING.outExpo }}
              className="w-full max-w-6xl mx-auto"
              style={GPU_ACCELERATED_STYLES}
            >
              {/* Optimized Hero Box Design */}
              <motion.div
                className="relative bg-gradient-to-br from-gray-900/95 via-black/90 to-gray-900/95 border-2 border-red-600/50 rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl backdrop-blur-sm"
                animate={memoizedShouldReduceMotion ? {} : { 
                  borderColor: ['rgba(220, 38, 38, 0.5)', 'rgba(220, 38, 38, 0.7)', 'rgba(220, 38, 38, 0.5)'],
                  boxShadow: [
                    '0 0 40px rgba(220, 38, 38, 0.2)',
                    '0 0 80px rgba(220, 38, 38, 0.4)',
                    '0 0 40px rgba(220, 38, 38, 0.2)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={GPU_ACCELERATED_STYLES}
              >
                {/* Simplified Background Pattern */}
                <div 
                  className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(220,38,38,0.05),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(234,179,8,0.05),transparent_50%)] rounded-3xl" 
                  style={GPU_ACCELERATED_STYLES}
                />
                
                {/* Simplified Corner Elements */}
                <div className="absolute top-3 left-3 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" style={GPU_ACCELERATED_STYLES} />
                <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse" style={{ ...GPU_ACCELERATED_STYLES, animationDelay: '0.5s' }} />
                <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" style={{ ...GPU_ACCELERATED_STYLES, animationDelay: '1s' }} />
                <div className="absolute bottom-3 right-3 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" style={{ ...GPU_ACCELERATED_STYLES, animationDelay: '1.5s' }} />
                
                {/* Content Container */}
                <div className="relative z-10" style={GPU_ACCELERATED_STYLES}>
                  {/* Header Section */}
                  <div className="text-center mb-4 sm:mb-6">
                    <motion.div
                      className="mb-3 sm:mb-4"
                      animate={memoizedShouldReduceMotion ? {} : { 
                        rotate: [0, 3, -3, 0],
                        scale: [1, 1.02, 1]
                      }}
                      transition={{ duration: 8, repeat: Infinity }}
                      style={GPU_ACCELERATED_STYLES}
                    >
                      <div className="relative">
                        <FiFileText className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 text-yellow-400 mx-auto" />
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">!</span>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.h2 
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2 sm:mb-3 font-mono leading-tight"
                      animate={memoizedShouldReduceMotion ? {} : { 
                        textShadow: [
                          '0 0 15px rgba(255, 255, 255, 0.2)',
                          '0 0 30px rgba(255, 255, 255, 0.4)',
                          '0 0 15px rgba(255, 255, 255, 0.2)'
                        ]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                      style={GPU_ACCELERATED_STYLES}
                    >
                      THE <span className="text-red-400 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">1%</span> <span className="text-yellow-400 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">DOSSIER</span>
                    </motion.h2>
                  </div>

                  {/* Content Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-5 mb-4 sm:mb-6">
                    {/* Left Column - The Problem */}
                    <motion.div
                      className="bg-red-900/20 border border-red-500/30 rounded-xl p-3 sm:p-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1, duration: 0.3 }}
                      style={GPU_ACCELERATED_STYLES}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">99%</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-red-400">The 99% Problem</h3>
                      </div>
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                        Most verification systems handle 99% of cases perfectly. But that remaining 1% contains the most sophisticated fraud attempts, edge cases, and compliance failures that cost enterprises millions.
                      </p>
                    </motion.div>

                    {/* Center Column - The Gap */}
                    <motion.div
                      className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-3 sm:p-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      style={GPU_ACCELERATED_STYLES}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                          <span className="text-black text-sm font-bold">1%</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-yellow-400">The Critical Gap</h3>
                      </div>
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                        This 1% represents the difference between a secure system and a compromised one. It's where traditional verification fails and where advanced technology is needed.
                      </p>
                    </motion.div>

                    {/* Right Column - The Solution */}
                    <motion.div
                      className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-3 sm:p-4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                      style={GPU_ACCELERATED_STYLES}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">100%</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-blue-400">Complete Coverage</h3>
                      </div>
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                        Advanced technology closes this critical 1% gap, providing 100% coverage for even the most sophisticated verification challenges that other systems miss.
                      </p>
                    </motion.div>
                  </div>

                  {/* Description */}
                  <motion.div
                    className="text-center mb-4 sm:mb-6"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                    style={GPU_ACCELERATED_STYLES}
                  >
                    <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mb-2 px-4">
                      <span className="text-red-400 font-bold">Classified documents reveal</span> the catastrophic failures hidden by the verification industry.
                    </p>
                    <p className="text-sm sm:text-base text-gray-400 leading-relaxed px-4">
                      What you're about to see will expose the <span className="text-yellow-400 font-semibold">critical 1% gap</span> that costs enterprises millions and how <span className="text-blue-400 font-semibold">advanced solutions close it completely</span>.
                    </p>
                  </motion.div>

                  {/* Progress Indicator */}
                  <motion.div
                    className="flex justify-center mb-3"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                    style={GPU_ACCELERATED_STYLES}
                  >
                    <div className="flex items-center gap-2 bg-gray-800/50 rounded-full px-4 py-2 border border-gray-600/50">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-gray-300 text-sm font-mono">INVESTIGATION PHASE 2/4</span>
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                    </div>
                  </motion.div>

                  {/* CTA Buttons */}
                  <motion.div
                    className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.3 }}
                    style={GPU_ACCELERATED_STYLES}
                  >
                    <motion.button
                      className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-bold py-2 sm:py-3 px-5 sm:px-6 rounded-xl font-mono uppercase tracking-wide flex items-center gap-2 text-sm shadow-lg hover:shadow-xl transition-all duration-200"
                      onClick={handleNextPhase}
                      whileHover={memoizedShouldReduceMotion ? {} : { 
                        scale: 1.02,
                        boxShadow: '0 0 20px rgba(234, 179, 8, 0.5)',
                        transition: { duration: 0.15 }
                      }}
                      whileTap={memoizedShouldReduceMotion ? {} : { scale: 0.98 }}
                      style={GPU_ACCELERATED_STYLES}
                    >
                      <FiFileText className="w-4 h-4 sm:w-5 sm:h-5" />
                      ACCESS CLASSIFIED DOCUMENTS
                      <FiChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.button>
                    
                    <motion.button
                      className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold py-2 sm:py-3 px-5 sm:px-6 rounded-xl font-mono uppercase tracking-wide flex items-center gap-2 text-sm shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-red-400/30"
                      onClick={() => setInvestigationPhase('revelation')}
                      whileHover={memoizedShouldReduceMotion ? {} : { 
                        scale: 1.02,
                        boxShadow: '0 0 20px rgba(220, 38, 38, 0.5)',
                        transition: { duration: 0.15 }
                      }}
                      whileTap={memoizedShouldReduceMotion ? {} : { scale: 0.98 }}
                      style={GPU_ACCELERATED_STYLES}
                    >
                      <FiSkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
                      REVEAL THE SOLUTION
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {investigationPhase === 'documents' && (
            <motion.div
              key="documents"
              className="absolute inset-0 p-3 sm:p-6 md:p-8 pt-16 sm:pt-20"
                              variants={ANIMATION_VARIANTS.fadeIn}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="max-w-5xl mx-auto">
                <motion.div
                  className="bg-gray-900 border border-gray-600 rounded-t-lg p-3 sm:p-4 flex justify-between items-center"
                  variants={ANIMATION_VARIANTS.slideUp}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.2, ease: EASING.outQuart }}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <FiFileText className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                    <span className="text-white font-mono font-bold text-sm sm:text-lg">CLASSIFIED DOCUMENT VIEWER v3.0</span>
                  </div>
                  
                  <div className="flex items-center gap-2 sm:gap-4">
                    <motion.button
                      onClick={toggleAutoPlay}
                      className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 bg-gray-800 border border-gray-600 rounded text-xs sm:text-sm font-mono text-gray-300 hover:text-white"
                      whileHover={memoizedShouldReduceMotion ? {} : { scale: 1.02 }}
                      whileTap={memoizedShouldReduceMotion ? {} : { scale: 0.98 }}
                    >
                      {isAutoPlay ? <FiPause className="w-3 h-3 sm:w-4 sm:h-4" /> : <FiPlay className="w-3 h-3 sm:w-4 sm:h-4" />}
                      <span className="hidden sm:inline">{isAutoPlay ? 'PAUSE' : 'PLAY'}</span>
                    </motion.button>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-white border-l border-r border-gray-600 min-h-[50vh] sm:min-h-[60vh] max-h-[55vh] sm:max-h-[65vh] overflow-hidden"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, ease: EASING.outExpo }}
                >
                  <div className="p-4 sm:p-6 md:p-8 h-full overflow-y-auto">
                    <AnimatePresence mode="wait">
                      <DocumentCard
                        key={CLASSIFIED_DOCS[currentDoc].id}
                        document={CLASSIFIED_DOCS[currentDoc]}
                        isActive={true}
                        onClick={handleNextDocument}
                      />
                    </AnimatePresence>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-gray-900 border border-gray-600 rounded-b-lg p-4 flex justify-between items-center"
                  variants={ANIMATION_VARIANTS.slideUp}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.4, ease: EASING.outQuart }}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-gray-400 text-sm font-mono">
                      DOCUMENT {currentDoc + 1} OF {CLASSIFIED_DOCS.length}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <motion.button
                      onClick={handleNextDocument}
                      className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded font-mono text-sm flex items-center gap-2"
                      whileHover={memoizedShouldReduceMotion ? {} : { scale: 1.02 }}
                      whileTap={memoizedShouldReduceMotion ? {} : { scale: 0.98 }}
                    >
                      <FiChevronRight className="w-4 h-4" />
                      NEXT DOC
                    </motion.button>
                    
                    <motion.button
                      onClick={handleNextPhase}
                      className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded font-mono text-sm flex items-center gap-2"
                      whileHover={memoizedShouldReduceMotion ? {} : { scale: 1.02 }}
                      whileTap={memoizedShouldReduceMotion ? {} : { scale: 0.98 }}
                    >
                      <FiUnlock className="w-4 h-4" />
                      REVEAL SOLUTION
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {investigationPhase === 'revelation' && (
            <motion.div
              key="revelation"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8 pt-8"
            >
              {/* Professional Solution Header */}
              <motion.div
                className="text-center mb-20"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASING.outQuart }}
              >
                <motion.div
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full px-6 py-3 mb-8"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: EASING.outQuart }}
                >
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                  <span className="text-orange-400 font-mono text-sm uppercase tracking-wider">CLASSIFIED SOLUTION</span>
                </motion.div>

                <motion.h2
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-mono tracking-tight leading-tight"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: EASING.outQuart }}
                >
                  THE SOLUTION TO THE<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-orange-600">CRITICAL 1%</span>
                </motion.h2>

                <motion.p
                  className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-5xl mx-auto leading-relaxed font-light"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: EASING.outQuart }}
                >
                  Enterprise-grade AI verification system that eliminates the edge cases, regional variations, and sophisticated fraud patterns that break traditional KYC/AML solutions.
                </motion.p>

                {/* Document Access CTAs */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: EASING.outQuart }}
                >
                  <motion.button
                    onClick={handleViewDocuments}
                    className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-2 transition-all duration-300 border border-orange-500/30 shadow-lg hover:shadow-xl cursor-pointer"
                    whileHover={memoizedShouldReduceMotion ? {} : { 
                      scale: 1.05,
                      boxShadow: '0 0 25px rgba(249, 115, 22, 0.5)'
                    }}
                    whileTap={memoizedShouldReduceMotion ? {} : { scale: 0.95 }}
                  >
                    <FiFileText className="w-4 h-4" />
                    VIEW DOCUMENTS
                  </motion.button>
                  
                  <motion.a
                    href="/The%20One%20Percent%20That%20Matters%20.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-2 transition-all duration-300 border border-gray-600/30 shadow-lg hover:shadow-xl cursor-pointer"
                    whileHover={memoizedShouldReduceMotion ? {} : { 
                      scale: 1.05,
                      boxShadow: '0 0 25px rgba(75, 85, 99, 0.5)'
                    }}
                    whileTap={memoizedShouldReduceMotion ? {} : { scale: 0.95 }}
                  >
                    <FiDownload className="w-4 h-4" />
                    DOWNLOAD WHITEPAPER
                  </motion.a>
                </motion.div>
              </motion.div>

              {/* Professional Feature Boxes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                <motion.div
                  className="relative bg-gradient-to-br from-gray-900/40 to-gray-800/20 border border-gray-700/50 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-500 group overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/40 rounded-xl flex items-center justify-center group-hover:border-blue-400/60 transition-all duration-300">
                        <FiCpu className="w-7 h-7 text-blue-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white font-mono">CORE TECHNOLOGY</h3>
                    </div>
                    <ul className="space-y-4 text-gray-300">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="font-medium">Multi-modal AI verification</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="font-medium">Real-time fraud detection</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="font-medium">Global document recognition</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>

                <motion.div
                  className="relative bg-gradient-to-br from-gray-900/40 to-gray-800/20 border border-gray-700/50 rounded-2xl p-8 hover:border-green-500/50 transition-all duration-500 group overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/40 rounded-xl flex items-center justify-center group-hover:border-green-400/60 transition-all duration-300">
                        <FiShield className="w-7 h-7 text-green-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white font-mono">ENTERPRISE FEATURES</h3>
                    </div>
                    <ul className="space-y-4 text-gray-300">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="font-medium">99.9% accuracy rate</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="font-medium">Regulatory compliance</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="font-medium">Custom integration APIs</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>

                <motion.div
                  className="relative bg-gradient-to-br from-gray-900/40 to-gray-800/20 border border-gray-700/50 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-500 group overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/40 rounded-xl flex items-center justify-center group-hover:border-purple-400/60 transition-all duration-300">
                        <FiGlobe className="w-7 h-7 text-purple-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white font-mono">GLOBAL COVERAGE</h3>
                    </div>
                    <ul className="space-y-4 text-gray-300">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="font-medium">195+ countries supported</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="font-medium">Regional compliance</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="font-medium">Local language support</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </div>

              {/* Enterprise Verification Solution Section */}
              <motion.div
                className="relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 rounded-3xl p-12 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-blue-500/5 opacity-0 hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative z-10">
                  <div className="flex flex-col lg:flex-row items-center gap-10">
                    <div className="flex-shrink-0">
                      <motion.div
                        className="relative"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                      >
                        <img 
                          src="/sp-white-Logo.webp" 
                          alt="Shufti Pro" 
                          className="h-20 md:h-24"
                        />
                        <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-blue-500/20 rounded-full blur-xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                      </motion.div>
                    </div>
                    <div className="flex-1 text-center lg:text-left">
                      <motion.div
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-blue-500/20 border border-orange-500/30 rounded-full px-4 py-2 mb-6"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1.25 }}
                      >
                        <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                        <span className="text-orange-400 font-mono text-sm uppercase tracking-wider">ENTERPRISE GRADE</span>
                      </motion.div>
                      
                      <motion.h3
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-mono leading-tight"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 1.3 }}
                      >
                        ENTERPRISE VERIFICATION<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-500">SOLUTION</span>
                      </motion.h3>
                      
                      <motion.p
                        className="text-lg md:text-xl text-gray-300 leading-relaxed font-light"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 1.4 }}
                      >
                        Trusted by Fortune 500 companies and financial institutions worldwide. The only verification platform that consistently handles the critical 1% of edge cases that break all other systems.
                      </motion.p>
                      
                      <motion.div
                        className="flex flex-wrap gap-4 mt-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.5 }}
                      >
                        <div className="flex items-center gap-2 text-gray-400">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-sm font-mono">Fortune 500 Trusted</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span className="text-sm font-mono">99.9% Accuracy</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span className="text-sm font-mono">Global Coverage</span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Professional CTA Section */}
              <motion.div
                className="text-center mt-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
              >
                <motion.div
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full px-6 py-3 mb-8"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.6 }}
                >
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                  <span className="text-orange-400 font-mono text-sm uppercase tracking-wider">ENTERPRISE ACCESS</span>
                </motion.div>

                <motion.a
                  href="https://shuftipro.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 hover:from-orange-400 hover:via-red-400 hover:to-orange-500 text-white font-bold py-5 px-10 rounded-2xl font-mono uppercase tracking-wider flex items-center gap-4 mx-auto text-lg shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden group cursor-pointer w-fit"
                  whileHover={memoizedShouldReduceMotion ? {} : { 
                    scale: 1.05,
                    boxShadow: '0 0 50px rgba(249, 115, 22, 0.7)',
                    transition: { duration: 0.3 }
                  }}
                  whileTap={memoizedShouldReduceMotion ? {} : { scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <FiDownload className="w-6 h-6 relative z-10" />
                  <span className="relative z-10">GET ENTERPRISE SOLUTION</span>
                  <FiChevronRight className="w-6 h-6 relative z-10" />
                </motion.a>
                
                <motion.p
                  className="text-gray-400 mt-6 text-base font-light"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.8 }}
                >
                  Join the elite 1% of enterprises that have eliminated verification gaps
                </motion.p>

                <motion.div
                  className="flex flex-wrap justify-center gap-6 mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 2.0 }}
                >
                  <div className="flex items-center gap-2 text-gray-500">
                    <FiShield className="w-4 h-4" />
                    <span className="text-sm font-mono">SOC 2 Compliant</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <FiGlobe className="w-4 h-4" />
                    <span className="text-sm font-mono">Global Support</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <FiCpu className="w-4 h-4" />
                    <span className="text-sm font-mono">24/7 Monitoring</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
})

HeroSection.displayName = 'HeroSection'

export default HeroSection 