import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../components/common/SectionTitle';
import { getImageUrl, formatDate, truncate } from '../utils/helpers';

const defaultPosts = [
  { _id: '1', title: 'Sustainable Farming Practices for 2024', slug: 'sustainable-farming-2024', excerpt: 'Discover the latest sustainable farming techniques that are transforming agriculture and protecting our planet for future generations.', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600', author: 'Dr. Sarah Green', createdAt: '2024-01-15', readTime: '5 min', tags: ['sustainability'] },
  { _id: '2', title: 'The Future of Smart Irrigation', slug: 'future-smart-irrigation', excerpt: 'How AI and IoT are revolutionizing water management in agriculture, reducing waste while maximizing crop yields.', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600', author: 'Mike Rivers', createdAt: '2024-01-10', readTime: '7 min', tags: ['technology'] },
  { _id: '3', title: 'Organic Certification Guide', slug: 'organic-certification-guide', excerpt: 'A comprehensive step-by-step guide to getting your farm organic certified and accessing premium markets.', image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600', author: 'Emma Thompson', createdAt: '2024-01-05', readTime: '10 min', tags: ['organic'] },
  { _id: '4', title: 'Crop Rotation Benefits Explained', slug: 'crop-rotation-benefits', excerpt: 'Learn how rotating crops can improve soil health, reduce pests, and increase your overall farm productivity naturally.', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600', author: 'Dr. James Lee', createdAt: '2024-01-03', readTime: '6 min', tags: ['farming'] },
  { _id: '5', title: 'Water Conservation in Agriculture', slug: 'water-conservation-agriculture', excerpt: 'Essential strategies for conserving water on your farm while maintaining healthy and productive crops throughout the season.', image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=600', author: 'Maria Santos', createdAt: '2023-12-28', readTime: '8 min', tags: ['sustainability'] },
  { _id: '6', title: 'Introduction to Hydroponics', slug: 'introduction-hydroponics', excerpt: 'Getting started with soilless farming. A beginner-friendly guide to setting up your first hydroponic system at home.', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600', author: 'Tom Chen', createdAt: '2023-12-20', readTime: '12 min', tags: ['technology'] },
];

export default function Blog() {
  const [posts, setPosts] = useState(defaultPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/blogs?limit=50');
        const data = await res.json();
        if (data.success && data.blogs.length) setPosts(data.blogs);
      } catch {} finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24">
      <Helmet><title>Blog | GreenHarvest</title></Helmet>

      <section className="section-padding">
        <div className="container-custom">
          <SectionTitle title="Our Blog" subtitle="Insights, guides, and stories from the world of agriculture." />

          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl aspect-[16/10] mb-4" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mb-2" />
                  <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <motion.article key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="group"
                >
                  <Link to={`/blog/${post.slug}`}>
                    <div className="relative overflow-hidden rounded-2xl aspect-[16/10] mb-4">
                      <img src={getImageUrl(post.image)} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      {post.tags?.[0] && (
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 text-xs font-medium text-leaf-600">{post.tags[0]}</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{formatDate(post.createdAt)} · {post.readTime}</p>
                    <h3 className="font-serif text-lg font-semibold mb-2 group-hover:text-leaf-600 transition-colors">{post.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{truncate(post.excerpt, 120)}</p>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
