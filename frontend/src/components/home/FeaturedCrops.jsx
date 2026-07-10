import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';
import GlassCard from '../common/GlassCard';
import { getImageUrl } from '../../utils/helpers';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const defaultCrops = [
  { _id: '1', name: 'Golden Wheat', category: 'cereals', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600', description: 'Premium quality wheat variety with high yield and disease resistance.' },
  { _id: '2', name: 'Organic Rice', category: 'cereals', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600', description: 'Naturally grown rice with superior grain quality and nutrition.' },
  { _id: '3', name: 'Fresh Corn', category: 'cereals', image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600', description: 'Sweet corn varieties optimized for both fresh and processing markets.' },
  { _id: '4', name: 'Juicy Tomatoes', category: 'vegetables', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600', description: 'Hybrid tomato seeds producing firm, flavorful fruits.' },
  { _id: '5', name: 'Green Spinach', category: 'vegetables', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600', description: 'Fast-growing spinach varieties rich in iron and vitamins.' },
  { _id: '6', name: 'Ripe Mangoes', category: 'fruits', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600', description: 'Exotic mango varieties known for sweetness and aroma.' },
];

export default function FeaturedCrops() {
  const [crops, setCrops] = useState(defaultCrops);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const res = await fetch('/api/crops?featured=true&limit=6');
        const data = await res.json();
        if (data.success && data.crops.length) setCrops(data.crops);
      } catch {}
    };
    fetchCrops();
  }, []);

  const slideVariants = {
    enter: (d) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  const next = () => { setDirection(1); setCurrent((c) => (c + 1) % crops.length); };
  const prev = () => { setDirection(-1); setCurrent((c) => (c - 1 + crops.length) % crops.length); };

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-custom">
        <SectionTitle
          title="Featured Crops"
          subtitle="Discover our premium selection of high-yield, disease-resistant crop varieties cultivated for optimal growth."
        />

        <div className="relative">
          <div className="flex justify-center mb-8 gap-2">
            {crops.slice(0, 5).map((_, i) => (
              <button key={i} onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === current ? 'bg-leaf-500 w-8' : 'bg-gray-300 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>

          <div className="relative overflow-hidden rounded-2xl" style={{ minHeight: 400 }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="grid md:grid-cols-2 gap-8 items-center"
              >
                <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
                  <motion.img
                    src={getImageUrl(crops[current]?.image)}
                    alt={crops[current]?.name}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.3 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-leaf-600 dark:text-leaf-400 font-semibold">
                    {crops[current]?.category}
                  </span>
                  <h3 className="font-serif text-3xl md:text-4xl font-bold mt-2 mb-4">
                    {crops[current]?.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    {crops[current]?.description}
                  </p>
                  <GlassCard className="inline-block">
                    <p className="text-sm text-leaf-600 dark:text-leaf-400 font-semibold">
                      {crops[current]?.season || 'All Season'} &bull; High Yield
                    </p>
                  </GlassCard>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors z-10">
            <FiChevronLeft size={20} />
          </button>
          <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors z-10">
            <FiChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-12">
          {crops.slice(0, 6).map((crop, i) => (
            <motion.button key={crop._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              className={`relative rounded-xl overflow-hidden aspect-square group cursor-pointer ${
                i === current ? 'ring-2 ring-leaf-500' : ''
              }`}
            >
              <img src={getImageUrl(crop.image)} alt={crop.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
                <span className="text-white text-xs font-medium">{crop.name}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
