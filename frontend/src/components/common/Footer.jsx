import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiArrowUp } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { NAV_LINKS } from '../../utils/constants';

const footerLinks = [
  { title: 'Quick Links', links: NAV_LINKS.slice(0, 5) },
  {
    title: 'Services',
    links: [
      { name: 'Crop Consulting', path: '/services' },
      { name: 'Soil Testing', path: '/services' },
      { name: 'Irrigation Solutions', path: '/services' },
      { name: 'Organic Farming', path: '/services' },
    ],
  },
  {
    title: 'Support',
    links: [
      { name: 'Help Center', path: '/faq' },
      { name: 'Privacy Policy', path: '#' },
      { name: 'Terms of Service', path: '#' },
      { name: 'Shipping Info', path: '#' },
    ],
  },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

const childVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Footer() {
  const scrollToTop = () => window.scrollTo(0, 0);

  return (
    <footer className="relative bg-earth-900 dark:bg-black text-white overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-leaf-500 via-sunset-500 to-leaf-500 bg-300% animate-gradient" />

      <svg className="absolute top-0 left-0 w-full h-16 md:h-24 -mt-1" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z" fill="rgb(var(--color-bg))" className="transition-colors duration-500" />
      </svg>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <motion.div variants={childVariant} className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-leaf-400 to-sprout-600 flex items-center justify-center text-white font-bold">G</div>
              <span className="font-serif text-2xl font-bold text-white">GreenHarvest</span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
              Cultivating a sustainable future through innovative agricultural solutions.
              We connect farmers with the best resources, knowledge, and technology.
            </p>
            <div className="flex gap-3">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-leaf-500 transition-colors duration-300">
                  <Icon />
                </a>
              ))}
            </div>
          </motion.div>

          {footerLinks.map((col) => (
            <motion.div key={col.title} variants={childVariant}>
              <h3 className="font-serif text-lg font-semibold mb-4 text-white">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-gray-400 hover:text-leaf-400 transition-colors duration-300 text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div variants={childVariant} className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} GreenHarvest. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1"><FiMapPin /> Farmville, USA</span>
            <span className="flex items-center gap-1"><FiPhone /> +1 (555) 123-4567</span>
            <span className="flex items-center gap-1"><FiMail /> hello@greenharvest.com</span>
          </div>
        </motion.div>
      </motion.div>

      <button onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-leaf-500 text-white flex items-center justify-center shadow-lg hover:bg-leaf-600 transition-colors z-40"
        aria-label="Scroll to top"
      >
        <FiArrowUp />
      </button>
    </footer>
  );
}
