import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../components/common/SectionTitle';
import { FiX } from 'react-icons/fi';

const images = [
  { id: 1, src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800', title: 'Golden Wheat Fields', category: 'landscape' },
  { id: 2, src: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800', title: 'Modern Irrigation', category: 'technology' },
  { id: 3, src: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800', title: 'Fresh Harvest', category: 'crops' },
  { id: 4, src: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800', title: 'Organic Farming', category: 'sustainability' },
  { id: 5, src: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800', title: 'Rice Paddies', category: 'landscape' },
  { id: 6, src: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=800', title: 'Ripe Mangoes', category: 'crops' },
  { id: 7, src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', title: 'Farmer Community', category: 'people' },
  { id: 8, src: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800', title: 'Smart Farming Tech', category: 'technology' },
  { id: 9, src: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800', title: 'Tomato Harvest', category: 'crops' },
];

const categories = ['all', 'landscape', 'crops', 'technology', 'sustainability', 'people'];

export default function Gallery() {
  const [active, setActive] = useState('all');
  const [lightbox, setLightbox] = useState(null);

  const filtered = active === 'all' ? images : images.filter(i => i.category === active);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-24">
      <Helmet><title>Gallery | GreenHarvest</title></Helmet>

      <section className="section-padding">
        <div className="container-custom">
          <SectionTitle title="Photo Gallery" subtitle="A visual journey through our agricultural world." />

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 capitalize ${
                  active === cat ? 'bg-leaf-500 text-white shadow-lg' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {filtered.map((img) => (
              <motion.div key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="break-inside-avoid mb-4 cursor-pointer group"
                onClick={() => setLightbox(img)}
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <img src={img.src} alt={img.title} className="w-full h-auto group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white font-medium">{img.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button onClick={() => setLightbox(null)} className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10">
              <FiX size={28} />
            </button>
            <motion.img
              key={lightbox.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={lightbox.src} alt={lightbox.title}
              className="max-w-[90vw] max-h-[85vh] rounded-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="absolute bottom-8 text-white/80 text-lg font-medium">{lightbox.title}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
