import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';
import GlassCard from '../common/GlassCard';
import Button from '../common/Button';
import { getImageUrl } from '../../utils/helpers';
import { PRODUCT_CATEGORIES } from '../../utils/constants';

const defaultProducts = [
  { _id: '1', name: 'Premium Wheat Seeds', price: 29.99, category: 'seeds', images: ['https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400'], description: 'High-yield wheat seeds', unit: 'kg' },
  { _id: '2', name: 'Organic Fertilizer', price: 19.99, category: 'fertilizers', images: ['https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=400'], description: 'Nutrient-rich organic compost', unit: 'kg' },
  { _id: '3', name: 'Drip Irrigation Kit', price: 89.99, category: 'equipment', images: ['https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400'], description: 'Complete drip irrigation system', unit: 'set' },
  { _id: '4', name: 'Neem Oil Pesticide', price: 14.99, category: 'pesticides', images: ['https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=400'], description: 'Natural pest control solution', unit: 'L' },
  { _id: '5', name: 'Organic Tomato Seeds', price: 4.99, category: 'seeds', images: ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400'], description: 'Heirloom tomato variety seeds', unit: 'pack' },
  { _id: '6', name: 'Soil Testing Kit', price: 24.99, category: 'equipment', images: ['https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=400'], description: 'Home soil analysis kit', unit: 'set' },
];

export default function ProductsShowcase() {
  const [products, setProducts] = useState(defaultProducts);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products?featured=true&limit=6');
        const data = await res.json();
        if (data.success && data.products.length) setProducts(data.products);
      } catch {}
    };
    fetchProducts();
  }, []);

  const filtered = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-custom">
        <SectionTitle
          title="Featured Products"
          subtitle="Shop our curated selection of premium agricultural products and equipment."
        />

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {[{ value: 'all', label: 'All' }, ...PRODUCT_CATEGORIES].map((cat) => (
            <button key={cat.value} onClick={() => setActiveCategory(cat.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.value
                  ? 'bg-leaf-500 text-white shadow-lg shadow-leaf-500/30'
                  : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.slice(0, 6).map((product, i) => (
              <GlassCard key={product._id} delay={i * 0.08} className="group">
                <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-4">
                  <motion.img
                    src={getImageUrl(product.images?.[0])}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-earth-800/90 text-xs font-medium text-leaf-600 dark:text-leaf-400">
                      ${product.price}/{product.unit}
                    </span>
                  </div>
                </div>
                <h3 className="font-semibold mb-1">{product.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold gradient-text">${product.price}</span>
                  <Button variant="ghost" className="text-xs px-3 py-1.5">
                    Add to Cart
                  </Button>
                </div>
              </GlassCard>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Button variant="secondary" href="/products">View All Products</Button>
        </motion.div>
      </div>
    </section>
  );
}
