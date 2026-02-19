// src/components/PageTransitionWrapper.tsx

// Import 'motion' sebagai VALUE (tanpa keyword type)
import { motion } from 'framer-motion';
// Import 'Variants' dan 'Transition' sebagai TYPE
import type { Variants, Transition } from 'framer-motion';

/**
 * Mendefinisikan Variants dengan tipe Variants dari framer-motion.
 */
const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -20,
  },
};

/**
 * Mendefinisikan Transition dengan keyword 'as const'.
 */
const pageTransition: Transition = {
  type: 'tween',
  ease: 'easeOut',
  duration: 0.4,
} as const;

interface PageTransitionWrapperProps {
  children: React.ReactNode;
}

export default function PageTransitionWrapper({ children }: PageTransitionWrapperProps) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      transition={pageTransition}
      style={{ 
        position: 'relative', 
        width: '100%',
        willChange: 'transform, opacity' 
      }} 
    >
      {children}
    </motion.div>
  );
}