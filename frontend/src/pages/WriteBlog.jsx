import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FiEdit2, FiTrash2, FiArrowLeft, FiSend, FiBookOpen } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import ImageUpload from '../components/common/ImageUpload';
import Button from '../components/common/Button';
import SectionTitle from '../components/common/SectionTitle';

const emptyForm = { title: '', content: '', excerpt: '', image: '', tags: '' };

export default function WriteBlog() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('write');

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    fetchMyBlogs();
  }, [user, navigate]);

  const fetchMyBlogs = async () => {
    try {
      const res = await fetch('/api/blogs/my', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const data = await res.json();
      if (data.success) setMyBlogs(data.blogs);
    } catch {} finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    try {
      const body = {
        ...form,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      };
      const url = editing ? `/api/blogs/user/${editing._id}` : '/api/blogs/user';
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.success) {
        setMessage(editing ? 'Blog updated!' : 'Blog submitted for review!');
        setForm(emptyForm);
        setEditing(null);
        setActiveTab('my-blogs');
        fetchMyBlogs();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(data.message || 'Something went wrong');
      }
    } catch { setMessage('Failed to submit'); }
    finally { setSubmitting(false); }
  };

  const handleEdit = (blog) => {
    setEditing(blog);
    setForm({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt,
      image: blog.image || '',
      tags: blog.tags?.join(', ') || '',
    });
    setActiveTab('write');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this blog?')) return;
    try {
      await fetch(`/api/blogs/user/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setMyBlogs(prev => prev.filter(b => b._id !== id));
    } catch {}
  };

  const inputClass = 'w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-leaf-500 transition-colors text-sm';

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Helmet><title>Write Blog | GreenHarvest</title></Helmet>

      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <SectionTitle title="Write a Blog" subtitle="Share your agricultural knowledge and experiences with the community." />

          {message && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className={`mb-6 px-4 py-3 rounded-xl text-sm font-medium ${
                message.includes('Failed') || message.includes('wrong')
                  ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                  : 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
              }`}
            >{message}</motion.div>
          )}

          <div className="flex gap-2 mb-8">
            <button onClick={() => { setActiveTab('write'); setEditing(null); setForm(emptyForm); }}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeTab === 'write'
                  ? 'bg-leaf-500 text-white shadow-lg shadow-leaf-500/30'
                  : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'
              }`}
            >
              <FiEdit2 className="inline mr-1.5" size={14} /> {editing ? 'Edit Blog' : 'Write New'}
            </button>
            <button onClick={() => setActiveTab('my-blogs')}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeTab === 'my-blogs'
                  ? 'bg-leaf-500 text-white shadow-lg shadow-leaf-500/30'
                  : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'
              }`}
            >
              <FiBookOpen className="inline mr-1.5" size={14} /> My Blogs ({myBlogs.length})
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'write' ? (
              <motion.div key="write" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                {editing && (
                  <button onClick={() => { setEditing(null); setForm(emptyForm); }}
                    className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-leaf-600 mb-4 transition-colors"
                  >
                    <FiArrowLeft size={14} /> Cancel editing
                  </button>
                )}

                <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 md:p-8 space-y-5">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Title *</label>
                    <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                      placeholder="Enter your blog title" required className={inputClass} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">Cover Image</label>
                    <ImageUpload value={form.image} onChange={url => setForm({ ...form, image: url })} />
                    {!form.image && (
                      <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })}
                        placeholder="Or paste image URL" className={`${inputClass} mt-2`} />
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">Excerpt * <span className="text-gray-400 font-normal">(max 300 chars)</span></label>
                    <textarea value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })}
                      placeholder="A brief summary of your blog..." rows={2} required maxLength={300}
                      className={inputClass} />
                    <p className="text-xs text-gray-400 mt-1 text-right">{form.excerpt.length}/300</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">Content *</label>
                    <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })}
                      placeholder="Write your blog content here... (Use blank lines for paragraph breaks)" rows={12} required
                      className={`${inputClass} font-mono text-sm leading-relaxed`} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">Tags</label>
                    <input value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })}
                      placeholder="farming, organic, tips (comma separated)" className={inputClass} />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <Button type="submit" variant="primary" disabled={submitting}>
                      <FiSend size={16} /> {submitting ? 'Submitting...' : editing ? 'Update Blog' : 'Submit for Review'}
                    </Button>
                    {editing && (
                      <Button variant="ghost" onClick={() => { setEditing(null); setForm(emptyForm); }}>
                        Cancel
                      </Button>
                    )}
                  </div>

                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    Your blog will be reviewed by an admin before publishing.
                  </p>
                </form>
              </motion.div>
            ) : (
              <motion.div key="my-blogs" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                {loading ? (
                  <div className="space-y-4">
                    {[1, 2].map(i => (
                      <div key={i} className="animate-pulse glass rounded-2xl p-6">
                        <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mb-3" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3 mb-2" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4" />
                      </div>
                    ))}
                  </div>
                ) : myBlogs.length === 0 ? (
                  <div className="glass rounded-2xl p-12 text-center">
                    <FiBookOpen size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                    <h3 className="font-serif text-xl font-semibold mb-2">No blogs yet</h3>
                    <p className="text-gray-500 text-sm mb-6">Start writing your first blog to share with the community!</p>
                    <Button variant="primary" onClick={() => setActiveTab('write')}>
                      <FiEdit2 size={16} /> Write Your First Blog
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {myBlogs.map((blog, i) => (
                      <motion.div key={blog._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="glass rounded-2xl p-5 md:p-6"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1.5">
                              <h3 className="font-serif font-semibold truncate">{blog.title}</h3>
                              {blog.published ? (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 shrink-0">Published</span>
                              ) : (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400 shrink-0">Under Review</span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500 mb-2 line-clamp-2">{blog.excerpt}</p>
                            {blog.tags?.length > 0 && (
                              <div className="flex flex-wrap gap-1.5">
                                {blog.tags.map(tag => (
                                  <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500">{tag}</span>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="flex gap-1 shrink-0">
                            <button onClick={() => handleEdit(blog)}
                              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 hover:text-leaf-600 transition-colors"
                              title="Edit"
                            ><FiEdit2 size={16} /></button>
                            <button onClick={() => handleDelete(blog._id)}
                              className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 text-gray-500 hover:text-red-500 transition-colors"
                              title="Delete"
                            ><FiTrash2 size={16} /></button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </motion.div>
  );
}
