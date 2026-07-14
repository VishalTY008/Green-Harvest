import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2, FiPackage } from 'react-icons/fi';
import Button from '../components/common/Button';
import ImageUpload from '../components/common/ImageUpload';
import { useAuth } from '../context/AuthContext';
import { PRODUCT_CATEGORIES } from '../utils/constants';

export default function MyProducts() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [edit, setEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', price: '', category: 'seeds', description: '', images: [''], stock: '', unit: 'kg' });
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/my-products', { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
      const data = await res.json();
      if (data.success) setProducts(data.products);
    } catch {} finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });
    try {
      const url = edit ? `/api/my-products/${edit._id}` : '/api/my-products';
      const method = edit ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ ...form, price: Number(form.price), stock: Number(form.stock) })
      });
      const data = await res.json();
      if (res.ok) {
        setShowForm(false);
        setEdit(null);
        setForm({ name: '', price: '', category: 'seeds', description: '', images: [''], stock: '', unit: 'kg' });
        setMessage({ text: edit ? 'Product updated!' : 'Product created!', type: 'success' });
        fetchProducts();
      } else {
        setMessage({ text: data.message || 'Something went wrong', type: 'error' });
      }
    } catch {
      setMessage({ text: 'Failed to save product', type: 'error' });
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    try {
      await fetch(`/api/my-products/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
      setProducts(prev => prev.filter(p => p._id !== id));
      setMessage({ text: 'Product deleted', type: 'success' });
    } catch {
      setMessage({ text: 'Failed to delete product', type: 'error' });
    }
  };

  const startEdit = (product) => {
    setEdit(product);
    setForm({ name: product.name, price: String(product.price), category: product.category, description: product.description, images: product.images?.length ? product.images : [''], stock: String(product.stock), unit: product.unit });
    setShowForm(true);
    setMessage({ text: '', type: '' });
  };

  const resetForm = () => {
    setShowForm(false);
    setEdit(null);
    setForm({ name: '', price: '', category: 'seeds', description: '', images: [''], stock: '', unit: 'kg' });
    setMessage({ text: '', type: '' });
  };

  if (!user) {
    return (
      <div className="pt-32 text-center">
        <p className="text-gray-500">Please sign in to manage your products.</p>
        <Link to="/login" className="text-leaf-500 mt-4 inline-block">Sign In</Link>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Helmet><title>My Products | GreenHarvest</title></Helmet>
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-serif text-2xl font-bold">My Products</h1>
              <p className="text-gray-500 text-sm">{products.length} products listed</p>
            </div>
            <Button variant="primary" onClick={() => { resetForm(); setShowForm(!showForm); }}>
              <FiPlus /> {showForm ? 'Cancel' : 'Add Product'}
            </Button>
          </div>

          {message.text && (
            <div className={`mb-4 px-4 py-3 rounded-xl text-sm font-medium ${message.type === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
              {message.text}
            </div>
          )}

          {showForm && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="glass rounded-2xl p-6 mb-6">
              <h3 className="font-semibold mb-4">{edit ? 'Edit Product' : 'List a New Product'}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Product name" required className="px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-leaf-500" />
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-leaf-500">
                    {PRODUCT_CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <input value={form.price} onChange={e => setForm({...form, price: e.target.value})} type="number" step="0.01" placeholder="Price" required className="px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-leaf-500" />
                  <input value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} type="number" placeholder="Stock quantity" required className="px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-leaf-500" />
                  <select value={form.unit} onChange={e => setForm({...form, unit: e.target.value})} className="px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-leaf-500">
                    <option value="kg">kg</option><option value="L">L</option><option value="pack">pack</option><option value="set">set</option><option value="piece">piece</option>
                  </select>
                </div>
                <ImageUpload value={form.images[0]} onChange={url => setForm({...form, images: [url]})} className="sm:col-span-2" />
                <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Product description" rows={3} required className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-leaf-500" />
                <Button type="submit" variant="primary">{edit ? 'Update' : 'Create'} Product</Button>
              </form>
            </motion.div>
          )}

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3].map(i => <div key={i} className="animate-pulse glass rounded-2xl p-4"><div className="bg-gray-200 dark:bg-gray-800 rounded-xl aspect-[4/3] mb-4" /><div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2 mb-2" /><div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4" /></div>)}
            </div>
          ) : products.length === 0 ? (
            <div className="glass rounded-2xl p-12 text-center">
              <FiPackage className="mx-auto text-4xl text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="font-semibold text-lg mb-2">No products yet</h3>
              <p className="text-gray-500 mb-4">Start selling by adding your first product.</p>
              <Button variant="primary" onClick={() => setShowForm(true)}><FiPlus /> Add Your First Product</Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, i) => (
                <motion.div key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass rounded-2xl overflow-hidden group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {product.images?.[0] ? (
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-gray-100 dark:bg-white/5 flex items-center justify-center"><FiPackage className="text-3xl text-gray-300" /></div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        product.status === 'active' ? 'bg-green-100 text-green-700' :
                        product.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {product.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1 truncate">{product.name}</h3>
                    <p className="text-sm text-gray-500 capitalize mb-2">{product.category}</p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold gradient-text">${product.price}/{product.unit}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700'}`}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => startEdit(product)} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gray-100 dark:bg-white/5 text-sm font-medium hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                        <FiEdit2 size={14} /> Edit
                      </button>
                      <button onClick={() => handleDelete(product._id)} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500 text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors">
                        <FiTrash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
