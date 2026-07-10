import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../components/common/SectionTitle';
import { getImageUrl, formatDate, truncate } from '../utils/helpers';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/blogs');
        const data = await res.json();
        if (data.success) setPosts(data.blogs);
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
