'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useCallback, useMemo } from 'react'
import { cn, ANIMATION_VARIANTS } from '@/lib/utils'
import { 
  FiMail, 
  FiPhone, 
  FiCalendar, 
  FiDownload,
  FiShield,
  FiZap,
  FiArrowRight,
  FiCheck,
  FiStar,
  FiFileText
} from 'react-icons/fi'

interface ContactFormData {
  name: string
  email: string
  company: string
  message: string
}

// Static testimonials data - moved outside to prevent recreation
const TESTIMONIALS = [
  {
    quote: "Shufti Pro's document verification helped us scale our KYC process across multiple countries. The accuracy is impressive.",
    author: "Alex Thompson",
    title: "Compliance Manager",
    company: "Regional Bank",
    rating: 5,
    verified: false
  },
  {
    quote: "Easy integration and reliable service. Their API documentation is clear and support team responds quickly.",
    author: "Maria Santos",
    title: "Tech Lead",
    company: "Digital Payments",
    rating: 5,
    verified: false
  },
  {
    quote: "Reduced our verification time significantly. The fraud detection features work well for our use case.",
    author: "David Kim",
    title: "Product Manager",
    company: "FinTech Startup",
    rating: 5,
    verified: false
  }
]

// Static stats data - moved outside to prevent recreation
const STATS = [
  {
    label: "99.9%",
    value: "Accuracy Rate",
    icon: FiShield,
    description: "Industry-leading verification accuracy"
  },
  {
    label: "195+",
    value: "Countries",
    icon: FiZap,
    description: "Global document coverage"
  },
  {
    label: "<2s",
    value: "Response Time",
    icon: FiArrowRight,
    description: "Real-time verification speed"
  },
  {
    label: "24/7",
    value: "Support",
    icon: FiCheck,
    description: "Round-the-clock assistance"
  }
]

