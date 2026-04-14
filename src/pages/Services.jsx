import Hero from '../components/sections/Hero';
import Features from '../components/sections/Features';
import PortfolioGallery from '../components/sections/PortfolioGallery';
import ValueOffer from '../components/sections/ValueOffer';
import Contact from '../components/sections/Contact';

function Services() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Hero />
      <Features />
      <PortfolioGallery />
      <ValueOffer />
      <Contact />
    </div>
  );
}

export default Services;
