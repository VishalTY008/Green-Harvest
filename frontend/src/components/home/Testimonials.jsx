import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const defaultTestimonials = [
  { _id: '1', name: 'Rajesh Patel', role: 'Wheat Farmer, Punjab', content: 'GreenHarvest transformed our farm. Their premium seeds and expert guidance increased our yield by 40% in just one season. The soil health has improved dramatically.', rating: 5, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
  { _id: '2', name: 'Maria Garcia', role: 'Organic Farm Owner', content: 'The sustainability programs they offer are exceptional. We have successfully transitioned to fully organic farming with their support. Our produce is now certified organic.', rating: 5, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
  { _id: '3', name: 'John Kamau', role: 'Coffee Plantation Owner', content: 'Their irrigation solutions saved our farm during the drought season. The smart water management system optimized our water usage by 60%. Absolutely life-changing technology.', rating: 5, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150' },
  { _id: '4', name: 'Li Wei', role: 'Rice Farmer', content: 'Being part of the GreenHarvest community has been incredible. The training programs and market access they provide have doubled our income. Truly a partner in growth.', rating: 5, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' },
  { _id: '5', name: 'Sarah O\'Brien', role: 'Dairy & Crop Farmer', content: 'From soil testing to crop protection, every service is world-class. Their integrated approach to farming has made our operations more efficient and profitable.', rating: 5, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/testimonials');
        const data = await res.json();
        if (data.success && data.testimonials.length) setTestimonials(data.testimonials);
      } catch {}
    };
    fetchData();
  }, []);

  const next = useCallback(() => setCurrent((c) => (c + 1) % testimonials.length), [testimonials.length]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length), [testimonials.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-b from-transparent via-leaf-50/30 to-transparent dark:via-leaf-900/5">
      <div className="container-custom">
        <SectionTitle
          title="What Farmers Say"
          subtitle="Hear from the farming communities we've partnered with around the world."
        />

        <div className="relative max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl" style={{ minHeight: 300 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-center px-4 md:px-12 py-8"
              >
                <div className="flex justify-center mb-2">
                  {Array.from({ length: testimonials[current]?.rating || 5 }).map((_, i) => (
                    <FiStar key={i} className="text-sunset-500 fill-sunset-500" size={20} />
                  ))}
                </div>

                <p className="text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed italic mb-8 font-serif">
                  "{testimonials[current]?.content}"
                </p>

                <div className="flex items-center justify-center gap-4">
                  <img
                    src={testimonials[current]?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'}
                    alt={testimonials[current]?.name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-leaf-500/30"
                  />
                  <div className="text-left">
                    <p className="font-semibold">{testimonials[current]?.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonials[current]?.role}</p>
                  </div>
                </div>

                <div className="flex justify-center gap-2 mt-8">
                  {testimonials.map((_, i) => (
                    <button key={i} onClick={() => setCurrent(i)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i === current ? 'bg-leaf-500 w-6' : 'bg-gray-300 dark:bg-gray-700'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors">
            <FiChevronLeft />
          </button>
          <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors">
            <FiChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
