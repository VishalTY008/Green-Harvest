import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { formatDate, getImageUrl } from '../utils/helpers';
import Button from '../components/common/Button';
import { FiArrowLeft } from 'react-icons/fi';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/blogs/slug/${slug}`);
        const data = await res.json();
        if (data.success) setPost(data.blog);
      } catch {} finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) return <div className="pt-32 text-center"><div className="animate-spin w-8 h-8 border-2 border-leaf-500 border-t-transparent rounded-full mx-auto" /></div>;

  if (!post) return (
    <div className="pt-32 text-center">
      <p className="text-gray-500">Post not found</p>
      <Link to="/blog" className="text-leaf-500 mt-4 inline-block">Back to blog</Link>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-24">
      <Helmet><title>{post.title} | GreenHarvest</title></Helmet>

      <article className="section-padding">
        <div className="container-custom max-w-4xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-leaf-600 mb-8 transition-colors">
            <FiArrowLeft /> Back to Blog
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              {post.tags?.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-leaf-100 dark:bg-leaf-900/50 text-xs font-medium text-leaf-600 dark:text-leaf-400">{tag}</span>
              ))}
              <span className="text-xs text-gray-500">{formatDate(post.createdAt)}</span>
              <span className="text-xs text-gray-500">· {post.readTime}</span>
            </div>

            <h1 className="font-serif text-3xl md:text-5xl font-bold mb-6">{post.title}</h1>
            <p className="text-lg text-gray-500 mb-8">By {post.author}</p>

            <div className="rounded-3xl overflow-hidden mb-10 aspect-[2/1]">
              <img src={getImageUrl(post.image)} alt={post.title} className="w-full h-full object-cover" />
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              {post.content?.split('\n').map((p, i) => (
                <p key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{p}</p>
              ))}
            </div>
          </motion.div>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-white/10">
            <Button variant="secondary" href="/blog">More Articles</Button>
          </div>
        </div>
      </article>
    </motion.div>
  );
}
