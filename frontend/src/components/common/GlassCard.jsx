import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', delay = 0, hover3d = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={hover3d ? { scale: 1.02, rotateX: 2, rotateY: 2 } : { y: -5 }}
      className={`glass rounded-2xl p-6 transition-shadow duration-300 hover:shadow-xl ${className}`}
    >
      {children}
    </motion.div>
  );
}
