import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import Button from '../common/Button';

export default function ManageTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({ name: '', role: 'Farmer', content: '', avatar: '', rating: '5', featured: false, order: '0' });

  useEffect(() => { fetchTestimonials(); }, []);

  const fetchTestimonials = async () => {
    try { const res = await fetch('/api/testimonials?all=true'); const data = await res.json(); if (data.success) setTestimonials(data.testimonials); } catch {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = edit ? `/api/testimonials/${edit._id}` : '/api/testimonials';
      const method = edit ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` }, body: JSON.stringify({ ...form, rating: Number(form.rating), order: Number(form.order) }) });
      if (res.ok) { setShowForm(false); setEdit(null); setForm({ name: '', role: 'Farmer', content: '', avatar: '', rating: '5', featured: false, order: '0' }); fetchTestimonials(); }
    } catch {}
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this testimonial?')) return;
    try { await fetch(`/api/testimonials/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }); fetchTestimonials(); } catch {}
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="font-serif text-2xl font-bold">Manage Testimonials</h1><p className="text-gray-500 text-sm">{testimonials.length} testimonials</p></div>
        <Button variant="primary" onClick={() => { setShowForm(!showForm); setEdit(null); setForm({ name: '', role: 'Farmer', content: '', avatar: '', rating: '5', featured: false, order: '0' }); }}>
          <FiPlus /> {showForm ? 'Cancel' : 'Add Testimonial'}
        </Button>
      </div>

      {showForm && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="glass rounded-2xl p-6 mb-6">
          <h3 className="font-semibold mb-4">{edit ? 'Edit Testimonial' : 'New Testimonial'}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Name" required className="px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-leaf-500" />
              <input value={form.role} onChange={e => setForm({...form, role: e.target.value})} placeholder="Role (e.g. Farmer, Agronomist)" className="px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-leaf-500" />
            </div>
            <input value={form.avatar} onChange={e => setForm({...form, avatar: e.target.value})} placeholder="Avatar URL" className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-leaf-500" />
            <textarea value={form.content} onChange={e => setForm({...form, content: e.target.value})} placeholder="Testimonial content" rows={4} required className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-leaf-500" />
            <div className="grid sm:grid-cols-3 gap-4">
              <select value={form.rating} onChange={e => setForm({...form, rating: e.target.value})} className="px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-leaf-500">
                <option value="5">5 Stars</option><option value="4">4 Stars</option><option value="3">3 Stars</option><option value="2">2 Stars</option><option value="1">1 Star</option>
              </select>
              <input value={form.order} onChange={e => setForm({...form, order: e.target.value})} type="number" placeholder="Order" className="px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-leaf-500" />
              <label className="flex items-center gap-2 px-4"><input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} /> Featured</label>
            </div>
            <Button type="submit" variant="primary">{edit ? 'Update' : 'Create'} Testimonial</Button>
          </form>
        </motion.div>
      )}

      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-gray-200 dark:border-white/10">
            <th className="text-left p-4 font-medium">Name</th><th className="text-left p-4 font-medium">Role</th><th className="text-left p-4 font-medium">Rating</th><th className="text-left p-4 font-medium">Featured</th><th className="text-right p-4 font-medium">Actions</th>
          </tr></thead>
          <tbody>
            {testimonials.map(t => (
              <tr key={t._id} className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5">
                <td className="p-4 font-medium max-w-[200px] truncate">{t.name}</td>
                <td className="p-4 text-gray-500">{t.role}</td>
                <td className="p-4 text-gray-500">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</td>
                <td className="p-4">{t.featured ? <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">Yes</span> : 'No'}</td>
                <td className="p-4 text-right">
                  <button onClick={() => { setEdit(t); setForm({...t, rating: String(t.rating), order: String(t.order)}); setShowForm(true); }} className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg"><FiEdit2 size={16} /></button>
                  <button onClick={() => handleDelete(t._id)} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-red-500"><FiTrash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
