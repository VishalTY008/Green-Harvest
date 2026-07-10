import { motion } from 'framer-motion';

export default function Button({ children, variant = 'primary', href, onClick, className = '', type = 'button', disabled = false }) {
  const base = 'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 relative overflow-hidden group';

  const variants = {
    primary: 'bg-leaf-500 text-white hover:bg-leaf-600 hover:shadow-lg hover:shadow-leaf-500/30',
    secondary: 'border-2 border-leaf-500 text-leaf-600 dark:text-leaf-400 hover:bg-leaf-500 hover:text-white',
    ghost: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10',
    gradient: 'bg-gradient-to-r from-leaf-500 to-sunset-500 text-white hover:shadow-lg hover:shadow-leaf-500/30',
  };

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute inset-0 bg-white/20"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.5 }}
      />
    </>
  );

  if (href) {
    return <a href={href} className={`${base} ${variants[variant]} ${className}`}>{content}</a>;
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      type={type}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${base} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {content}
    </motion.button>
  );
}
