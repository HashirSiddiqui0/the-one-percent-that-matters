import Head from 'next/head'
import React, { memo, useCallback, useMemo, useState, useEffect, lazy, Suspense } from 'react'
import { motion, useScroll, useSpring, useTransform, AnimatePresence, useReducedMotion } from 'framer-motion'

// Lazy load components for better performance
const HeroSection = lazy(() => import('@/components/HeroSection'))
const ProblemSection = lazy(() => import('@/components/ProblemSection'))
const ShuftiDifference = lazy(() => import('@/components/ShuftiDifference'))
const ComparisonSplit = lazy(() => import('@/components/ComparisonSplit'))
const WhitepaperPreview = lazy(() => import('@/components/WhitepaperPreview'))
const FinalCTA = lazy(() => import('@/components/FinalCTA'))
const PerformanceMonitor = lazy(() => import('@/components/PerformanceMonitor'))

// Optimized scroll hook
import { useScrollOptimization } from '@/hooks/useScrollOptimization'
import { EASING } from '@/lib/utils'

// Memoized Navigation Component
const Navigation = memo(() => {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-sm border-b border-gray-800/30"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <img 
              src="/sp-white-Logo.webp" 
              alt="Shufti Pro" 
              className="h-6"
              loading="eager"
            />
            <div className="ml-3 border-l border-gray-600 pl-3">
              <span className="text-yellow-400 font-mono text-xs font-bold">CLASSIFIED</span>
            </div>
          </motion.div>
          
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
          >
            <div className="text-xs text-gray-400 font-mono">THE 1% DOSSIER</div>
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
          </motion.div>
        </div>
      </div>
    </motion.nav>
  )
})

Navigation.displayName = 'Navigation'

// Memoized Theme Toggle Component
const ThemeToggle = memo(() => {
  const [isDark, setIsDark] = useState(true)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  const toggleTheme = useCallback(() => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }, [isDark])

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 bg-gray-800/80 backdrop-blur-sm border border-white/10 text-white p-2 rounded-full hover:bg-gray-700 transition-colors duration-300"
      whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
    >
      <motion.div
        animate={shouldReduceMotion ? {} : { rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      </motion.div>
    </motion.button>
  )
})

