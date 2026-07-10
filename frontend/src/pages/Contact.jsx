import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../components/common/SectionTitle';
import GlassCard from '../components/common/GlassCard';
import Button from '../components/common/Button';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend, FiCheck } from 'react-icons/fi';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) { setSubmitted(true); setForm({ name: '', email: '', subject: '', message: '' }); }
    } catch {} finally { setSending(false); }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-24">
      <Helmet><title>Contact Us | GreenHarvest</title></Helmet>

      <section className="section-padding">
        <div className="container-custom">
          <SectionTitle title="Get In Touch" subtitle="Have questions? We'd love to hear from you. Send us a message and we'll respond promptly." />

          <div className="grid lg:grid-cols-5 gap-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-4"
            >
              {[
                { icon: FiMapPin, label: 'Address', value: '123 Green Valley Road, Farmville, AG 54321' },
                { icon: FiPhone, label: 'Phone', value: '+1 (555) 123-4567' },
                { icon: FiMail, label: 'Email', value: 'hello@greenharvest.com' },
                { icon: FiClock, label: 'Hours', value: 'Mon-Fri: 8AM - 6PM' },
              ].map((item, i) => (
                <GlassCard key={item.label} delay={i * 0.1} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-leaf-100 dark:bg-leaf-900/50 flex items-center justify-center flex-shrink-0">
                    <item.icon className="text-leaf-600 dark:text-leaf-400 text-xl" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{item.label}</p>
                    <p className="font-medium text-sm">{item.value}</p>
                  </div>
                </GlassCard>
              ))}

              <div className="rounded-2xl overflow-hidden h-64 mt-4">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.966309591936!2d-73.98784368459375!3d40.74881797932727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1644262072565"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  title="Location"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <GlassCard>
                {submitted ? (
                  <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-leaf-100 dark:bg-leaf-900/50 flex items-center justify-center mx-auto mb-4">
                      <FiCheck className="text-leaf-500 text-3xl" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                    <p className="text-gray-500 text-sm mb-6">We'll get back to you within 24 hours.</p>
                    <Button variant="primary" onClick={() => setSubmitted(false)}>Send Another</Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Name</label>
                        <input type="text" name="name" value={form.name} onChange={handleChange} required
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-leaf-500 transition-colors"
                          placeholder="Your name" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Email</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} required
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-leaf-500 transition-colors"
                          placeholder="your@email.com" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Subject</label>
                      <input type="text" name="subject" value={form.subject} onChange={handleChange} required
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-leaf-500 transition-colors"
                        placeholder="How can we help?" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Message</label>
                      <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-leaf-500 transition-colors resize-none"
                        placeholder="Tell us more about your inquiry..." />
                    </div>
                    <Button type="submit" variant="gradient" disabled={sending} className="w-full">
                      {sending ? 'Sending...' : <><FiSend /> Send Message</>}
                    </Button>
                  </form>
                )}
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
