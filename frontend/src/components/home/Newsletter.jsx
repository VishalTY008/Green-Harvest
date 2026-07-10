import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../common/Button';
import { FiSend, FiCheck } from 'react-icons/fi';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-leaf-800 via-sprout-800 to-earth-800" />
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sunset-500 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-leaf-400 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-white/60 text-sm tracking-widest uppercase">Stay Connected</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mt-3 mb-4">
            Join Our Growing Community
          </h2>
          <p className="text-white/70 mb-8 max-w-md mx-auto">
            Subscribe to our newsletter and receive the latest agricultural insights, product updates, and exclusive offers.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="flex-1 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-leaf-400 transition-colors"
              />
            </div>
            <Button type="submit" variant="gradient" className="px-8">
              {subscribed ? <><FiCheck /> Subscribed</> : <><FiSend /> Subscribe</>}
            </Button>
          </form>

          <p className="text-white/40 text-xs mt-4">No spam. Unsubscribe anytime.</p>
        </motion.div>
      </div>
    </section>
  );
}
