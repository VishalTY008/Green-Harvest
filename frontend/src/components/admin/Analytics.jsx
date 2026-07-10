import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Analytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch('/api/analytics/dashboard', { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
        const result = await res.json();
        if (result.success) setData(result.dashboard);
      } catch {}
    };
    fetchAnalytics();
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="mb-6"><h1 className="font-serif text-2xl font-bold">Analytics</h1><p className="text-gray-500 text-sm">Page views and engagement metrics</p></div>

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div className="glass rounded-2xl p-6">
          <p className="text-sm text-gray-500">Total Page Views</p>
          <p className="text-3xl font-bold mt-1">{data?.totalViews || 0}</p>
        </div>
        <div className="glass rounded-2xl p-6">
          <p className="text-sm text-gray-500">Top Pages</p>
          <p className="text-3xl font-bold mt-1">{data?.pageViews?.length || 0}</p>
        </div>
        <div className="glass rounded-2xl p-6">
          <p className="text-sm text-gray-500">Days Tracked</p>
          <p className="text-3xl font-bold mt-1">{data?.dailyViews?.length || 0}</p>
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <h3 className="font-semibold mb-4">Page Views (Last 30 Days)</h3>
        {data?.pageViews?.length ? (
          <div className="space-y-3">
            {data.pageViews.slice(0, 10).map((pv, i) => (
              <div key={pv._id} className="flex items-center gap-4">
                <span className="text-sm text-gray-500 w-8">{i + 1}.</span>
                <span className="text-sm font-medium flex-1 capitalize">{pv._id}</span>
                <div className="flex-1 max-w-[200px]">
                  <div className="h-2 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((pv.totalViews / Math.max(...data.pageViews.map(p => p.totalViews))) * 100, 100)}%` }}
                      transition={{ duration: 0.8, delay: i * 0.05 }}
                      className="h-full rounded-full bg-gradient-to-r from-leaf-500 to-sunset-500"
                    />
                  </div>
                </div>
                <span className="text-sm font-semibold w-16 text-right">{pv.totalViews}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No analytics data yet. Start browsing the site!</p>
        )}
      </div>
    </motion.div>
  );
}
