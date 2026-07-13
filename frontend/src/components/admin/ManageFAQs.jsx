import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import Button from '../common/Button';

export default function ManageFAQs() {
  const [faqs, setFaqs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({ question: '', answer: '', category: 'general', order: '0', active: true });

  useEffect(() => { fetchFaqs(); }, []);

  const fetchFaqs = async () => {
    try { const res = await fetch('/api/faq?all=true'); const data = await res.json(); if (data.success) setFaqs(data.faqs); } catch {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = edit ? `/api/faq/${edit._id}` : '/api/faq';
      const method = edit ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` }, body: JSON.stringify({ ...form, order: Number(form.order) }) });
      if (res.ok) { setShowForm(false); setEdit(null); setForm({ question: '', answer: '', category: 'general', order: '0', active: true }); fetchFaqs(); }
    } catch {}
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this FAQ?')) return;
    try { await fetch(`/api/faq/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }); fetchFaqs(); } catch {}
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="font-serif text-2xl font-bold">Manage FAQs</h1><p className="text-gray-500 text-sm">{faqs.length} FAQs</p></div>
        <Button variant="primary" onClick={() => { setShowForm(!showForm); setEdit(null); setForm({ question: '', answer: '', category: 'general', order: '0', active: true }); }}>
          <FiPlus /> {showForm ? 'Cancel' : 'Add FAQ'}
        </Button>
      </div>

      {showForm && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="glass rounded-2xl p-6 mb-6">
          <h3 className="font-semibold mb-4">{edit ? 'Edit FAQ' : 'New FAQ'}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input value={form.question} onChange={e => setForm({...form, question: e.target.value})} placeholder="Question" required className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-leaf-500" />
            <textarea value={form.answer} onChange={e => setForm({...form, answer: e.target.value})} placeholder="Answer" rows={4} required className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-leaf-500" />
            <div className="grid sm:grid-cols-3 gap-4">
              <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-leaf-500">
                <option value="general">General</option><option value="farming">Farming</option><option value="products">Products</option><option value="services">Services</option><option value="shipping">Shipping</option>
              </select>
              <input value={form.order} onChange={e => setForm({...form, order: e.target.value})} type="number" placeholder="Order" className="px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-leaf-500" />
              <label className="flex items-center gap-2 px-4"><input type="checkbox" checked={form.active} onChange={e => setForm({...form, active: e.target.checked})} /> Active</label>
            </div>
            <Button type="submit" variant="primary">{edit ? 'Update' : 'Create'} FAQ</Button>
          </form>
        </motion.div>
      )}

      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-gray-200 dark:border-white/10">
            <th className="text-left p-4 font-medium">Question</th><th className="text-left p-4 font-medium">Category</th><th className="text-left p-4 font-medium">Order</th><th className="text-left p-4 font-medium">Active</th><th className="text-right p-4 font-medium">Actions</th>
          </tr></thead>
          <tbody>
            {faqs.map(faq => (
              <tr key={faq._id} className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5">
                <td className="p-4 font-medium max-w-[300px] truncate">{faq.question}</td>
                <td className="p-4 text-gray-500 capitalize">{faq.category}</td>
                <td className="p-4 text-gray-500">{faq.order}</td>
                <td className="p-4">{faq.active ? <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">Yes</span> : <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">No</span>}</td>
                <td className="p-4 text-right">
                  <button onClick={() => { setEdit(faq); setForm({...faq, order: String(faq.order)}); setShowForm(true); }} className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg"><FiEdit2 size={16} /></button>
                  <button onClick={() => handleDelete(faq._id)} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-red-500"><FiTrash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
