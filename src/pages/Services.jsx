import Hero from '../components/sections/Hero';
import Features from '../components/sections/Features';
import PortfolioGallery from '../components/sections/PortfolioGallery';
import ShowcaseParallax from '../components/sections/ShowcaseParallax';
import ValueOffer from '../components/sections/ValueOffer';
import Contact from '../components/sections/Contact';

function Services() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Hero />
      <Features />
      <PortfolioGallery />
      <ShowcaseParallax />
      <ValueOffer />
      <Contact />
    </div>
  );
}

export default Services;
