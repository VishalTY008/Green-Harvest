import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';
import { FiFeather, FiSun, FiCloud, FiUsers } from 'react-icons/fi';

const initiatives = [
  { icon: FiFeather, title: 'Organic Farming', desc: 'Promoting chemical-free farming practices for healthier soil and produce.' },
  { icon: FiSun, title: 'Solar Irrigation', desc: 'Harnessing solar energy for sustainable water management systems.' },
  { icon: FiCloud, title: 'Carbon Neutral', desc: 'Our farms sequester more carbon than they emit through regenerative practices.' },
  { icon: FiUsers, title: 'Farmer Education', desc: 'Training programs on sustainable practices reaching 10,000+ farmers annually.' },
];

export default function Sustainability() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="text-xs uppercase tracking-widest text-leaf-600 dark:text-leaf-400 font-semibold">Sustainability</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-6">
              Committed to a <span className="gradient-text">Greener Future</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              We believe in nurturing the land that feeds us. Our sustainability initiatives focus on regenerative agriculture, water conservation, renewable energy, and empowering farming communities for generations to come.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {initiatives.map((item, i) => (
                <motion.div key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-leaf-100 dark:bg-leaf-900/50 flex items-center justify-center flex-shrink-0 mt-1">
                    <item.icon className="text-leaf-600 dark:text-leaf-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{item.title}</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button variant="primary" href="/about">Discover Our Impact</Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800"
                alt="Sustainable farming"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-leaf-900/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass rounded-2xl p-4">
                  <p className="text-white text-sm font-medium">"We don't inherit the earth from our ancestors; we borrow it from our children."</p>
                  <p className="text-white/60 text-xs mt-2">— Native American Proverb</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-leaf-500/20 rounded-full blur-2xl" />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-sunset-500/20 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
