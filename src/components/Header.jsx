import { useState, useEffect } from 'react';
import gsap from 'gsap';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Small delay ensures lenis catches up if we just loaded
      setTimeout(() => {
        section.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  const handleContratarClick = () => {
    scrollToSection('contato');
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-md py-4 shadow-2xl shadow-black/50 border-b border-white/5' : 'bg-transparent py-6'}`}>
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        <div onClick={() => scrollToSection('inicio')} className="magnetic flex items-center space-x-2">
          <span className="text-sm md:text-base font-bold uppercase tracking-widest text-white">Bryan Zimbrão</span>
        </div>

        <div className="hidden md:flex space-x-12 items-center">
          <button 
            onClick={() => scrollToSection('vantagens')} 
            className="magnetic text-zinc-400 hover:text-white text-xs uppercase tracking-widest transition-colors duration-300 font-semibold"
          >
            Serviços
          </button>
          <button 
            onClick={() => scrollToSection('projetos')} 
            className="magnetic text-zinc-400 hover:text-white text-xs uppercase tracking-widest transition-colors duration-300 font-semibold"
          >
            Showcase
          </button>
        </div>

        <div>
          <button 
            onClick={handleContratarClick}
            className="magnetic border border-white/20 hover:border-white bg-transparent text-white hover:bg-white hover:text-black px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-bold transition-all duration-300"
          >
            Contrate
          </button>
        </div>
      </nav>
    </header>
  );
}