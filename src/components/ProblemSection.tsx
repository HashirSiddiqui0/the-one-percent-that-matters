'use client'

import { motion, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { 
  FiSearch, 
  FiFileText, 
  FiAlertTriangle, 
  FiEye,
  FiZap,
  FiTrendingDown,
  FiUsers,
  FiDollarSign,
  FiClock,
  FiPlay,
  FiPause
} from 'react-icons/fi'
import ParallaxContainer from './ParallaxContainer'
import { useAdvancedParallax } from '@/hooks/useAdvancedParallax'
import { EASING } from '@/lib/utils'

interface EvidenceFile {
  id: string
  title: string
  category: 'BREACH' | 'FAILURE' | 'COVER-UP' | 'IMPACT'
  date: string
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM'
  description: string
  stats: {
    affected: string
    loss: string
    duration: string
  }
  icon: React.ReactNode
  color: string
}

// Enhanced Evidence Card with advanced micro-interactions
const EvidenceCard: React.FC<{ 
  evidence: EvidenceFile; 
  isActive: boolean; 
  onClick: () => void;
  index: number;
}> = ({ evidence, isActive, onClick, index }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  
  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'bg-red-600 text-white border-red-400'
      case 'HIGH': return 'bg-orange-600 text-white border-orange-400'
      case 'MEDIUM': return 'bg-yellow-600 text-black border-yellow-400'
      default: return 'bg-gray-600 text-white border-gray-400'
    }
  }

  return (
    <motion.div
      className="bg-gray-900 border border-gray-600 rounded-xl p-6 cursor-pointer gpu-optimized"
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={{ 
        opacity: isActive ? 1 : 0.7,
        y: isActive ? 0 : 20,
        rotateX: 0,
        scale: isHovered ? 1.02 : (isActive ? 1 : 0.95),
        z: isActive ? 10 : 0
      }}
      transition={{ 
        duration: 0.6, 
        ease: EASING.outQuart,
        delay: index * 0.1
      }}
      onClick={() => {
        onClick()
        setIsExpanded(!isExpanded)
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        boxShadow: `0 20px 40px ${evidence.color}20, 0 0 20px ${evidence.color}40`,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      style={{
        borderColor: isActive ? evidence.color : '#4b5563',
        backgroundColor: isActive ? `${evidence.color}10` : '#111827'
      }}
    >
      {/* Enhanced Header */}
      <div className="flex items-center justify-between mb-4">
        <motion.div 
          className="flex items-center gap-3"
          animate={{
            color: isActive ? evidence.color : '#9ca3af'
          }}
        >
          <motion.div
            animate={{ 
              rotate: isActive ? 360 : 0,
              scale: isActive ? [1, 1.1, 1] : 1
            }}
            transition={{ 
              duration: isActive ? 2 : 0.3, 
              repeat: isActive ? Infinity : 0,
              ease: "linear"
            }}
          >
            {evidence.icon}
          </motion.div>
          <div>
            <h3 className="text-lg font-bold text-white">
              {evidence.title}
            </h3>
            <motion.div 
              className={`inline-block px-2 py-1 rounded text-xs font-mono ${getSeverityStyle(evidence.severity)}`}
              animate={{
                boxShadow: isActive ? [
                  `0 0 10px ${evidence.color}50`,
                  `0 0 20px ${evidence.color}80`,
                  `0 0 10px ${evidence.color}50`
                ] : 'none'
              }}
              transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
            >
              {evidence.severity}
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          className="text-gray-400 text-sm font-mono"
          animate={{
            opacity: isActive ? [1, 0.5, 1] : 0.7
          }}
          transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
        >
          {evidence.date}
        </motion.div>
      </div>

      {/* Enhanced Content */}
      <motion.div
        animate={{
          height: isExpanded ? 'auto' : '60px'
        }}
        transition={{ duration: 0.4, ease: EASING.outQuart }}
        className="overflow-hidden"
      >
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          {evidence.description}
        </p>
        
        {/* Enhanced Stats Grid */}
        <motion.div 
          className="grid grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: isExpanded ? 1 : 0 }}
          transition={{ delay: isExpanded ? 0.2 : 0 }}
        >
          {[
            { label: 'AFFECTED', value: evidence.stats.affected, icon: <FiUsers className="w-4 h-4" /> },
            { label: 'LOSS', value: evidence.stats.loss, icon: <FiDollarSign className="w-4 h-4" /> },
            { label: 'DURATION', value: evidence.stats.duration, icon: <FiClock className="w-4 h-4" /> }
          ].map((stat, idx) => (
            <motion.div 
              key={stat.label}
              className="text-center p-3 bg-black/50 rounded border border-gray-700"
              whileHover={{ 
                backgroundColor: `${evidence.color}20`,
                borderColor: evidence.color,
                transition: { duration: 0.2 }
              }}
            >
              <div className="flex items-center justify-center gap-1 text-gray-400 mb-1">
                {stat.icon}
                <span className="text-xs font-mono">{stat.label}</span>
              </div>
              <motion.div 
                className="text-white font-bold text-sm"
                animate={{
                  color: isActive ? evidence.color : '#ffffff'
                }}
              >
                {stat.value}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Enhanced Expand Indicator */}
      <motion.div 
        className="flex justify-center mt-4 pt-4 border-t border-gray-700"
        animate={{
          borderColor: isActive ? evidence.color : '#374151'
        }}
      >
        <motion.div
          animate={{ 
            rotate: isExpanded ? 180 : 0,
            color: isActive ? evidence.color : '#9ca3af'
          }}
          transition={{ duration: 0.3 }}
          className="cursor-pointer p-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

const ProblemSection: React.FC = () => {
  const sectionRef = useRef(null)
  const [investigationMode, setInvestigationMode] = useState<'scanning' | 'archive'>('scanning')
  const [activeEvidence, setActiveEvidence] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  
  const {
    parallaxY: baseParallax,
    progress,
    velocity,
    isInView
  } = useAdvancedParallax(sectionRef, {
    speed: 0.6,
    damping: 35,
    stiffness: 320,
    smooth: true
  })

  // Enhanced transforms for cinema-quality effects
  const archiveScale = useTransform(progress, [0, 0.2, 0.8, 1], [0.85, 1.1, 1.02, 0.9])
  const searchBeam = useSpring(
    useTransform(progress, [0.1, 0.5], [0, 1]),
    { damping: 25, stiffness: 200 }
  )
  
  // Enhanced velocity-based momentum
  const momentumY = useTransform(velocity, [-1000, 1000], ['-2%', '2%'])
  const momentumRotate = useTransform(velocity, [-1000, 1000], [-0.3, 0.3])
  const momentumBlur = useTransform(velocity, [-1000, 0, 1000], [2, 0, 2])

  const evidenceFiles: EvidenceFile[] = [
    {
      id: 'EVD-001',
      title: 'THE SINGAPORE BANKING BREACH',
      category: 'BREACH',
      date: '2024-03-15',
      severity: 'CRITICAL',
      description: 'AI-generated documents bypassed three major banks\' verification systems. Sophisticated deepfake technology created 847 fraudulent accounts within 72 hours before detection.',
      stats: {
        affected: '847 Accounts',
        loss: '$2.3M',
        duration: '72 Hours'
      },
      icon: <FiAlertTriangle className="w-6 h-6" />,
      color: '#ef4444'
    },
    {
      id: 'EVD-002',
      title: 'EASTERN EUROPE FALSE POSITIVE CRISIS',
      category: 'FAILURE',
      date: '2024-02-28',
      severity: 'HIGH',
      description: 'Regional document variations caused systematic failures across Eastern European markets. 15,000+ legitimate users rejected, leading to massive customer abandonment.',
      stats: {
        affected: '15,000 Users',
        loss: '$890K',
        duration: '3 Months'
      },
      icon: <FiTrendingDown className="w-6 h-6" />,
      color: '#f59e0b'
    },
    {
      id: 'EVD-003',
      title: 'GAMING PLATFORM UNDERAGE INFILTRATION',
      category: 'BREACH',
      date: '2024-01-12',
      severity: 'CRITICAL',
      description: 'Advanced silicone masks defeated liveness detection on age-restricted platforms. 312 underage accounts created using sophisticated biometric spoofing techniques.',
      stats: {
        affected: '312 Minors',
        loss: '$450K',
        duration: '6 Weeks'
      },
      icon: <FiUsers className="w-6 h-6" />,
      color: '#dc2626'
    },
    {
      id: 'EVD-004',
      title: 'INDUSTRY COVER-UP PROTOCOLS',
      category: 'COVER-UP',
      date: '2024-04-01',
      severity: 'HIGH',
      description: 'Internal documents reveal coordinated efforts to downplay verification failures. NDAs and limited disclosure used to control public narrative about security breaches.',
      stats: {
        affected: 'Industry-wide',
        loss: 'Undisclosed',
        duration: 'Ongoing'
      },
      icon: <FiEye className="w-6 h-6" />,
      color: '#7c3aed'
    },
    {
      id: 'EVD-005',
      title: 'EMERGING MARKET SYSTEM COLLAPSE',
      category: 'IMPACT',
      date: '2024-01-20',
      severity: 'MEDIUM',
      description: 'Verification systems failed completely in 12 emerging markets. Local document formats and cultural variations not accounted for in system design.',
      stats: {
        affected: '12 Countries',
        loss: '$1.2M',
        duration: '4 Months'
      },
      icon: <FiZap className="w-6 h-6" />,
      color: '#059669'
    }
  ]

  // Move useTransform to top level - FIXED!
  const evidenceProgress = useTransform(progress, [0.2, 0.8], [0, evidenceFiles.length - 1])

  // Enhanced auto-progression with intelligent pausing
  useEffect(() => {
    if (isAutoPlay && investigationMode === 'archive') {
      const interval = setInterval(() => {
        setActiveEvidence(prev => (prev + 1) % evidenceFiles.length)
      }, 5000) // Optimal timing for reading
      return () => clearInterval(interval)
    }
  }, [isAutoPlay, investigationMode, evidenceFiles.length])

  // Enhanced scroll-based control - FIXED!
  useEffect(() => {
    if (!isAutoPlay) {
      const unsubscribe = evidenceProgress.onChange((latest) => {
        const newIndex = Math.round(latest)
        if (newIndex !== activeEvidence && newIndex >= 0 && newIndex < evidenceFiles.length) {
          setActiveEvidence(newIndex)
        }
      })
      return unsubscribe
    }
  }, [isAutoPlay, evidenceProgress, activeEvidence, evidenceFiles.length])

  // Smart auto-play management
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout
    const handleScroll = () => {
      setIsAutoPlay(false)
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        setIsAutoPlay(true)
      }, 2500) // Shorter resume time for better UX
    }

    if (isInView) {
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => {
        window.removeEventListener('scroll', handleScroll)
        clearTimeout(scrollTimeout)
      }
    }
  }, [isInView])

  // Enhanced investigation mode progression
  useEffect(() => {
    if (investigationMode === 'scanning') {
      const timer = setTimeout(() => setInvestigationMode('archive'), 3500)
      return () => clearTimeout(timer)
    }
  }, [investigationMode])

  // Define refined parallax layers with natural illumination
  const parallaxLayers = [
    {
      children: (
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(239, 68, 68, 0.06) 0%, transparent 45%),
            radial-gradient(circle at 75% 75%, rgba(245, 158, 11, 0.04) 0%, transparent 45%),
            radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.03) 0%, transparent 65%)
          `,
          backgroundSize: '900px 900px, 700px 700px, 1100px 1100px'
        }} />
      ),
      speed: -0.25,
      opacity: 0.85,
      blur: 0.3
    },
    {
      children: (
        <motion.div 
          className="absolute inset-0"
          style={{
            background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(239, 68, 68, 0.025) 90deg, transparent 180deg, rgba(245, 158, 11, 0.025) 270deg, transparent 360deg)`,
            scale: archiveScale,
            filter: `blur(${momentumBlur}px)`
          }}
        />
      ),
      speed: 0.15,
      opacity: 0.7
    },
    {
      children: (
        <motion.div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.006) 0%, transparent 75%)`,
            scale: searchBeam,
            opacity: searchBeam
          }}
        />
      ),
      speed: 0.08,
      opacity: 0.6
    }
  ]

  return (
    <ParallaxContainer
      layers={parallaxLayers}
      className="py-24 bg-gradient-to-b from-black via-red-950/10 to-black min-h-screen relative overflow-hidden"
    >
      <section ref={sectionRef} className="relative">
        {/* Refined ambient lighting effects */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-1/3 left-1/3 w-80 h-80 bg-red-500/2 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.15, 0.25, 0.15]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-orange-500/2 rounded-full blur-3xl"
            animate={{
              scale: [1.05, 1, 1.05],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Investigation Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASING.outQuart }}
            viewport={{ once: true }}
            style={{ y: momentumY }}
          >
            <motion.div
              className="inline-flex items-center gap-3 bg-red-600/20 border border-red-600/50 text-red-400 px-6 py-3 rounded-full text-sm font-mono mb-6"
              animate={{ 
                boxShadow: [
                  '0 0 20px rgba(239, 68, 68, 0.3)',
                  '0 0 40px rgba(239, 68, 68, 0.6)',
                  '0 0 20px rgba(239, 68, 68, 0.3)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <FiSearch className="w-4 h-4" />
              </motion.div>
              EVIDENCE ARCHIVE ACCESSED
              <FiFileText className="w-4 h-4" />
            </motion.div>
            
            <motion.h2 
              className="text-5xl md:text-7xl font-black text-white mb-6 font-mono smooth-text"
              animate={{ 
                textShadow: [
                  '0 0 20px rgba(239, 68, 68, 0.5)',
                  '0 0 40px rgba(239, 68, 68, 0.8)',
                  '0 0 20px rgba(239, 68, 68, 0.5)'
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{ rotateX: momentumRotate }}
            >
              THE <span className="text-red-400">EVIDENCE</span> ARCHIVE
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Classified case files documenting systematic verification failures.
              <br />
              <span className="text-red-400 font-semibold">The evidence the industry tried to bury.</span>
            </motion.p>
          </motion.div>

          {/* Enhanced Archive Interface */}
          <AnimatePresence mode="wait">
            {investigationMode === 'scanning' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                className="text-center py-20"
              >
                <motion.div
                  className="inline-block p-8 bg-red-600/10 border-2 border-red-600 rounded-full mb-8"
                  animate={{
                    borderColor: ['rgba(239, 68, 68, 0.6)', 'rgba(239, 68, 68, 1)', 'rgba(239, 68, 68, 0.6)'],
                    boxShadow: [
                      '0 0 50px rgba(239, 68, 68, 0.4)',
                      '0 0 100px rgba(239, 68, 68, 0.8)',
                      '0 0 50px rgba(239, 68, 68, 0.4)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <FiSearch className="w-16 h-16 text-red-400" />
                  </motion.div>
                </motion.div>
                
                <h3 className="text-3xl font-bold text-white mb-4 font-mono">
                  SCANNING CLASSIFIED ARCHIVES
                </h3>
                <motion.p 
                  className="text-lg text-gray-300"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Accessing restricted investigation files...
                </motion.p>
                
                {/* Enhanced Progress Indicator */}
                <motion.div 
                  className="w-64 h-2 bg-gray-800 rounded-full mx-auto mt-8 overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                  />
                </motion.div>
              </motion.div>
            )}

            {investigationMode === 'archive' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                {/* Enhanced Archive Controls */}
                <motion.div 
                  className="bg-gray-900 border border-gray-600 rounded-xl p-6 mb-8"
                  initial={{ y: -50 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.3, ease: EASING.outQuart }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      >
                        <FiFileText className="w-6 h-6 text-red-400" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-white font-mono">
                        EVIDENCE ARCHIVE v3.2
                      </h3>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <motion.button
                        onClick={() => setIsAutoPlay(!isAutoPlay)}
                        className="flex items-center gap-2 px-3 py-1 bg-gray-800 border border-gray-600 rounded text-sm font-mono text-gray-300 hover:text-white gpu-optimized"
                        whileHover={{ scale: 1.05 }}
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
                        <div className={`w-2 h-2 rounded-full ${isAutoPlay ? 'bg-green-400' : 'bg-yellow-400'}`} />
                        {isAutoPlay ? 'AUTO-SCANNING' : 'MANUAL CONTROL'}
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Enhanced Evidence Navigation */}
                  <div className="flex justify-center gap-3">
                    {evidenceFiles.map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => {
                          setActiveEvidence(index)
                          setIsAutoPlay(false)
                        }}
                        className={`w-4 h-4 rounded-full transition-all duration-300 ${
                          index === activeEvidence 
                            ? 'bg-red-400 scale-125' 
                            : 'bg-gray-600 hover:bg-gray-500'
                        }`}
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 0.9 }}
                        animate={{
                          boxShadow: index === activeEvidence 
                            ? ['0 0 10px rgba(248, 113, 113, 0.5)', '0 0 20px rgba(248, 113, 113, 1)', '0 0 10px rgba(248, 113, 113, 0.5)']
                            : 'none'
                        }}
                        transition={{ duration: 2, repeat: index === activeEvidence ? Infinity : 0 }}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Enhanced Evidence Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {evidenceFiles.map((evidence, index) => (
                    <EvidenceCard
                      key={evidence.id}
                      evidence={evidence}
                      isActive={index === activeEvidence}
                      onClick={() => {
                        setActiveEvidence(index)
                        setIsAutoPlay(false)
                      }}
                      index={index}
                    />
                  ))}
                </div>

                {/* Enhanced Investigation Summary */}
                <motion.div 
                  className="text-center mt-16"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-600/30 rounded-2xl p-8 max-w-4xl mx-auto">
                    <motion.div
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <FiAlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-6" />
                      <h3 className="text-3xl font-bold text-white mb-4 font-mono smooth-text">
                        EVIDENCE <span className="text-red-400">CONFIRMED</span>
                      </h3>
                      <p className="text-xl text-gray-300 mb-8">
                        The investigation reveals systematic failures across the verification industry.
                        <br />
                        <span className="text-red-400 font-semibold">Now you've seen the problems. Time to reveal the solution.</span>
                      </p>
                      <motion.button
                        className="bg-red-600 hover:bg-red-500 text-white font-bold py-4 px-8 rounded-lg font-mono uppercase tracking-wide gpu-optimized"
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: '0 0 30px rgba(239, 68, 68, 0.6)',
                          transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                          boxShadow: [
                            '0 0 20px rgba(239, 68, 68, 0.3)',
                            '0 0 40px rgba(239, 68, 68, 0.6)',
                            '0 0 20px rgba(239, 68, 68, 0.3)'
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        CONTINUE INVESTIGATION
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </ParallaxContainer>
  )
}

export default ProblemSection 