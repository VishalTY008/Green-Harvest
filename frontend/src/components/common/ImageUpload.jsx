import { useState, useRef } from 'react';
import { FiUpload, FiX, FiImage, FiLoader } from 'react-icons/fi';

export default function ImageUpload({ value, onChange, multiple = false, className = '' }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setError('File too large (max 5MB)'); return; }
    if (!file.type.startsWith('image/')) { setError('Only images allowed'); return; }

    setError('');
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        if (multiple) {
          onChange([...(value || []), data.url]);
        } else {
          onChange(data.url);
        }
      } else {
        setError(data.message || 'Upload failed');
      }
    } catch {
      setError('Upload failed');
    } finally { setUploading(false); }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const removeImage = (index) => {
    if (multiple) {
      onChange(value.filter((_, i) => i !== index));
    } else {
      onChange('');
    }
  };

  const images = multiple ? (value || []) : (value ? [value] : []);

  return (
    <div className={className}>
      <div
        onDragOver={e => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors ${
          error ? 'border-red-400 bg-red-50 dark:bg-red-900/10' : 'border-gray-300 dark:border-white/10 hover:border-leaf-400 dark:hover:border-leaf-500'
        }`}
      >
        <input ref={inputRef} type="file" accept="image/*" className="hidden"
          onChange={e => handleFile(e.target.files[0])} />
        {uploading ? (
          <div className="flex items-center justify-center gap-2 py-2 text-sm text-gray-500">
            <FiLoader className="animate-spin" /> Uploading...
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 py-2 text-sm text-gray-500">
            <FiUpload size={18} />
            <span>Click or drag image here</span>
          </div>
        )}
      </div>

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}

      {images.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-3">
          {images.map((img, i) => (
            <div key={i} className="relative group w-20 h-20 rounded-lg overflow-hidden border border-gray-200 dark:border-white/10">
              <img src={img} alt="" className="w-full h-full object-cover" />
              <button onClick={(e) => { e.stopPropagation(); removeImage(i); }}
                className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <FiX className="text-white" size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {!multiple && !value && images.length === 0 && (
        <p className="text-xs text-gray-400 mt-1">Or paste a URL below</p>
      )}
    </div>
  );
}
