'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { cn, ANIMATION_VARIANTS } from '@/lib/utils'
import { 
  FiFileText, 
  FiDownload, 
  FiEye, 
  FiShield,
  FiTrendingUp,
  FiGlobe,
  FiArrowRight,
  FiChevronRight,
  FiCheck,
  FiStar
} from 'react-icons/fi'

interface WhitepaperCardProps {
  title: string
  description: string
  content: string
  icon: React.ReactNode
  color: string
  index: number
}

const WhitepaperCard: React.FC<WhitepaperCardProps> = ({ 
  title, 
  description, 
  content, 
  icon, 
  color, 
  index 
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      className="relative flex-shrink-0 w-80 lg:w-96 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden cursor-pointer group"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02, y: -5 }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Background Gradient */}
      <motion.div 
        className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${color}`}
        animate={{ opacity: isExpanded ? 0.1 : 0 }}
      />
      
      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className={`text-primary-400 ${color.includes('primary') ? 'text-primary-400' : color.includes('accent') ? 'text-accent-400' : 'text-green-400'}`}>
            {icon}
          </div>
          <div className="flex-1">
            <div className="text-gray-400 text-sm font-medium mb-1">
              Chapter {index + 1}
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors duration-300">
              {title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 leading-relaxed mb-6">
          {description}
        </p>

        {/* Expandable Content */}
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : '0' }}
          className="overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isExpanded ? 1 : 0 }}
            transition={{ delay: isExpanded ? 0.2 : 0 }}
            className="border-t border-white/10 pt-6 mb-6"
          >
            <h4 className="text-lg font-semibold text-white mb-3">Preview:</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              {content}
            </p>
          </motion.div>
        </motion.div>

        {/* Action Button */}
        <motion.div
          className="flex items-center justify-between"
          whileHover={{ x: 5 }}
        >
          <motion.span 
            className="text-primary-400 font-medium text-sm flex items-center gap-2"
            animate={{ opacity: isExpanded ? 1 : 0.7 }}
          >
            {isExpanded ? 'Download Full Chapter' : 'Click to Preview'}
            <FiChevronRight className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
          </motion.span>
          
          {isExpanded && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 flex items-center gap-2"
              onClick={(e) => {
                e.stopPropagation()
                window.open('/whitepaper.pdf', '_blank')
              }}
            >
              <FiDownload className="w-4 h-4" />
              Download
            </motion.button>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

const WhitepaperPreview: React.FC = () => {
  const sectionRef = useRef(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])

  const whitepaperSections = [
    {
      title: "The Myth of 99% Accuracy",
      description: "Why the industry standard isn't enough when fraud is evolving faster than detection.",
      content: "Most vendors advertise near-perfect accuracy rates, but these numbers are misleading. The critical 1% represents edge cases where real fraud happens: sophisticated deepfakes, regional document variations, and novel attack vectors that traditional systems haven't seen before. Our analysis of 150 million verification attempts reveals that 89% of successful fraud attempts exploit these exact edge cases...",
      icon: <FiEye className="w-8 h-8" />,
      color: "from-red-500 to-red-600"
    },
    {
      title: "Deepfakes and AI-Generated Fraud",
      description: "How generative AI has transformed the fraud landscape and why traditional detection fails.",
      content: "The rise of accessible deepfake technology has created a new category of sophisticated fraud that bypasses traditional verification systems. Our research team identified 15 distinct categories of AI-generated document forgeries, each requiring specialized detection algorithms. Case studies from Fortune 500 companies show average losses of $2.3M per successful deepfake attack...",
      icon: <FiShield className="w-8 h-8" />,
      color: "from-primary-500 to-primary-600"
    },
    {
      title: "Global Edge Cases: Beyond the Big 5",
      description: "Regional document variations and emerging market challenges that break standard verification.",
      content: "While most vendors focus on documents from major economies, real global coverage requires understanding 1,200+ document variations across 240 countries. Our field research across emerging markets identified systematic verification failures that cost enterprises $180M annually in lost customers and compliance penalties...",
      icon: <FiGlobe className="w-8 h-8" />,
      color: "from-green-500 to-green-600"
    },
    {
      title: "The Hidden Cost of False Positives",
      description: "How blocking legitimate users creates more damage than fraud itself.",
      content: "Enterprise analysis reveals that false positives cost 3.2x more than fraud losses when accounting for customer lifetime value, support costs, and reputation damage. High-value customers abandoned at verification have an average lifetime value of $47,000, making precision optimization more valuable than accuracy alone...",
      icon: <FiTrendingUp className="w-8 h-8" />,
      color: "from-accent-500 to-accent-600"
    },
    {
      title: "Shufti Pro's Edge Case Architecture",
      description: "The technical innovations that make 99.8% accuracy possible where it matters most.",
      content: "Our proprietary edge case intelligence platform combines 12 specialized detection algorithms, real-time threat intelligence, and human expert validation for complex scenarios. This multi-layered approach has successfully identified and prevented $47M in fraud attempts while maintaining a 0.02% false positive rate across 150M+ verifications...",
      icon: <FiShield className="w-8 h-8" />,
      color: "from-primary-500 to-primary-600"
    }
  ]

  const scrollToNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' })
    }
  }

  const scrollToPrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' })
    }
  }

  return (
    <section 
      ref={sectionRef}
      className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900 overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 opacity-20 parallax-element"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10" />
        <div className="absolute top-1/4 left-1/3 w-48 sm:w-96 h-48 sm:h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-48 sm:w-96 h-48 sm:h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 text-purple-400 px-4 py-2 rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <FiFileText className="w-4 h-4" />
            Exclusive Research
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            <span className="text-gradient">Whitepaper Preview</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Deep dive into the research behind "The One Percent That Matters" - 
            comprehensive analysis of verification failures and edge case solutions.
          </p>
        </motion.div>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 left-0 z-20">
            <motion.button
              onClick={scrollToPrev}
              className="bg-dark-800/80 backdrop-blur-sm border border-white/10 text-white p-3 rounded-full hover:bg-dark-700 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiChevronRight className="w-5 h-5 rotate-180" />
            </motion.button>
          </div>
          
          <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 right-0 z-20">
            <motion.button
              onClick={scrollToNext}
              className="bg-dark-800/80 backdrop-blur-sm border border-white/10 text-white p-3 rounded-full hover:bg-dark-700 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Scrollable Content */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {whitepaperSections.map((section, index) => (
              <WhitepaperCard
                key={index}
                {...section}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Download CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-purple-500/10 to-primary-500/10 border border-purple-500/20 rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <FiFileText className="w-8 h-8 text-purple-400" />
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Download the Complete Whitepaper
              </h3>
            </div>
            
            <p className="text-xl text-gray-300 mb-8">
              45 pages of research, case studies, and technical insights into solving 
              the critical 1% that determines verification success.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                className="btn-primary min-w-[240px] flex items-center justify-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('/whitepaper.pdf', '_blank')}
              >
                <FiDownload className="w-5 h-5" />
                Download Full Whitepaper
              </motion.button>
              
              <motion.button
                className="btn-secondary min-w-[200px] flex items-center justify-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://shuftipro.com/contact', '_blank')}
              >
                <FiEye className="w-5 h-5" />
                Schedule Expert Walkthrough
              </motion.button>
            </div>
            
            <div className="mt-6 text-sm text-gray-400">
              No forms, no spam - instant download for enterprise decision makers
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default WhitepaperPreview 