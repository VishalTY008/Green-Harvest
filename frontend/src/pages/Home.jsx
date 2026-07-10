import { motion } from 'framer-motion';
import { pageVariants } from '../animations/pageTransitions';
import Hero from '../components/home/Hero';
import FeaturedCrops from '../components/home/FeaturedCrops';
import Services from '../components/home/Services';
import Statistics from '../components/home/Statistics';
import Sustainability from '../components/home/Sustainability';
import Testimonials from '../components/home/Testimonials';
import ProductsShowcase from '../components/home/ProductsShowcase';
import SuccessStories from '../components/home/SuccessStories';
import BlogSection from '../components/home/BlogSection';
import Newsletter from '../components/home/Newsletter';

export default function Home() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="in" exit="out">
      <Hero />
      <FeaturedCrops />
      <Services />
      <Statistics />
      <Sustainability />
      <Testimonials />
      <ProductsShowcase />
      <SuccessStories />
      <BlogSection />
      <Newsletter />
    </motion.div>
  );
}
