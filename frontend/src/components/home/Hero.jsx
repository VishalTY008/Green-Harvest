import { motion } from 'framer-motion';
import Button from '../common/Button';
import FloatingElements from '../common/FloatingElements';

const wordReveal = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function Hero() {
  const titleWords = "Cultivating Tomorrow's Harvest Today".split(' ');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-16 md:-mt-20">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-earth-900 via-earth-800 to-sprout-900 z-10" />
        <div className="absolute inset-0 opacity-30 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-leaf-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-sunset-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sprout-500/10 rounded-full blur-3xl animate-pulse-slow" />
        </div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FloatingElements />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-white/80 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-leaf-400 animate-pulse" />
          Pioneering Sustainable Agriculture Since 1998
        </motion.div>

        <h1 className="font-serif text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-6 max-w-5xl mx-auto leading-tight">
          {titleWords.map((word, i) => (
            <motion.span key={i}
              custom={i}
              variants={wordReveal}
              initial="hidden"
              animate="visible"
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Empowering farmers with innovative solutions, premium quality seeds, sustainable practices, and cutting-edge agricultural technology for a greener tomorrow.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Button variant="gradient" href="/products">
            Explore Our Products
          </Button>
          <Button variant="secondary" className="border-white/30 text-white hover:bg-white hover:text-earth-900" href="/about">
            Learn More
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
          >
            <motion.div className="w-1 h-2 rounded-full bg-white" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
