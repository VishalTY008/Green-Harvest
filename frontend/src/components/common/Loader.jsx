import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Loader({ onComplete }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onComplete?.();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-earth-900 dark:bg-black"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center"
          >
            <svg width="80" height="80" viewBox="0 0 80 80" className="mx-auto mb-6">
              <motion.path
                d="M40 5 C25 5 15 20 15 35 C15 50 25 65 40 75 C55 65 65 50 65 35 C65 20 55 5 40 5Z"
                fill="none"
                stroke="#4CAF50"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
              <motion.path
                d="M40 15 L40 45 M25 30 L55 30"
                stroke="#FF8C00"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 1, ease: 'easeInOut' }}
              />
              <motion.circle
                cx="40" cy="40" r="28"
                fill="none"
                stroke="rgba(76,175,80,0.3)"
                strokeWidth="1"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: 'center' }}
              />
            </svg>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-white/60 text-sm tracking-widest uppercase"
            >
              Growing something beautiful
            </motion.p>
            <motion.div className="mt-4 flex justify-center gap-1">
              {[0, 1, 2].map(i => (
                <motion.div key={i}
                  className="w-2 h-2 rounded-full bg-leaf-500"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity, repeatDelay: 0.3 }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
