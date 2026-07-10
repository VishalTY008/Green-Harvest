import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import Button from '../common/Button';

export default function ManageCrops() {
  const [crops, setCrops] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({ name: '', category: 'cereals', description: '', image: '', season: '', featured: false });

  useEffect(() => { fetchCrops(); }, []);

  const fetchCrops = async () => {
    try { const res = await fetch('/api/crops?all=true'); const data = await res.json(); if (data.success) setCrops(data.crops); } catch {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = edit ? `/api/crops/${edit._id}` : '/api/crops';
      const method = edit ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` }, body: JSON.stringify(form) });
      if (res.ok) { setShowForm(false); setEdit(null); setForm({ name: '', category: 'cereals', description: '', image: '', season: '', featured: false }); fetchCrops(); }
    } catch {}
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this crop?')) return;
    try { await fetch(`/api/crops/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }); fetchCrops(); } catch {}
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold">Manage Crops</h1>
          <p className="text-gray-500 text-sm">{crops.length} crops</p>
        </div>
        <Button variant="primary" onClick={() => { setShowForm(!showForm); setEdit(null); setForm({ name: '', category: 'cereals', description: '', image: '', season: '', featured: false }); }}>
          <FiPlus /> {showForm ? 'Cancel' : 'Add Crop'}
        </Button>
      </div>

      {showForm && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="glass rounded-2xl p-6 mb-6">
          <h3 className="font-semibold mb-4">{edit ? 'Edit Crop' : 'New Crop'}</h3>
          <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
            <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Crop name" required className="px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-leaf-500" />
            <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-leaf-500">
              <option value="cereals">Cereals</option><option value="vegetables">Vegetables</option><option value="fruits">Fruits</option><option value="pulses">Pulses</option><option value="oilseeds">Oilseeds</option><option value="cash-crops">Cash Crops</option>
            </select>
            <input value={form.image} onChange={e => setForm({...form, image: e.target.value})} placeholder="Image URL" required className="px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-leaf-500 col-span-2" />
            <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Description" required rows={3} className="px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-leaf-500 col-span-2" />
            <input value={form.season} onChange={e => setForm({...form, season: e.target.value})} placeholder="Season" className="px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-leaf-500" />
            <label className="flex items-center gap-2"><input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} /> Featured</label>
            <div className="col-span-2"><Button type="submit" variant="primary">{edit ? 'Update' : 'Create'} Crop</Button></div>
          </form>
        </motion.div>
      )}

      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-gray-200 dark:border-white/10">
            <th className="text-left p-4 font-medium">Name</th><th className="text-left p-4 font-medium">Category</th><th className="text-left p-4 font-medium">Season</th><th className="text-left p-4 font-medium">Featured</th><th className="text-right p-4 font-medium">Actions</th>
          </tr></thead>
          <tbody>
            {crops.map(crop => (
              <tr key={crop._id} className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5">
                <td className="p-4 font-medium">{crop.name}</td>
                <td className="p-4 text-gray-500 capitalize">{crop.category}</td>
                <td className="p-4 text-gray-500">{crop.season}</td>
                <td className="p-4">{crop.featured ? <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">Yes</span> : 'No'}</td>
                <td className="p-4 text-right">
                  <button onClick={() => { setEdit(crop); setForm(crop); setShowForm(true); }} className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg"><FiEdit2 size={16} /></button>
                  <button onClick={() => handleDelete(crop._id)} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-red-500"><FiTrash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