const FinalCTA: React.FC = () => {
  const sectionRef = useRef(null)
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])

  // Optimized event handlers with useCallback
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    
    setIsSubmitting(false)
    // Reset form or show success message
  }, [formData])

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
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10" />
        <div className="absolute top-1/4 left-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-accent-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-gradient-to-r from-primary-500/5 to-accent-500/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Enhanced "Why Leaders Choose Shufti Pro" Section */}
        <motion.div
          className="mb-16 sm:mb-20 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Enhanced Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <motion.div
              className="inline-flex items-center gap-2 sm:gap-3 bg-blue-900/20 border border-blue-500/30 text-blue-300 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <FiStar className="w-3 h-3 sm:w-4 sm:h-4" />
              Trusted by Global Enterprises
              <FiStar className="w-3 h-3 sm:w-4 sm:h-4" />
            </motion.div>
            
            <motion.h3 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Why Industry Leaders Choose{' '}
              <span className="text-blue-400">
                Shufti Pro
              </span>
            </motion.h3>
            
            <motion.p 
              className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              When compliance and fraud prevention are critical, enterprises trust Shufti Pro's 
              proven verification technology to protect their business and maintain regulatory standards.
            </motion.p>
          </div>
          
          {/* Enhanced Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={index}
                className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/30"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Company Badge */}
                <div className="absolute -top-3 -right-3 bg-blue-900/50 border border-blue-500/30 text-blue-300 text-xs px-2 sm:px-3 py-1 rounded-full font-medium">
                  {testimonial.company}
                </div>
                
                {/* Enhanced Star Rating */}
                <div className="flex gap-1 mb-4 sm:mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                {/* Enhanced Quote */}
                <blockquote className="text-gray-200 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base font-medium relative">
                  <div className="absolute -top-2 -left-2 text-2xl sm:text-3xl text-blue-400/30 font-serif">"</div>
                  {testimonial.quote}
                  <div className="absolute -bottom-2 -right-2 text-2xl sm:text-3xl text-blue-400/30 font-serif">"</div>
                </blockquote>
                
                {/* Enhanced Author Info */}
                <div className="border-t border-gray-700/50 pt-4 sm:pt-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-white text-base sm:text-lg">{testimonial.author}</div>
                      <div className="text-blue-400 font-medium text-sm sm:text-base">{testimonial.title}</div>
                      <div className="text-gray-400 text-xs sm:text-sm">{testimonial.company}</div>
                    </div>
                  </div>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </div>
          
          {/* Enhanced Stats Section */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {STATS.map((stat, index) => (
              <motion.div
                key={index}
                className="group text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:border-blue-500/30">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 group-hover:text-blue-400 transition-colors duration-300">
                    {stat.value}
                  </div>
                  <div className="text-gray-200 font-semibold text-xs sm:text-sm mb-1">
                    {stat.label}
                  </div>
                  <div className="text-gray-400 text-xs">
                    {stat.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Main CTA Section */}
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={ANIMATION_VARIANTS.fadeInUp.initial}
          animate={ANIMATION_VARIANTS.fadeInUp.animate}
          exit={ANIMATION_VARIANTS.fadeInUp.exit}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/20 rounded-2xl p-6 sm:p-8 md:p-12 max-w-4xl mx-auto">
            {/* Official Shufti Pro Logo */}
            <motion.div
              className="mb-6 sm:mb-8"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <img 
                src="/sp-white-Logo.webp" 
                alt="Shufti Pro" 
                className="h-12 sm:h-16 mx-auto mb-3 sm:mb-4"
              />
            </motion.div>

            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-4 sm:mb-6 px-2">
              Ready to Close the <span className="text-gradient">Critical 1% Gap</span>?
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed px-4">
              Join the investigation conclusion. Experience verification technology 
              engineered for the edge cases that break everyone else.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <motion.button
                className="btn-primary min-w-[200px] sm:min-w-[250px] flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(56, 189, 248, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://shuftipro.com/get-started', '_blank')}
              >
                <FiShield className="w-4 h-4 sm:w-5 sm:h-5" />
                Deploy Shufti Pro
              </motion.button>
              
              <motion.button
                className="btn-secondary min-w-[200px] sm:min-w-[250px] flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('/whitepaper.pdf', '_blank')}
              >
                <FiFileText className="w-4 h-4 sm:w-5 sm:h-5" />
                Complete Investigation Report
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8">
            <div className="mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Get Enterprise Pricing
              </h3>
              <p className="text-gray-300 text-sm sm:text-base">
                Custom solutions for your verification challenges
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-dark-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors duration-300 text-sm sm:text-base"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Business Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-dark-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors duration-300 text-sm sm:text-base"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Company *
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-dark-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors duration-300 text-sm sm:text-base"
                  placeholder="Your Company Inc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Current Verification Challenges
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-dark-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors duration-300 resize-none text-sm sm:text-base"
                  placeholder="Tell us about your current verification pain points..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-accent flex items-center justify-center gap-2 sm:gap-3 py-3 sm:py-4 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                onClick={() => window.open('https://shuftipro.com/contact', '_blank')}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FiMail className="w-4 h-4 sm:w-5 sm:h-5" />
                    Get Custom Solution
                    <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-4 sm:mt-6 text-center">
              <p className="text-xs sm:text-sm text-gray-400">
                Response within 1 business hour. No spam, ever.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Security Badge */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-6 bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-full px-8 py-4">
            <div className="flex items-center gap-2 text-green-400">
              <FiShield className="w-5 h-5" />
              <span className="text-sm font-medium">SOC 2 Type II</span>
            </div>
            <div className="w-px h-6 bg-white/10" />
            <div className="flex items-center gap-2 text-green-400">
              <FiShield className="w-5 h-5" />
              <span className="text-sm font-medium">ISO 27001</span>
            </div>
            <div className="w-px h-6 bg-white/10" />
            <div className="flex items-center gap-2 text-green-400">
              <FiShield className="w-5 h-5" />
              <span className="text-sm font-medium">GDPR Compliant</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FinalCTA 