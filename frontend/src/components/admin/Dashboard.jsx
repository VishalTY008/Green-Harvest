import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiFileText, FiPackage, FiMessageSquare } from 'react-icons/fi';

const statCards = [
  { label: 'Total Users', icon: FiUsers, color: 'bg-blue-500', endpoint: 'users' },
  { label: 'Blog Posts', icon: FiFileText, color: 'bg-purple-500', endpoint: 'blogs' },
  { label: 'Products', icon: FiPackage, color: 'bg-leaf-500', endpoint: 'products' },
  { label: 'Inquiries', icon: FiMessageSquare, color: 'bg-sunset-500', endpoint: 'contact' },
];

export default function Dashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const results = await Promise.all(
          statCards.map(async (card) => {
            const res = await fetch(`/api/${card.endpoint}`);
            const data = await res.json();
            return { label: card.label, count: data.count || data.total || 0, icon: card.icon, color: card.color };
          })
        );
        setStats(results);
      } catch {}
    };
    fetchStats();
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome to your admin dashboard</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {(Object.values(stats).length ? Object.values(stats) : statCards.map(s => ({ ...s, count: '...' }))).map((stat, i) => (
          <motion.div key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl ${stat.color} bg-opacity-20 flex items-center justify-center`}>
                <stat.icon className={`${stat.color.replace('bg-', 'text-')}`} size={20} />
              </div>
            </div>
            <p className="text-2xl font-bold">{stat.count}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-2xl p-6 mt-6">
        <h2 className="font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Add Crop', to: '/admin/crops' },
            { label: 'Add Product', to: '/admin/products' },
            { label: 'New Blog', to: '/admin/blogs' },
            { label: 'View Inquiries', to: '/admin/inquiries' },
          ].map(action => (
            <a key={action.label} href={action.to}
              className="px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 text-sm font-medium hover:bg-leaf-50 dark:hover:bg-leaf-900/20 hover:text-leaf-600 transition-colors text-center"
            >
              {action.label}
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
