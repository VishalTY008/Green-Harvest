import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';
import { FiMessageSquare } from 'react-icons/fi';

const stories = [
  {
    name: 'Lakshmi Devi',
    location: 'Tamil Nadu, India',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    story: 'From 2 acres to 20 acres — GreenHarvest helped me scale my organic vegetable farm sustainably. Their training programs taught me modern farming techniques that doubled my yield while reducing water usage by 40%. My family now has a stable income and I employ 12 women from my village.',
    crop: 'Organic Vegetables',
    increase: '120%',
  },
  {
    name: 'Carlos Mendez',
    location: 'Andalusia, Spain',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    story: 'The drought was devastating our olive groves until GreenHarvest introduced us to their smart irrigation system. Now our water efficiency is at 95% and our olive oil production has the highest quality rating in the region. They are true partners in every sense.',
    crop: 'Olive Oil',
    increase: '85%',
  },
  {
    name: 'Grace Akinyi',
    location: 'Nakuru, Kenya',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    story: 'I started with a small plot of maize and a dream. GreenHarvest provided quality seeds, fertilizer, and a guaranteed market. Within three seasons, I expanded to 5 acres and now supply to major supermarkets. My children are in school because of farming.',
    crop: 'Maize & Beans',
    increase: '200%',
  },
];

export default function SuccessStories() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-custom">
        <SectionTitle
          title="Success Stories"
          subtitle="Real stories of transformation from farmers around the world who partnered with us."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stories.map((story, i) => (
            <motion.div key={story.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="group relative"
            >
              <div className="glass rounded-3xl p-6 h-full flex flex-col relative overflow-hidden">
                <FiMessageSquare className="text-leaf-500/20 text-5xl absolute top-4 right-4" />

                <div className="flex items-center gap-4 mb-5">
                  <img src={story.image} alt={story.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-leaf-500/30" />
                  <div>
                    <h4 className="font-semibold">{story.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{story.location}</p>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed flex-grow">
                  "{story.story}"
                </p>

                <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-200 dark:border-white/10">
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Crop</span>
                    <p className="text-sm font-medium">{story.crop}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Growth</span>
                    <p className="text-sm font-bold text-leaf-600 dark:text-leaf-400">{story.increase}</p>
                  </div>
                </div>

                <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-leaf-500/30 transition-colors duration-500 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