ThemeToggle.displayName = 'ThemeToggle'

  // ULTIMATE Enhanced Loading Screen Component with maximum hacking/database effects
  const LoadingScreen = memo(() => {
    const [loadingPhase, setLoadingPhase] = useState('boot')
    const [progress, setProgress] = useState(0)
    const [loadingText, setLoadingText] = useState('')
    const [terminalLines, setTerminalLines] = useState<string[]>([])
    const [systemStatus, setSystemStatus] = useState<'booting' | 'connecting' | 'breaching' | 'accessing' | 'complete'>('booting')
    const [securityLevel, setSecurityLevel] = useState(0)
    const [isReady, setIsReady] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    const shouldReduceMotion = useReducedMotion()
    
    // Prevent hydration mismatch by ensuring client-side calculations only happen after mount
    useEffect(() => {
      setIsMounted(true)
    }, [])
  
      useEffect(() => {
      // Only start animations after component is mounted to prevent hydration mismatch
      if (!isMounted) return
      
      const phases: Array<{
        phase: string
        text: string
        duration: number
        status: 'booting' | 'connecting' | 'breaching' | 'accessing' | 'complete'
      }> = [
      { phase: 'boot', text: 'SYSTEM BOOT SEQUENCE INITIATED...', duration: 800, status: 'booting' },
      { phase: 'os_load', text: 'LOADING CLASSIFIED OS KERNEL...', duration: 700, status: 'booting' },
      { phase: 'network', text: 'ESTABLISHING QUANTUM ENCRYPTED TUNNEL...', duration: 900, status: 'connecting' },
      { phase: 'firewall', text: 'BYPASSING PENTAGON FIREWALL LAYER 1...', duration: 1000, status: 'breaching' },
      { phase: 'firewall2', text: 'BYPASSING PENTAGON FIREWALL LAYER 2...', duration: 800, status: 'breaching' },
      { phase: 'firewall3', text: 'BYPASSING PENTAGON FIREWALL LAYER 3...', duration: 600, status: 'breaching' },
      { phase: 'auth', text: 'SPOOFING ADMINISTRATOR CREDENTIALS...', duration: 700, status: 'breaching' },
      { phase: 'access', text: 'GAINING ROOT ACCESS TO CLASSIFIED DB...', duration: 800, status: 'accessing' },
      { phase: 'decrypt', text: 'DECRYPTING AES-256 PROTECTED FILES...', duration: 900, status: 'accessing' },
      { phase: 'extract', text: 'EXTRACTING THE 1% DOSSIER...', duration: 600, status: 'accessing' },
      { phase: 'cover', text: 'COVERING DIGITAL FOOTPRINTS...', duration: 500, status: 'accessing' },
      { phase: 'complete', text: 'MISSION ACCOMPLISHED - CLASSIFIED ACCESS GRANTED', duration: 700, status: 'complete' }
    ]
    
    let currentPhaseIndex = 0
    let currentProgress = 0
    
    // Enhanced terminal output simulation
    const terminalCommands = [
      'root@classified-server:~# whoami',
      'NSA_ADMIN_LEVEL_7',
      'root@classified-server:~# ls -la /classified/verification/',
      'drwxr-xr-x 7 root root 4096 Mar 15 00:01 singapore_incident/',
      'drwxr-xr-x 5 root root 4096 Feb 28 15:42 project_false_positive/',
      'drwxr-xr-x 3 root root 4096 Jan 12 09:15 mask_protocol_failure/',
      '-rwxr--r-- 1 root root 2048576 Current the_one_percent_dossier.enc',
      'root@classified-server:~# openssl enc -aes-256-cbc -d -in the_one_percent_dossier.enc',
      'Enter AES key: ************************',
      'Decryption successful. Extracting classified intel...',
      'WARNING: CLASSIFIED MATERIAL DETECTED',
      'AUTHORIZATION LEVEL: TOP SECRET//SI//TK//NOFORN',
      'Accessing investigation files...',
      'CONNECTION ESTABLISHED TO SHUFTI PRO DATABASE',
      'Downloading critical evidence...',
      'TRANSFER COMPLETE - MISSION ACCOMPLISHED'
    ]

    let terminalIndex = 0
    const terminalInterval = setInterval(() => {
      if (terminalIndex < terminalCommands.length) {
        setTerminalLines(prev => [...prev, terminalCommands[terminalIndex]])
        terminalIndex++
      }
    }, shouldReduceMotion ? 150 : 300)
    
    // Enhanced progress animation with realistic hacking delays
    const progressInterval = setInterval(() => {
      currentProgress += Math.random() * 4 + 1
      if (currentProgress > 100) currentProgress = 100
      setProgress(currentProgress)
      
      if (currentProgress >= 100) {
        clearInterval(progressInterval)
        setTimeout(() => setIsReady(true), 1000)
      }
    }, shouldReduceMotion ? 30 : 60)
    
    // Security level progression
    const securityInterval = setInterval(() => {
      setSecurityLevel(prev => Math.min(prev + Math.random() * 10, 100))
    }, shouldReduceMotion ? 100 : 200)
    
    // Enhanced phase progression with realistic timing
    const phaseInterval = setInterval(() => {
      if (currentPhaseIndex < phases.length) {
        const currentPhase = phases[currentPhaseIndex]
        setLoadingPhase(currentPhase.phase)
        setSystemStatus(currentPhase.status)
        
        // Enhanced typewriter effect with random delays
        let charIndex = 0
        const typewriterInterval = setInterval(() => {
          if (charIndex <= currentPhase.text.length) {
            setLoadingText(currentPhase.text.substring(0, charIndex))
            charIndex++
          } else {
            clearInterval(typewriterInterval)
          }
        }, shouldReduceMotion ? 15 : 25)
        
        currentPhaseIndex++
      } else {
        clearInterval(phaseInterval)
      }
    }, shouldReduceMotion ? 300 : 500)
    
          return () => {
        clearInterval(progressInterval)
        clearInterval(phaseInterval)
        clearInterval(terminalInterval)
        clearInterval(securityInterval)
      }
    }, [shouldReduceMotion, isMounted])

  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: EASING.outQuart }}
    >
              {/* Ultimate Enhanced Background Effects */}
        {!shouldReduceMotion && isMounted && (
          <>
            {/* Matrix-style digital rain */}
            <div className="absolute inset-0 opacity-15">
              <div className="grid grid-cols-20 grid-rows-15 h-full w-full">
                {Array.from({ length: 300 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="border border-green-500/20 text-green-400 text-xs font-mono flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      color: [
                        'rgba(34, 197, 94, 0.6)',
                        'rgba(34, 197, 94, 1)', 
                        'rgba(14, 165, 233, 0.8)',
                        'rgba(34, 197, 94, 0.6)'
                      ]
                    }}
                    transition={{ 
                      duration: 2 + Math.random() * 3, 
                      delay: i * 0.005, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {Math.random() > 0.5 ? '1' : '0'}
                  </motion.div>
                ))}
              </div>
            </div>

          {/* Multiple scanning lines */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: [
                'linear-gradient(0deg, transparent 0%, rgba(239, 68, 68, 0.4) 2%, transparent 4%)',
                'linear-gradient(0deg, transparent 96%, rgba(239, 68, 68, 0.4) 98%, transparent 100%)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: [
                'linear-gradient(90deg, transparent 0%, rgba(14, 165, 233, 0.3) 50%, transparent 100%)',
                'linear-gradient(90deg, transparent 100%, rgba(14, 165, 233, 0.3) 150%, transparent 200%)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
          />

          {/* Glitch effects */}
          <motion.div
            className="absolute inset-0 pointer-events-none bg-red-500/5"
            animate={{ opacity: [0, 0, 0, 0.3, 0] }}
            transition={{ duration: 3, repeat: Infinity, times: [0, 0.7, 0.8, 0.9, 1] }}
          />
        </>
      )}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 h-screen flex flex-col">
        {/* Enhanced Header with system info */}
        <motion.div
          className="pt-8 pb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASING.outQuart }}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
              <motion.img 
                src="/sp-white-Logo.webp" 
                alt="Shufti Pro" 
                className="h-12"
                loading="eager"
                animate={shouldReduceMotion ? {} : { 
                  filter: [
                    'drop-shadow(0 0 10px rgba(14, 165, 233, 0.5))',
                    'drop-shadow(0 0 30px rgba(14, 165, 233, 0.8))',
                    'drop-shadow(0 0 10px rgba(14, 165, 233, 0.5))'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="text-left">
                <div className="text-red-400 font-mono text-sm font-bold">CLASSIFIED OPERATION</div>
                <div className="text-gray-400 font-mono text-xs">Deep Cover Intelligence Access</div>
              </div>
            </div>
            
            <div className="text-right space-y-1">
              <div className="text-blue-300 font-mono text-xs">SECURITY CLEARANCE: TOP SECRET</div>
              <div className="text-blue-400 font-mono text-xs">OPERATION: THE 1% DOSSIER</div>
              <div className="text-green-400 font-mono text-xs">STATUS: {systemStatus.toUpperCase()}</div>
            </div>
          </div>

          <motion.div
            className="w-full h-0.5 bg-gradient-to-r from-red-500 to-red-600"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
        </motion.div>

        {/* Main Content Area */}
        <div className="flex-1 flex gap-8">
          {/* Terminal Window */}
          <motion.div
            className="flex-1 bg-black/90 border border-green-500/50 rounded-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="bg-green-500/20 px-4 py-2 border-b border-green-500/50">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-green-400 font-mono text-sm font-bold">NSA Terminal v3.7.1 - CLASSIFIED ACCESS</span>
              </div>
            </div>
            
            <div className="h-80 p-4 overflow-y-auto font-mono text-sm">
              {terminalLines.map((line, index) => (
                <motion.div
                  key={index}
                  className={`${
                    line.startsWith('root@') ? 'text-green-400' :
                    line.includes('WARNING') || line.includes('CLASSIFIED') ? 'text-red-400' :
                    line.includes('SUCCESS') || line.includes('COMPLETE') ? 'text-green-400' :
                    line.startsWith('drwx') || line.startsWith('-rwx') ? 'text-blue-400' :
                    'text-gray-300'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {line}
                  {index === terminalLines.length - 1 && (
                    <motion.span
                      className="text-green-400 ml-1"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    >
                      █
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Status Panel */}
          <motion.div
            className="w-80 space-y-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            {/* System Status */}
            <div className="bg-gray-900/90 border border-blue-500/50 rounded-lg p-4">
              <h3 className="text-blue-400 font-mono font-bold mb-3">SYSTEM STATUS</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">CPU Usage:</span>
                  <span className="text-red-400 text-sm font-mono">{isMounted ? Math.floor(progress * 0.87 + 13) : 0}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Memory:</span>
                  <span className="text-yellow-400 text-sm font-mono">{isMounted ? Math.floor(progress * 0.64 + 36) : 0}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Network:</span>
                  <span className="text-green-400 text-sm font-mono">{isMounted ? Math.floor(progress * 0.92 + 8) : 0}%</span>
                </div>
              </div>
            </div>

            {/* Security Level */}
            <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4">
              <h3 className="text-red-400 font-mono font-bold mb-3">SECURITY BREACH</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Penetration:</span>
                    <span className="text-red-400 font-mono">{isMounted ? Math.floor(securityLevel) : 0}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-red-500 to-orange-400"
                      initial={{ width: 0 }}
                      animate={{ width: isMounted ? `${securityLevel}%` : '0%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
                
                {/* Status indicators */}
                <div className="space-y-1">
                  {[
                    { label: 'FIREWALL', status: securityLevel > 20 },
                    { label: 'ENCRYPTION', status: securityLevel > 50 },
                    { label: 'DATABASE', status: securityLevel > 80 },
                    { label: 'ADMIN ACCESS', status: securityLevel > 95 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <motion.div
                        className={`w-2 h-2 rounded-full ${item.status ? 'bg-red-500' : 'bg-gray-600'}`}
                        animate={item.status && !shouldReduceMotion ? { 
                          scale: [1, 1.3, 1],
                          opacity: [1, 0.7, 1]
                        } : {}}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      <span className={`text-xs font-mono ${item.status ? 'text-red-400' : 'text-gray-500'}`}>
                        {item.label} {item.status ? 'BREACHED' : 'SECURED'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mission Progress */}
            <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-4">
              <h3 className="text-blue-400 font-mono font-bold mb-3">MISSION PROGRESS</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Data Extraction:</span>
                    <span className="text-blue-400 font-mono">{isMounted ? Math.floor(progress) : 0}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden border border-blue-600/30">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full relative overflow-hidden"
                      initial={{ width: 0 }}
                      animate={{ width: isMounted ? `${progress}%` : '0%' }}
                      transition={{ duration: 0.5, ease: EASING.outQuart }}
                    >
                      {!shouldReduceMotion && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                          animate={{ x: ['-100%', '200%'] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />
                      )}
                    </motion.div>
                  </div>
                </div>
                
                <div className="text-center">
                  <motion.div
                    className="text-2xl font-mono font-bold"
                    animate={{ 
                      color: progress === 100 ? '#10b981' : '#3b82f6'
                    }}
                  >
                    {isMounted ? Math.floor(progress) : 0}%
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Status Bar */}
        <motion.div
          className="py-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <div className="bg-black/80 border border-gray-600 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="text-blue-400 font-mono text-lg font-bold">
                  {loadingText}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                    className="ml-2"
                  >
                    |
                  </motion.span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-xs text-gray-400 font-mono">
                  PHASE: {loadingPhase.toUpperCase().replace('_', ' ')}
                </div>
                <motion.div
                  className={`w-3 h-3 rounded-full ${
                    systemStatus === 'complete' ? 'bg-green-500' :
                    systemStatus === 'accessing' ? 'bg-blue-500' :
                    systemStatus === 'breaching' ? 'bg-red-500' :
                    'bg-blue-400'
                  }`}
                  animate={!shouldReduceMotion ? { 
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1]
                  } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>
            </div>
          </div>
          
          {/* Ready State */}
          {isReady && (
            <motion.div
              className="mt-4 text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: EASING.elastic }}
            >
              <motion.div
                className="bg-green-500/20 border-2 border-green-500 rounded-xl p-6"
                animate={!shouldReduceMotion ? {
                  borderColor: [
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(34, 197, 94, 1)',
                    'rgba(34, 197, 94, 0.8)'
                  ],
                  boxShadow: [
                    '0 0 30px rgba(34, 197, 94, 0.4)',
                    '0 0 60px rgba(34, 197, 94, 0.8)',
                    '0 0 30px rgba(34, 197, 94, 0.4)'
                  ]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex items-center justify-center gap-4">
                  {!shouldReduceMotion && (
                    <motion.div
                      className="w-12 h-12 border-2 border-green-400 rounded-full flex items-center justify-center"
                      animate={{ 
                        rotate: [0, 360],
                        borderColor: ['rgba(34, 197, 94, 0.8)', 'rgba(34, 197, 94, 1)', 'rgba(34, 197, 94, 0.8)']
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="w-4 h-4 bg-green-400 rounded-full" />
                    </motion.div>
                  )}
                  <div className="text-center">
                    <div className="text-green-400 font-mono font-bold text-2xl mb-2">
                      [ MISSION ACCOMPLISHED ]
                    </div>
                    <div className="text-green-300 font-mono text-lg">
                      CLASSIFIED DATABASE ACCESS GRANTED
                    </div>
                    <div className="text-gray-400 font-mono text-sm mt-2">
                      Initializing investigation interface...
                    </div>
                  </div>
                  {!shouldReduceMotion && (
                    <motion.div
                      className="w-12 h-12 border-2 border-green-400 rounded-full flex items-center justify-center"
                      animate={{ 
                        rotate: [0, -360],
                        borderColor: ['rgba(34, 197, 94, 0.8)', 'rgba(34, 197, 94, 1)', 'rgba(34, 197, 94, 0.8)']
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    >
                      <div className="w-4 h-4 bg-green-400 rounded-full" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
})

LoadingScreen.displayName = 'LoadingScreen'

// Component Wrapper with Error Boundary
const ComponentWrapper = memo(({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-white font-mono">Loading...</div>
    </div>
  }>
    {children}
  </Suspense>
))

ComponentWrapper.displayName = 'ComponentWrapper'

// Main Home Component with full optimization
const Home = memo(() => {
  const [isLoading, setIsLoading] = useState(true)
  const shouldReduceMotion = useReducedMotion()
  
  // Optimized scroll optimization with reduced features
  const scrollMetrics = useScrollOptimization({
    enableMomentum: !shouldReduceMotion,
    velocityThreshold: 3,
    momentumDuration: 100
  })

  // Optimized scroll progress
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    damping: shouldReduceMotion ? 100 : 50,
    stiffness: shouldReduceMotion ? 1000 : 400,
    restDelta: 0.001
  })

  // Optimized loading with faster timing
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, shouldReduceMotion ? 1500 : 3500) // Much faster loading

    // Preload critical images only
    const img = new Image()
    img.src = '/sp-white-Logo.webp'

    return () => clearTimeout(timer)
  }, [shouldReduceMotion])

  // Memoized progress bar transform
  const progressTransform = useMemo(() => ({
    scaleX: smoothProgress,
    filter: `drop-shadow(0 0 10px rgba(14, 165, 233, 0.6))`
  }), [smoothProgress])

  // Loading state
  if (isLoading) {
    return (
      <div style={{ 
        width: '100vw', 
        height: '100vh', 
        backgroundColor: '#000000',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999
      }}>
        <AnimatePresence mode="wait">
          <LoadingScreen key="loading" />
        </AnimatePresence>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>The 1% Dossier | Shufti Pro Investigation</title>
        <meta name="description" content="Classified investigation reveals how Shufti Pro solves the critical 1% that breaks all other verification systems." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/webp" href="/favicon.webp" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        <meta name="msapplication-TileImage" content="/favicon.png" />
        <meta property="og:title" content="The 1% Dossier | Shufti Pro Investigation" />
        <meta property="og:description" content="The classified investigation into verification industry failures and solutions." />
        <meta property="og:type" content="website" />
        <meta name="theme-color" content="#000000" />
        <link rel="preload" href="/sp-white-Logo.webp" as="image" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      </Head>

      <main className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
        <Navigation />
        <ThemeToggle />

        {/* Optimized Progress Indicator */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500 z-50 origin-left"
          style={progressTransform}
        />

        {/* Main Content with Lazy Loading */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Hero Section */}
          <ComponentWrapper>
            <HeroSection />
          </ComponentWrapper>

          {/* Problem Section */}
          <ComponentWrapper>
            <ProblemSection />
          </ComponentWrapper>

          {/* Comparison Section */}
          <ComponentWrapper>
            <ComparisonSplit />
          </ComponentWrapper>

          {/* Solution Section */}
          <ComponentWrapper>
            <ShuftiDifference />
          </ComponentWrapper>

          {/* Whitepaper Section */}
          <ComponentWrapper>
            <WhitepaperPreview />
          </ComponentWrapper>

          {/* Final CTA */}
          <ComponentWrapper>
            <FinalCTA />
          </ComponentWrapper>
        </motion.div>

        {/* Enhanced Footer */}
        <footer className="bg-gradient-to-b from-black to-gray-900 border-t border-gray-800 relative overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(14, 165, 233, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(14, 165, 233, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px, 50px 50px'
            }} />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Company Info */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <img 
                    src="/sp-white-Logo.webp" 
                    alt="Shufti Pro" 
                    className="h-10"
                    loading="lazy"
                  />
                  <div className="h-8 w-px bg-gradient-to-b from-transparent via-gray-600 to-transparent"></div>
                  <div className="text-xs text-gray-500 font-mono">VERIFICATION TECHNOLOGY</div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-400">Investigation Classification:</span>
                  </div>
                  <div className="text-red-400 font-mono font-bold text-lg tracking-wider">
                    TOP SECRET - THE 1% DOSSIER
                  </div>
                </div>
                
                <div className="pt-4">
                  <a 
                    href="https://shuftipro.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-shufti-400 hover:text-shufti-300 font-mono transition-all duration-300 group"
                  >
                    <div className="p-2 bg-shufti-400/10 rounded-lg group-hover:bg-shufti-400/20 transition-colors duration-300">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                      </svg>
                    </div>
                    <span className="text-sm">Visit Official Website</span>
                    <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Investigation Findings */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full"></div>
                  <h4 className="text-white font-bold font-mono text-lg tracking-wider">INVESTIGATION FINDINGS</h4>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Edge Cases Identified:</span>
                      <span className="text-blue-400 font-mono font-bold text-lg">10,000+</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Fraud Prevented:</span>
                      <span className="text-green-400 font-mono font-bold text-lg">$47M+</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact & Developer */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-green-400 to-green-600 rounded-full"></div>
                  <h4 className="text-white font-bold font-mono text-lg tracking-wider">CLASSIFIED CONTACT</h4>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                    <div className="text-gray-400 text-xs mb-2">Security Clearance Required</div>
                    <div className="text-blue-400 font-mono text-sm">enterprise@shuftipro.com</div>
                  </div>
                  
                  <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                    <div className="text-gray-400 text-xs mb-3">Developer Profile:</div>
                    <a 
                      href="https://github.com/HashirSiddiqui0" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 text-shufti-400 hover:text-shufti-300 font-mono transition-all duration-300 group"
                    >
                      <div className="p-2 bg-shufti-400/10 rounded-lg group-hover:bg-shufti-400/20 transition-colors duration-300">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </div>
                      <span className="text-sm">HashirSiddiqui0</span>
                      <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-800 mt-12 pt-8">
              <div className="text-center space-y-4">
                <div className="text-gray-500 text-sm font-mono">
                  © 2024 Shufti Pro Ltd. All investigation materials classified.
                </div>
                
                <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-4 max-w-3xl mx-auto">
                  <div className="text-yellow-400 text-xs font-mono font-bold mb-2 tracking-wider">
                    CAMPAIGN DISCLAIMER
                  </div>
                  <div className="text-gray-400 text-xs font-mono leading-relaxed">
                    This is a creative marketing campaign by Shufti Pro to showcase our verification technology capabilities. The "classified investigation" theme is fictional and designed for entertainment and educational purposes. For actual business inquiries, please visit our official website or contact our enterprise team.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Performance Monitor - Development Only */}
        {process.env.NODE_ENV === 'development' && (
          <ComponentWrapper>
            <PerformanceMonitor />
          </ComponentWrapper>
        )}
      </main>
    </>
  )
})

Home.displayName = 'Home'

export default Home 