import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import Button from '../common/Button';

export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', icon: 'leaf', image: '', features: '', order: '0', active: true });

  useEffect(() => { fetchServices(); }, []);

  const fetchServices = async () => {
    try { const res = await fetch('/api/services?all=true'); const data = await res.json(); if (data.success) setServices(data.services); } catch {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = edit ? `/api/services/${edit._id}` : '/api/services';
      const method = edit ? 'PUT' : 'POST';
      const body = { ...form, features: form.features.split(',').map(f => f.trim()).filter(Boolean), order: Number(form.order) };
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` }, body: JSON.stringify(body) });
      if (res.ok) { setShowForm(false); setEdit(null); setForm({ title: '', description: '', icon: 'leaf', image: '', features: '', order: '0', active: true }); fetchServices(); }
    } catch {}
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this service?')) return;
    try { await fetch(`/api/services/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }); fetchServices(); } catch {}
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="font-serif text-2xl font-bold">Manage Services</h1><p className="text-gray-500 text-sm">{services.length} services</p></div>
        <Button variant="primary" onClick={() => { setShowForm(!showForm); setEdit(null); setForm({ title: '', description: '', icon: 'leaf', image: '', features: '', order: '0', active: true }); }}>
          <FiPlus /> {showForm ? 'Cancel' : 'Add Service'}
        </Button>
      </div>

      {showForm && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="glass rounded-2xl p-6 mb-6">
          <h3 className="font-semibold mb-4">{edit ? 'Edit Service' : 'New Service'}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Title" required className="px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-leaf-500" />
              <input value={form.icon} onChange={e => setForm({...form, icon: e.target.value})} placeholder="Icon name (e.g. leaf, seed)" className="px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-leaf-500" />
            </div>
            <input value={form.image} onChange={e => setForm({...form, image: e.target.value})} placeholder="Image URL" className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-leaf-500" />
            <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Description" rows={3} required className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-leaf-500" />
            <input value={form.features} onChange={e => setForm({...form, features: e.target.value})} placeholder="Features (comma separated)" className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-leaf-500" />
            <div className="grid sm:grid-cols-3 gap-4">
              <input value={form.order} onChange={e => setForm({...form, order: e.target.value})} type="number" placeholder="Order" className="px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-leaf-500" />
              <label className="flex items-center gap-2 px-4"><input type="checkbox" checked={form.active} onChange={e => setForm({...form, active: e.target.checked})} /> Active</label>
            </div>
            <Button type="submit" variant="primary">{edit ? 'Update' : 'Create'} Service</Button>
          </form>
        </motion.div>
      )}

      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-gray-200 dark:border-white/10">
            <th className="text-left p-4 font-medium">Title</th><th className="text-left p-4 font-medium">Icon</th><th className="text-left p-4 font-medium">Order</th><th className="text-left p-4 font-medium">Active</th><th className="text-right p-4 font-medium">Actions</th>
          </tr></thead>
          <tbody>
            {services.map(service => (
              <tr key={service._id} className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5">
                <td className="p-4 font-medium max-w-[300px] truncate">{service.title}</td>
                <td className="p-4 text-gray-500">{service.icon}</td>
                <td className="p-4 text-gray-500">{service.order}</td>
                <td className="p-4">{service.active ? <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">Yes</span> : <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">No</span>}</td>
                <td className="p-4 text-right">
                  <button onClick={() => { setEdit(service); setForm({...service, features: service.features?.join(', ') || '', order: String(service.order)}); setShowForm(true); }} className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg"><FiEdit2 size={16} /></button>
                  <button onClick={() => handleDelete(service._id)} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-red-500"><FiTrash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
