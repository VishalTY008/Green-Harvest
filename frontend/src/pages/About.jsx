import { motion } from 'framer-motion';
import SectionTitle from '../components/common/SectionTitle';
import GlassCard from '../components/common/GlassCard';
import Button from '../components/common/Button';
import { FiTarget, FiEye, FiHeart } from 'react-icons/fi';
import { Helmet } from 'react-helmet-async';

const values = [
  { icon: FiTarget, title: 'Our Mission', desc: 'To empower farmers worldwide with sustainable agricultural solutions that increase productivity, protect the environment, and ensure food security for future generations.' },
  { icon: FiEye, title: 'Our Vision', desc: 'A world where every farmer has access to the knowledge, technology, and resources needed to cultivate thriving, sustainable farms.' },
  { icon: FiHeart, title: 'Our Values', desc: 'Sustainability, innovation, integrity, community empowerment, and respect for the land that sustains us all.' },
];

const timeline = [
  { year: '1998', title: 'Founded', desc: 'GreenHarvest established with a vision to revolutionize sustainable agriculture.' },
  { year: '2003', title: 'First 1,000 Farms', desc: 'Reached milestone of supporting 1,000 partner farms across the region.' },
  { year: '2008', title: 'Global Expansion', desc: 'Expanded operations to 15 countries, bringing expertise to diverse climates.' },
  { year: '2012', title: 'Innovation Hub', desc: 'Launched R&D center for developing drought-resistant and high-yield crop varieties.' },
  { year: '2018', title: 'Digital Transformation', desc: 'Introduced AI-powered farm management platform for real-time crop monitoring.' },
  { year: '2024', title: '25 Years of Growth', desc: 'Serving 5,000+ farms in 30+ countries with comprehensive agricultural solutions.' },
];

const team = [
  { name: 'Dr. Arun Sharma', role: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300' },
  { name: 'Maria Santos', role: 'Head of Research', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300' },
  { name: 'James Opondo', role: 'Director of Operations', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300' },
  { name: 'Priya Patel', role: 'Sustainability Officer', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300' },
];

export default function About() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Helmet><title>About Us | GreenHarvest</title></Helmet>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <span className="text-xs uppercase tracking-widest text-leaf-600 dark:text-leaf-400 font-semibold">About Us</span>
              <h1 className="font-serif text-4xl md:text-5xl font-bold mt-3 mb-6">
                Nurturing Nature,<br />
                <span className="gradient-text">Empowering Farmers</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                For over 25 years, GreenHarvest has been at the forefront of sustainable agriculture, working hand-in-hand with farming communities to cultivate a better future. What started as a small initiative has grown into a global movement transforming the way the world farms.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                Our team of agronomists, researchers, and sustainability experts works tirelessly to develop innovative solutions that increase crop yields while preserving the environment for future generations.
              </p>
              <Button variant="primary" href="/contact">Partner With Us</Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden aspect-[4/5]">
                <img src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800" alt="Farming" className="w-full h-full object-cover" />
              </div>
              <GlassCard className="absolute -bottom-6 -left-6 max-w-[200px]">
                <p className="text-3xl font-bold gradient-text">25+</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Years of Excellence</p>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-leaf-50/50 dark:bg-leaf-900/10">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <GlassCard key={v.title} delay={i * 0.1}>
                <div className="w-12 h-12 rounded-2xl bg-leaf-100 dark:bg-leaf-900/50 flex items-center justify-center mb-4">
                  <v.icon className="text-leaf-600 dark:text-leaf-400 text-xl" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-3">{v.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <SectionTitle title="Our Journey" subtitle="A timeline of growth, innovation, and impact." />
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-leaf-500 via-sunset-500 to-leaf-500" />
            {timeline.map((item, i) => (
              <motion.div key={item.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`relative flex flex-col md:flex-row items-start gap-4 mb-12 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'} pl-12 md:pl-0`}>
                  <span className="text-3xl font-bold gradient-text">{item.year}</span>
                  <h3 className="font-serif text-xl font-semibold mt-1">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">{item.desc}</p>
                </div>
                <div className="absolute left-2 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-leaf-500 ring-4 ring-white dark:ring-earth-900 z-10" />
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-b from-transparent to-leaf-50/50 dark:to-leaf-900/10">
        <div className="container-custom">
          <SectionTitle title="Meet Our Team" subtitle="Passionate people driving agricultural innovation." />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="relative overflow-hidden rounded-2xl aspect-square mb-4">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h4 className="font-semibold">{member.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
