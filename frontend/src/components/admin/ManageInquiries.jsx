import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiTrash2, FiMail } from 'react-icons/fi';

export default function ManageInquiries() {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try { const res = await fetch('/api/contact', { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }); const data = await res.json(); if (data.success) setInquiries(data.inquiries); } catch {}
    };
    fetch();
  }, []);

  const markRead = async (id) => {
    try { await fetch(`/api/contact/${id}/read`, { method: 'PUT', headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }); setInquiries(inquiries.map(i => i._id === id ? { ...i, isRead: true } : i)); } catch {}
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this inquiry?')) return;
    try { await fetch(`/api/contact/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }); setInquiries(inquiries.filter(i => i._id !== id)); } catch {}
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="mb-6"><h1 className="font-serif text-2xl font-bold">Inquiries</h1><p className="text-gray-500 text-sm">{inquiries.filter(i => !i.isRead).length} unread</p></div>
      <div className="space-y-3">
        {inquiries.map(inquiry => (
          <div key={inquiry._id} className={`glass rounded-2xl p-5 transition-all ${!inquiry.isRead ? 'ring-1 ring-leaf-500/30' : ''}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold">{inquiry.name}</h3>
                  {!inquiry.isRead && <span className="w-2 h-2 rounded-full bg-leaf-500 animate-pulse" />}
                </div>
                <p className="text-xs text-gray-500 mb-1">{inquiry.email} · {new Date(inquiry.createdAt).toLocaleString()}</p>
                <p className="text-sm font-medium text-leaf-600 dark:text-leaf-400 mb-2">{inquiry.subject}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{inquiry.message}</p>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                {!inquiry.isRead && (
                  <button onClick={() => markRead(inquiry._id)} className="p-2 hover:bg-leaf-50 dark:hover:bg-leaf-900/20 rounded-lg text-leaf-600" title="Mark as read">
                    <FiMail size={16} />
                  </button>
                )}
                <button onClick={() => handleDelete(inquiry._id)} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-red-500">
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {!inquiries.length && <p className="text-center text-gray-500 py-8">No inquiries yet.</p>}
      </div>
    </motion.div>
  );
}
