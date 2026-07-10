import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';
import GlassCard from '../common/GlassCard';
import { FiDroplet, FiSun, FiTruck, FiShield, FiTrendingUp, FiBookOpen } from 'react-icons/fi';

const services = [
  { icon: FiDroplet, title: 'Irrigation Solutions', description: 'Smart water management systems for optimal crop hydration and conservation.' },
  { icon: FiSun, title: 'Soil Testing', description: 'Comprehensive soil analysis with tailored nutrient recommendations.' },
  { icon: FiTruck, title: 'Supply Chain', description: 'End-to-end logistics from farm to market with real-time tracking.' },
  { icon: FiShield, title: 'Crop Protection', description: 'Integrated pest management and disease control solutions.' },
  { icon: FiTrendingUp, title: 'Market Analysis', description: 'Real-time market insights and price forecasting for better returns.' },
  { icon: FiBookOpen, title: 'Training & Support', description: 'Expert-led workshops and 24/7 agronomy support.' },
];

export default function Services() {
  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-b from-transparent via-leaf-50/50 to-transparent dark:via-leaf-900/10">
      <div className="container-custom">
        <SectionTitle
          title="Our Services"
          subtitle="Comprehensive agricultural services designed to maximize your farm's potential and ensure sustainable growth."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <GlassCard key={service.title} delay={i * 0.1} hover3d className="group">
              <div className="w-14 h-14 rounded-2xl bg-leaf-100 dark:bg-leaf-900/50 flex items-center justify-center mb-5 group-hover:bg-leaf-500 transition-colors duration-300">
                <service.icon className="text-2xl text-leaf-600 dark:text-leaf-400 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{service.description}</p>
              <motion.div
                initial={{ width: 0 }}
                whileHover={{ width: '40%' }}
                className="h-0.5 bg-gradient-to-r from-leaf-500 to-sunset-500 rounded-full mt-4"
              />
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
