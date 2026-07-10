import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../components/common/SectionTitle';
import GlassCard from '../components/common/GlassCard';
import { getImageUrl } from '../utils/helpers';
import { PRODUCT_CATEGORIES } from '../utils/constants';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data.success) setProducts(data.products);
      } catch {} finally { setLoading(false); }
    };
    fetchProducts();
  }, []);

  const filtered = activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-24">
      <Helmet><title>Products | GreenHarvest</title></Helmet>

      <section className="section-padding">
        <div className="container-custom">
          <SectionTitle title="Our Products" subtitle="Premium agricultural products to help your farm thrive." />

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <button onClick={() => setActiveCategory('all')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === 'all' ? 'bg-leaf-500 text-white shadow-lg' : 'bg-gray-100 dark:bg-white/5 text-gray-600 hover:bg-gray-200'}`}
            >All</button>
            {PRODUCT_CATEGORIES.map(cat => (
              <button key={cat.value} onClick={() => setActiveCategory(cat.value)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all capitalize ${activeCategory === cat.value ? 'bg-leaf-500 text-white shadow-lg' : 'bg-gray-100 dark:bg-white/5 text-gray-600 hover:bg-gray-200'}`}
              >{cat.label}</button>
            ))}
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3].map(i => <div key={i} className="animate-pulse"><div className="bg-gray-200 dark:bg-gray-800 rounded-2xl aspect-[4/3] mb-4" /><div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2 mb-2" /><div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4" /></div>)}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div key={activeCategory} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((product, i) => (
                  <GlassCard key={product._id} delay={i * 0.05} className="group">
                    <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-4">
                      <img src={getImageUrl(product.images?.[0])} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 dark:bg-earth-800/90 text-xs font-medium text-leaf-600">{product.category}</div>
                    </div>
                    <h3 className="font-semibold mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold gradient-text">${product.price}/{product.unit}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700'}`}>
                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </GlassCard>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>
    </motion.div>
  );
}
