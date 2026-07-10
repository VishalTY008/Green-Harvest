import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';
import { getImageUrl, formatDate, truncate } from '../../utils/helpers';

const defaultPosts = [
  { _id: '1', title: 'Sustainable Farming Practices for 2024', slug: 'sustainable-farming-2024', excerpt: 'Discover the latest sustainable farming techniques that are transforming agriculture and protecting our planet for future generations.', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600', author: 'Dr. Sarah Green', createdAt: '2024-01-15', tags: ['sustainability'] },
  { _id: '2', title: 'The Future of Smart Irrigation', slug: 'future-smart-irrigation', excerpt: 'How AI and IoT are revolutionizing water management in agriculture, reducing waste while maximizing crop yields.', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600', author: 'Mike Rivers', createdAt: '2024-01-10', tags: ['technology'] },
  { _id: '3', title: 'Organic Certification Guide', slug: 'organic-certification-guide', excerpt: 'A comprehensive step-by-step guide to getting your farm organic certified and accessing premium markets.', image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600', author: 'Emma Thompson', createdAt: '2024-01-05', tags: ['organic'] },
];

export default function BlogSection() {
  const [posts, setPosts] = useState(defaultPosts);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/blogs?limit=3');
        const data = await res.json();
        if (data.success && data.blogs.length) setPosts(data.blogs);
      } catch {}
    };
    fetchPosts();
  }, []);

  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-b from-transparent via-sunset-50/30 to-transparent dark:via-sunset-900/5">
      <div className="container-custom">
        <SectionTitle
          title="Latest Insights"
          subtitle="Stay informed with the latest in agricultural technology, sustainable practices, and farming tips."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article key={post._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group"
            >
              <Link to={`/blog/${post.slug}`}>
                <div className="relative overflow-hidden rounded-2xl aspect-[16/10] mb-4">
                  <img
                    src={getImageUrl(post.image)}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {post.tags?.[0] && (
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 dark:bg-earth-800/90 text-xs font-medium text-leaf-600 dark:text-leaf-400">
                      {post.tags[0]}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{formatDate(post.createdAt)}</p>
                <h3 className="font-serif text-lg font-semibold mb-2 group-hover:text-leaf-600 dark:group-hover:text-leaf-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{truncate(post.excerpt, 100)}</p>
                <div className="flex items-center gap-2 mt-4 text-xs text-leaf-600 dark:text-leaf-400 font-medium">
                  <span>Read More</span>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Button variant="primary" href="/blog">View All Articles</Button>
        </motion.div>
      </div>
    </section>
  );
}
