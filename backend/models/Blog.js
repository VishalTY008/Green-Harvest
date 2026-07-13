const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title required'], trim: true },
  slug: { type: String, unique: true },
  content: { type: String, required: true },
  excerpt: { type: String, required: true, maxlength: 300 },
  author: { type: String, default: 'Admin' },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  image: { type: String, required: true },
  tags: [{ type: String }],
  published: { type: Boolean, default: false },
  readTime: { type: String, default: '5 min' },
}, { timestamps: true });

blogSchema.pre('save', function (next) {
  this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  if (this.isNew) {
    const Blog = mongoose.model('Blog');
    Blog.countDocuments({ slug: this.slug }).then(count => {
      if (count > 0) this.slug += `-${Date.now()}`;
      next();
    }).catch(next);
  } else {
    next();
  }
});

module.exports = mongoose.model('Blog', blogSchema);
