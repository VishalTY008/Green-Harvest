import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { FiMenu } from 'react-icons/fi';

import Sidebar from '../components/admin/Sidebar';
import Dashboard from '../components/admin/Dashboard';
import ManageCrops from '../components/admin/ManageCrops';
import ManageProducts from '../components/admin/ManageProducts';
import ManageBlogs from '../components/admin/ManageBlogs';
import ManageUsers from '../components/admin/ManageUsers';
import ManageInquiries from '../components/admin/ManageInquiries';
import Analytics from '../components/admin/Analytics';

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-earth-950">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:ml-64">
        <header className="sticky top-0 z-30 glass border-b border-gray-200 dark:border-white/10 px-6 py-3 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg">
            <FiMenu size={20} />
          </button>
          <h2 className="text-sm text-gray-500">Admin Panel</h2>
        </header>

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function Admin() {
  const { user, loading, isAdmin } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-2 border-leaf-500 border-t-transparent rounded-full" /></div>;

  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-0">
      <Helmet><title>Admin Panel | GreenHarvest</title></Helmet>

      <AdminLayout>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="crops" element={<ManageCrops />} />
          <Route path="products" element={<ManageProducts />} />
          <Route path="blogs" element={<ManageBlogs />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="inquiries" element={<ManageInquiries />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </AdminLayout>
    </motion.div>
  );
}
