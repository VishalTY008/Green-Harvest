import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}
      className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none ${
        theme === 'dark' ? 'bg-leaf-900' : 'bg-sunset-200'
      } ${className}`}
      aria-label="Toggle theme"
    >
      <motion.div
        animate={{ x: theme === 'dark' ? 28 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="absolute top-1 left-0 w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center"
      >
        {theme === 'dark' ? <FiSun size={12} className="text-yellow-500" /> : <FiMoon size={12} className="text-earth-600" />}
      </motion.div>
    </button>
  );
}
