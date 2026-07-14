import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../components/common/SectionTitle';
import GlassCard from '../components/common/GlassCard';
import { FiChevronDown } from 'react-icons/fi';

const defaultFaqs = [
  { _id: '1', question: 'What types of seeds do you offer?', answer: 'We offer a wide variety of seeds including cereals, vegetables, fruits, and pulses. All our seeds are tested for quality and have high germination rates.', category: 'products', order: 1 },
  { _id: '2', question: 'Do you provide farming consultation?', answer: 'Yes, we offer expert farming consultation services. Our agronomists can help with crop selection, soil management, irrigation planning, and pest control strategies.', category: 'services', order: 2 },
  { _id: '3', question: 'What is your shipping policy?', answer: 'We ship nationwide with delivery within 3-5 business days. Orders over $50 qualify for free shipping. We use eco-friendly packaging materials.', category: 'shipping', order: 3 },
  { _id: '4', question: 'How can I become a partner farmer?', answer: 'Simply contact us through our website or visit our nearest center. We will evaluate your farm and create a customized partnership plan that benefits both parties.', category: 'general', order: 4 },
  { _id: '5', question: 'What sustainable practices do you promote?', answer: 'We promote organic farming, water conservation through drip irrigation, solar-powered farm equipment, crop rotation, natural pest management, and soil health improvement.', category: 'farming', order: 5 },
  { _id: '6', question: 'Do you offer training programs?', answer: 'Yes, we conduct regular workshops and training programs on modern farming techniques, sustainable practices, and business management for farmers.', category: 'services', order: 6 },
];

export default function FAQ() {
  const [faqs, setFaqs] = useState(defaultFaqs);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch('/api/faq');
        const data = await res.json();
        if (data.success && data.faqs.length) setFaqs(data.faqs);
      } catch {}
    };
    fetchFaqs();
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Helmet><title>FAQ | GreenHarvest</title></Helmet>

      <section className="section-padding">
        <div className="container-custom max-w-3xl">
          <SectionTitle title="Frequently Asked Questions" subtitle="Find answers to common questions about our products, services, and farming practices." />

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={faq._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <GlassCard className={`cursor-pointer transition-all duration-300 ${openId === faq._id ? 'ring-1 ring-leaf-500/30' : ''}`}
                  onClick={() => setOpenId(openId === faq._id ? null : faq._id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-leaf-100 dark:bg-leaf-900/50 flex items-center justify-center text-xs font-medium text-leaf-600 dark:text-leaf-400">{faq.order}</span>
                      <h3 className="font-medium text-sm md:text-base">{faq.question}</h3>
                    </div>
                    <motion.div animate={{ rotate: openId === faq._id ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <FiChevronDown className="text-gray-400" />
                    </motion.div>
                  </div>
                  <AnimatePresence>
                    {openId === faq._id && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mt-4 pt-4 border-t border-gray-200 dark:border-white/10">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
