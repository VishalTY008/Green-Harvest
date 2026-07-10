import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import Button from '../common/Button';

export default function ManageBlogs() {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({ title: '', content: '', excerpt: '', author: 'Admin', image: '', tags: '', published: false });

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    try { const res = await fetch('/api/blogs?published=true'); const data = await res.json(); if (data.success) setPosts(data.blogs); } catch {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = edit ? `/api/blogs/${edit._id}` : '/api/blogs';
      const method = edit ? 'PUT' : 'POST';
      const body = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) };
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` }, body: JSON.stringify(body) });
      if (res.ok) { setShowForm(false); setEdit(null); setForm({ title: '', content: '', excerpt: '', author: 'Admin', image: '', tags: '', published: false }); fetchPosts(); }
    } catch {}
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return;
    try { await fetch(`/api/blogs/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }); fetchPosts(); } catch {}
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="font-serif text-2xl font-bold">Manage Blogs</h1><p className="text-gray-500 text-sm">{posts.length} posts</p></div>
        <Button variant="primary" onClick={() => { setShowForm(!showForm); setEdit(null); setForm({ title: '', content: '', excerpt: '', author: 'Admin', image: '', tags: '', published: false }); }}>
          <FiPlus /> {showForm ? 'Cancel' : 'New Post'}
        </Button>
      </div>

      {showForm && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="glass rounded-2xl p-6 mb-6">
          <h3 className="font-semibold mb-4">{edit ? 'Edit Post' : 'New Post'}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Title" required className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 focus:outline-none focus:border-leaf-500" />
            <div className="grid sm:grid-cols-2 gap-4">
              <input value={form.author} onChange={e => setForm({...form, author: e.target.value})} placeholder="Author" className="px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 focus:outline-none focus:border-leaf-500" />
              <input value={form.image} onChange={e => setForm({...form, image: e.target.value})} placeholder="Image URL" className="px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 focus:outline-none focus:border-leaf-500" />
            </div>
            <input value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} placeholder="Tags (comma separated)" className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 focus:outline-none focus:border-leaf-500" />
            <textarea value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} placeholder="Excerpt" rows={2} required className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 focus:outline-none focus:border-leaf-500" />
            <textarea value={form.content} onChange={e => setForm({...form, content: e.target.value})} placeholder="Content" rows={6} required className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 focus:outline-none focus:border-leaf-500" />
            <label className="flex items-center gap-2"><input type="checkbox" checked={form.published} onChange={e => setForm({...form, published: e.target.checked})} /> Published</label>
            <Button type="submit" variant="primary">{edit ? 'Update' : 'Publish'} Post</Button>
          </form>
        </motion.div>
      )}

      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-gray-200">
            <th className="text-left p-4 font-medium">Title</th><th className="text-left p-4 font-medium">Author</th><th className="text-left p-4 font-medium">Status</th><th className="text-right p-4 font-medium">Actions</th>
          </tr></thead>
          <tbody>
            {posts.map(post => (
              <tr key={post._id} className="border-b border-gray-100 hover:bg-gray-50 dark:hover:bg-white/5">
                <td className="p-4 font-medium max-w-[300px] truncate">{post.title}</td>
                <td className="p-4 text-gray-500">{post.author}</td>
                <td className="p-4">{post.published ? <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">Published</span> : <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">Draft</span>}</td>
                <td className="p-4 text-right">
                  <button onClick={() => { setEdit(post); setForm({...post, tags: post.tags?.join(', ') || ''}); setShowForm(true); }} className="p-2 hover:bg-gray-100 rounded-lg"><FiEdit2 size={16} /></button>
                  <button onClick={() => handleDelete(post._id)} className="p-2 hover:bg-red-50 rounded-lg text-red-500"><FiTrash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
