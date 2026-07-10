import { Link, useLocation } from 'react-router-dom';
import { FiGrid, FiUsers, FiFileText, FiPackage, FiFeather, FiMessageSquare, FiBarChart2, FiLogOut, FiChevronLeft } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const links = [
  { to: '/admin', icon: FiGrid, label: 'Dashboard', exact: true },
  { to: '/admin/crops', icon: FiFeather, label: 'Crops' },
  { to: '/admin/products', icon: FiPackage, label: 'Products' },
  { to: '/admin/blogs', icon: FiFileText, label: 'Blogs' },
  { to: '/admin/inquiries', icon: FiMessageSquare, label: 'Inquiries' },
  { to: '/admin/users', icon: FiUsers, label: 'Users' },
  { to: '/admin/analytics', icon: FiBarChart2, label: 'Analytics' },
];

export default function Sidebar({ open, onClose }) {
  const { pathname } = useLocation();
  const { logout } = useAuth();

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}

      <aside className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-earth-900 border-r border-gray-200 dark:border-white/10 z-50 transform transition-transform duration-300 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-leaf-400 to-sprout-600 flex items-center justify-center text-white font-bold text-sm">G</div>
            <span className="font-serif font-bold">Admin</span>
          </Link>
          <button onClick={onClose} className="lg:hidden p-1 hover:bg-gray-100 dark:hover:bg-white/10 rounded">
            <FiChevronLeft />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {links.map(link => {
            const active = link.exact ? pathname === link.to : pathname.startsWith(link.to);
            return (
              <Link key={link.to} to={link.to}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active ? 'bg-leaf-500/10 text-leaf-600 dark:text-leaf-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
                }`}
              >
                <link.icon size={18} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-white/10">
          <Link to="/" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors mb-2">
            <FiChevronLeft size={18} />
            Back to Site
          </Link>
          <button onClick={logout} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full">
            <FiLogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
