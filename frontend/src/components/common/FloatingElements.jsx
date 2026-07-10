import { motion } from 'framer-motion';

const particles = [
  { size: 4, x: '10%', y: '20%', delay: 0, color: 'bg-leaf-400/20' },
  { size: 6, x: '30%', y: '60%', delay: 1, color: 'bg-sunset-400/20' },
  { size: 3, x: '50%', y: '30%', delay: 2, color: 'bg-leaf-500/20' },
  { size: 5, x: '70%', y: '70%', delay: 0.5, color: 'bg-sprout-400/20' },
  { size: 4, x: '90%', y: '40%', delay: 1.5, color: 'bg-sunset-500/20' },
  { size: 7, x: '20%', y: '80%', delay: 0.8, color: 'bg-leaf-300/20' },
  { size: 3, x: '80%', y: '15%', delay: 2.5, color: 'bg-sprout-500/20' },
  { size: 5, x: '45%', y: '85%', delay: 1.2, color: 'bg-leaf-400/15' },
];

export default function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div key={i}
          className={`absolute rounded-full ${p.color}`}
          style={{ width: p.size * 4, height: p.size * 4, left: p.x, top: p.y }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6 + p.delay,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
