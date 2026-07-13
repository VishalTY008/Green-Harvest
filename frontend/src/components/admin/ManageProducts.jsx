import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import Button from '../common/Button';
import ImageUpload from '../common/ImageUpload';

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', category: 'seeds', description: '', images: [''], stock: '', unit: 'kg', featured: false });

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try { const res = await fetch('/api/products?limit=100'); const data = await res.json(); if (data.success) setProducts(data.products); } catch {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = edit ? `/api/products/${edit._id}` : '/api/products';
      const method = edit ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` }, body: JSON.stringify({ ...form, price: Number(form.price), stock: Number(form.stock) }) });
      if (res.ok) { setShowForm(false); setEdit(null); setForm({ name: '', price: '', category: 'seeds', description: '', images: [''], stock: '', unit: 'kg', featured: false }); fetchProducts(); }
    } catch {}
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    try { await fetch(`/api/products/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }); fetchProducts(); } catch {}
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="font-serif text-2xl font-bold">Manage Products</h1><p className="text-gray-500 text-sm">{products.length} products</p></div>
        <Button variant="primary" onClick={() => { setShowForm(!showForm); setEdit(null); setForm({ name: '', price: '', category: 'seeds', description: '', images: [''], stock: '', unit: 'kg', featured: false }); }}>
          <FiPlus /> {showForm ? 'Cancel' : 'Add Product'}
        </Button>
      </div>

      {showForm && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="glass rounded-2xl p-6 mb-6">
          <h3 className="font-semibold mb-4">{edit ? 'Edit Product' : 'New Product'}</h3>
          <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
            <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Product name" required className="px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 focus:outline-none focus:border-leaf-500" />
            <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 focus:outline-none focus:border-leaf-500">
              <option value="seeds">Seeds</option><option value="fertilizers">Fertilizers</option><option value="equipment">Equipment</option><option value="pesticides">Pesticides</option><option value="organic">Organic</option><option value="other">Other</option>
            </select>
            <input value={form.price} onChange={e => setForm({...form, price: e.target.value})} type="number" step="0.01" placeholder="Price" required className="px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 focus:outline-none focus:border-leaf-500" />
            <input value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} type="number" placeholder="Stock" required className="px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 focus:outline-none focus:border-leaf-500" />
            <div className="col-span-2"><ImageUpload value={form.images[0]} onChange={url => setForm({...form, images: [url]})} /></div>
            <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Description" rows={3} required className="px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 focus:outline-none focus:border-leaf-500 col-span-2" />
            <div className="col-span-2"><Button type="submit" variant="primary">{edit ? 'Update' : 'Create'} Product</Button></div>
          </form>
        </motion.div>
      )}

      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-gray-200">
            <th className="text-left p-4 font-medium">Name</th><th className="text-left p-4 font-medium">Category</th><th className="text-left p-4 font-medium">Price</th><th className="text-left p-4 font-medium">Stock</th><th className="text-right p-4 font-medium">Actions</th>
          </tr></thead>
          <tbody>
            {products.map(p => (
              <tr key={p._id} className="border-b border-gray-100 hover:bg-gray-50 dark:hover:bg-white/5">
                <td className="p-4 font-medium">{p.name}</td>
                <td className="p-4 text-gray-500 capitalize">{p.category}</td>
                <td className="p-4 text-gray-500">${p.price}</td>
                <td className="p-4">{p.stock > 0 ? <span className="text-green-600">{p.stock}</span> : <span className="text-red-500">Out</span>}</td>
                <td className="p-4 text-right">
                  <button onClick={() => { setEdit(p); setForm({...p, price: String(p.price), stock: String(p.stock)}); setShowForm(true); }} className="p-2 hover:bg-gray-100 rounded-lg"><FiEdit2 size={16} /></button>
                  <button onClick={() => handleDelete(p._id)} className="p-2 hover:bg-red-50 rounded-lg text-red-500"><FiTrash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
