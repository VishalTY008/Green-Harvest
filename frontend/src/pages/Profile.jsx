import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="pt-32 text-center">
        <p className="text-gray-500">Please sign in to view your profile.</p>
        <Link to="/login" className="text-leaf-500 mt-4 inline-block">Sign In</Link>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-24">
      <Helmet><title>Profile | GreenHarvest</title></Helmet>
      <section className="section-padding">
        <div className="container-custom max-w-2xl">
          <div className="glass rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-leaf-400 to-sprout-600 flex items-center justify-center text-white text-2xl font-bold">
                {user.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div>
                <h1 className="font-serif text-2xl font-bold">{user.name}</h1>
                <p className="text-gray-500">{user.email}</p>
                <span className="text-xs px-2 py-1 rounded-full bg-leaf-100 dark:bg-leaf-900/50 text-leaf-600 dark:text-leaf-400 capitalize">{user.role}</span>
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-white/10 pt-6 space-y-4">
              <div><span className="text-sm text-gray-500">Role</span><p className="font-medium capitalize">{user.role}</p></div>
              <div><span className="text-sm text-gray-500">Email</span><p className="font-medium">{user.email}</p></div>
              {user.phone && <div><span className="text-sm text-gray-500">Phone</span><p className="font-medium">{user.phone}</p></div>}
            </div>
            <button onClick={logout}
              className="mt-8 w-full px-5 py-2.5 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
