import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { NAV_LINKS } from '../../utils/constants';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { FiSun, FiMoon, FiPackage, FiEdit2 } from 'react-icons/fi';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, isAdmin } = useAuth();
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        scrolled
          ? 'glass shadow-lg border-gray-200/50 dark:border-white/10'
          : 'bg-white/90 dark:bg-earth-900/90 backdrop-blur-md border-gray-200/30 dark:border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-leaf-400 to-sprout-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="font-serif text-xl font-bold gradient-text">GreenHarvest</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <Link key={link.path} to={link.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative ${
                  pathname === link.path
                    ? 'text-leaf-600 dark:text-leaf-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-leaf-600 dark:hover:text-leaf-400'
                }`}
              >
                {link.name}
                {pathname === link.path && (
                  <motion.div layoutId="nav-indicator"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-leaf-500 rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <FiSun className="text-yellow-400" size={18} /> : <FiMoon size={18} />}
            </button>

            {user ? (
              <>
                <Link to="/write-blog"
                  className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full border border-leaf-500 text-leaf-600 dark:text-leaf-400 text-sm font-medium hover:bg-leaf-500 hover:text-white transition-colors"
                >
                  <FiEdit2 size={14} /> Write Blog
                </Link>
                <Link to="/my-products"
                  className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full border border-leaf-500 text-leaf-600 dark:text-leaf-400 text-sm font-medium hover:bg-leaf-500 hover:text-white transition-colors"
                >
                  <FiPackage size={14} /> My Products
                </Link>
                <Link to={isAdmin ? '/admin' : '/profile'}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-leaf-500 text-white text-sm font-medium hover:bg-leaf-600 transition-colors"
                >
                  {user.name?.split(' ')[0]}
                </Link>
              </>
            ) : (
              <Link to="/login"
                className="hidden sm:inline-flex px-5 py-2 rounded-full bg-earth-700 dark:bg-earth-600 text-white text-sm font-medium hover:bg-earth-800 transition-colors"
              >
                Sign In
              </Link>
            )}

            <button onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Open menu"
            >
              <HiMenu size={22} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-72 max-w-[80vw] glass shadow-2xl p-6">
              <div className="flex justify-end mb-8">
                <button onClick={() => setMobileOpen(false)} className="p-2 rounded-full hover:bg-white/10">
                  <HiX size={24} />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.div key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link to={link.path}
                      className={`block px-4 py-3 rounded-xl text-lg font-medium transition-colors ${
                        pathname === link.path
                          ? 'bg-leaf-500/20 text-leaf-600 dark:text-leaf-400'
                          : 'hover:bg-white/10'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                {user && (
                  <>
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: NAV_LINKS.length * 0.05 }}>
                      <Link to="/write-blog" className={`block px-4 py-3 rounded-xl text-lg font-medium transition-colors ${pathname === '/write-blog' ? 'bg-leaf-500/20 text-leaf-600 dark:text-leaf-400' : 'hover:bg-white/10'}`}>
                        Write Blog
                      </Link>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: (NAV_LINKS.length + 1) * 0.05 }}>
                      <Link to="/my-products" className={`block px-4 py-3 rounded-xl text-lg font-medium transition-colors ${pathname === '/my-products' ? 'bg-leaf-500/20 text-leaf-600 dark:text-leaf-400' : 'hover:bg-white/10'}`}>
                        My Products
                      </Link>
                    </motion.div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
