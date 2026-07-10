export const truncate = (str, len = 100) =>
  str?.length > len ? str.substring(0, len) + '...' : str;

export const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export const slugify = (str) =>
  str?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const classNames = (...classes) => classes.filter(Boolean).join(' ');

export const getImageUrl = (path) => {
  if (!path) return 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800';
  if (path.startsWith('http')) return path;
  return path;
};
