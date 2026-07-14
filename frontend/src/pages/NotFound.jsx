import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Button from '../components/common/Button';

export default function NotFound() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen flex items-center justify-center px-4">
      <Helmet><title>404 - Not Found | GreenHarvest</title></Helmet>

      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="text-8xl md:text-9xl font-bold gradient-text mb-4"
        >
          404
        </motion.div>
        <h2 className="font-serif text-2xl md:text-3xl font-bold mb-3">Page Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <Link to="/">
          <Button variant="primary">Back to Homepage</Button>
        </Link>
      </div>
    </motion.div>
  );
}
