import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FiEdit2, FiLock, FiMail, FiPhone, FiMapPin, FiMessageSquare, FiUser, FiCheck, FiX } from 'react-icons/fi';
import Button from '../components/common/Button';

export default function Profile() {
  const { user, logout, updateProfile, updatePassword } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [editForm, setEditForm] = useState({ name: '', phone: '', address: '' });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [inquiries, setInquiries] = useState([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    if (user) {
      setEditForm({ name: user.name || '', phone: user.phone || '', address: user.address || '' });
    }
  }, [user]);

  useEffect(() => {
    if (user && activeTab === 'inquiries') {
      fetch('/api/contact?all=true', { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
        .then(r => r.json())
        .then(d => { if (d.success) setInquiries(d.inquiries.filter(i => i.email === user.email)); })
        .catch(() => {});
    }
  }, [user, activeTab]);

  if (!user) {
    return (
      <div className="pt-32 text-center">
        <p className="text-gray-500">Please sign in to view your profile.</p>
        <Link to="/login" className="text-leaf-500 mt-4 inline-block">Sign In</Link>
      </div>
    );
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: '', type: '' });
    try {
      await updateProfile(editForm);
      setMessage({ text: 'Profile updated successfully!', type: 'success' });
    } catch (err) {
      setMessage({ text: err.response?.data?.message || 'Failed to update profile', type: 'error' });
    } finally { setSaving(false); }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage({ text: 'New passwords do not match', type: 'error' });
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setMessage({ text: 'Password must be at least 6 characters', type: 'error' });
      return;
    }
    setSaving(true);
    setMessage({ text: '', type: '' });
    try {
      await updatePassword(passwordForm.currentPassword, passwordForm.newPassword);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setMessage({ text: 'Password changed successfully!', type: 'success' });
    } catch (err) {
      setMessage({ text: err.response?.data?.message || 'Failed to change password', type: 'error' });
    } finally { setSaving(false); }
  };

  const deleteInquiry = async (id) => {
    if (!confirm('Delete this inquiry?')) return;
    try {
      await fetch(`/api/contact/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
      setInquiries(prev => prev.filter(i => i._id !== id));
    } catch {}
  };

  const tabs = [
    { id: 'profile', label: 'Edit Profile', icon: FiEdit2 },
    { id: 'password', label: 'Change Password', icon: FiLock },
    { id: 'inquiries', label: 'My Inquiries', icon: FiMessageSquare },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-24">
      <Helmet><title>Profile | GreenHarvest</title></Helmet>
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <div className="glass rounded-2xl p-8 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-leaf-400 to-sprout-600 flex items-center justify-center text-white text-2xl font-bold shrink-0">
                {user.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="flex-1">
                <h1 className="font-serif text-2xl font-bold">{user.name}</h1>
                <p className="text-gray-500">{user.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs px-2 py-1 rounded-full bg-leaf-100 dark:bg-leaf-900/50 text-leaf-600 dark:text-leaf-400 capitalize">{user.role}</span>
                  {user.phone && <span className="text-xs text-gray-400">| {user.phone}</span>}
                  {user.address && <span className="text-xs text-gray-400">| {user.address}</span>}
                </div>
              </div>
              <button onClick={logout} className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors shrink-0">
                Sign Out
              </button>
            </div>
          </div>

          {message.text && (
            <div className={`mb-4 px-4 py-3 rounded-xl text-sm font-medium ${message.type === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
              {message.text}
            </div>
          )}

          <div className="flex gap-2 mb-6 overflow-x-auto">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => { setActiveTab(tab.id); setMessage({ text: '', type: '' }); }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id ? 'bg-leaf-500 text-white shadow-lg shadow-leaf-500/30' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'
                }`}>
                <tab.icon size={16} /> {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6">
              <h2 className="font-serif text-xl font-bold mb-6">Edit Profile</h2>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5"><FiUser className="inline mr-1" /> Full Name</label>
                  <input value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} required
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-leaf-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5"><FiMail className="inline mr-1" /> Email</label>
                  <input value={user.email} disabled
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-500 cursor-not-allowed" />
                  <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5"><FiPhone className="inline mr-1" /> Phone</label>
                  <input value={editForm.phone} onChange={e => setEditForm({...editForm, phone: e.target.value})} placeholder="Enter your phone number"
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-leaf-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5"><FiMapPin className="inline mr-1" /> Address</label>
                  <textarea value={editForm.address} onChange={e => setEditForm({...editForm, address: e.target.value})} placeholder="Enter your address" rows={3}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-leaf-500" />
                </div>
                <Button type="submit" variant="primary" disabled={saving}>
                  <FiCheck /> {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </form>
            </motion.div>
          )}

          {activeTab === 'password' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6">
              <h2 className="font-serif text-xl font-bold mb-6">Change Password</h2>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Current Password</label>
                  <input type="password" value={passwordForm.currentPassword} onChange={e => setPasswordForm({...passwordForm, currentPassword: e.target.value})} required
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-leaf-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">New Password</label>
                  <input type="password" value={passwordForm.newPassword} onChange={e => setPasswordForm({...passwordForm, newPassword: e.target.value})} required minLength={6}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-leaf-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Confirm New Password</label>
                  <input type="password" value={passwordForm.confirmPassword} onChange={e => setPasswordForm({...passwordForm, confirmPassword: e.target.value})} required minLength={6}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-leaf-500" />
                </div>
                <Button type="submit" variant="primary" disabled={saving}>
                  <FiLock /> {saving ? 'Changing...' : 'Change Password'}
                </Button>
              </form>
            </motion.div>
          )}

          {activeTab === 'inquiries' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <h2 className="font-serif text-xl font-bold">My Inquiries</h2>
              {inquiries.length === 0 ? (
                <div className="glass rounded-2xl p-8 text-center">
                  <FiMessageSquare className="mx-auto text-3xl text-gray-300 dark:text-gray-600 mb-3" />
                  <p className="text-gray-500">You haven't submitted any inquiries yet.</p>
                  <Link to="/contact" className="text-leaf-500 text-sm mt-2 inline-block hover:underline">Contact Us</Link>
                </div>
              ) : (
                inquiries.map(inq => (
                  <div key={inq._id} className="glass rounded-2xl p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold">{inq.subject}</h3>
                        <p className="text-sm text-gray-500 mt-1">{inq.message}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                          <span>{new Date(inq.createdAt).toLocaleDateString()}</span>
                          <span className={`px-2 py-0.5 rounded-full ${inq.isRead ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                            {inq.isRead ? 'Read' : 'Pending'}
                          </span>
                        </div>
                      </div>
                      <button onClick={() => deleteInquiry(inq._id)} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-red-500 shrink-0">
                        <FiX size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
