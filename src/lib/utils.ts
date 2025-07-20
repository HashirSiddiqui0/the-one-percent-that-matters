import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Centralized easing constants for consistent animations across components
export const EASING = {
  outExpo: [0.16, 1, 0.3, 1] as [number, number, number, number],
  outQuart: [0.25, 1, 0.5, 1] as [number, number, number, number],
  outQuint: [0.22, 1, 0.36, 1] as [number, number, number, number],
  inOutQuart: [0.77, 0, 0.175, 1] as [number, number, number, number],
  elastic: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number]
}

// Centralized animation variants for optimal performance
export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 }
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 }
  },
  slideInLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 30 }
  },
  slideInRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 }
  },
  fadeInDown: {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 }
  },
  zoomIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  }
}

// Individual exports for backward compatibility
export const fadeInUp = ANIMATION_VARIANTS.fadeInUp
export const fadeIn = ANIMATION_VARIANTS.fadeIn
export const slideUp = ANIMATION_VARIANTS.slideUp
export const scaleIn = ANIMATION_VARIANTS.scaleIn
export const slideInLeft = ANIMATION_VARIANTS.slideInLeft
export const slideInRight = ANIMATION_VARIANTS.slideInRight
export const fadeInDown = ANIMATION_VARIANTS.fadeInDown
export const zoomIn = ANIMATION_VARIANTS.zoomIn

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export const countUp = (value: number, duration: number = 2000) => {
  return {
    initial: { value: 0 },
    animate: { value },
    transition: { 
      duration: duration / 1000, 
      ease: "easeOut",
      type: "tween"
    }
  }
} 