import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiTrash2 } from 'react-icons/fi';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try { const res = await fetch('/api/users', { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }); const data = await res.json(); if (data.success) setUsers(data.users); } catch {}
    };
    fetchUsers();
  }, []);

  const toggleRole = async (id, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    try {
      await fetch(`/api/users/${id}/role`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` }, body: JSON.stringify({ role: newRole }) });
      setUsers(users.map(u => u._id === id ? { ...u, role: newRole } : u));
    } catch {}
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this user?')) return;
    try { await fetch(`/api/users/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }); setUsers(users.filter(u => u._id !== id)); } catch {}
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="mb-6"><h1 className="font-serif text-2xl font-bold">Manage Users</h1><p className="text-gray-500 text-sm">{users.length} users</p></div>
      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-gray-200 dark:border-white/10">
            <th className="text-left p-4 font-medium">Name</th><th className="text-left p-4 font-medium">Email</th><th className="text-left p-4 font-medium">Role</th><th className="text-left p-4 font-medium">Joined</th><th className="text-right p-4 font-medium">Actions</th>
          </tr></thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5">
                <td className="p-4 font-medium">{user.name}</td>
                <td className="p-4 text-gray-500">{user.email}</td>
                <td className="p-4">
                  <button onClick={() => toggleRole(user._id, user.role)}
                    className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' : 'bg-gray-100 dark:bg-white/10 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {user.role}
                  </button>
                </td>
                <td className="p-4 text-gray-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="p-4 text-right">
                  <button onClick={() => handleDelete(user._id)} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-red-500"><FiTrash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
