import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import RetroGrid from '@/components/ui/retro-grid';

export default function Hero() {
  const containerRef = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Premium text reveal
      tl.fromTo(
        [textRef1.current, textRef2.current],
        { y: 150, opacity: 0, rotateZ: 5 },
        {
          y: 0,
          opacity: 1,
          rotateZ: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power4.out',
          delay: 0.2,
        }
      )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
          '-=0.8'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' },
          '-=0.6'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      if (window.lenis) {
        window.lenis.scrollTo(section);
      } else {
        window.scrollTo({
          top: section.offsetTop - 20,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <section
      ref={containerRef}
      id="inicio"
      className="w-full min-h-screen flex flex-col justify-center items-center relative px-6 lg:px-12 overflow-hidden"
    >
      {/* Retro Grid Background */}
      <RetroGrid />

      {/* Decorative large circle in background */}
      <div className="absolute top-1/4 left-1/4 w-[60vh] h-[60vh] border border-white/5 rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[40vh] h-[40vh] border border-white/5 rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="overflow-hidden inline-block mb-2 w-full px-4">
          <h1
            ref={textRef1}
            className="text-[15vw] sm:text-[12vw] md:text-[9vw] lg:text-[7vw] xl:text-[7.5rem] font-extrabold tracking-tighter uppercase leading-[0.85] text-white w-full"
          >
            Digital
          </h1>
        </div>
        <div className="overflow-hidden inline-block mb-8 w-full px-4">
          <h1
            ref={textRef2}
            className="text-[15vw] sm:text-[12vw] md:text-[9vw] lg:text-[7vw] xl:text-[7.5rem] font-extrabold tracking-tighter uppercase leading-[0.85] text-transparent w-full"
            style={{ WebkitTextStroke: '2px rgba(255,255,255,0.8)' }}
          >
            Experience
          </h1>
        </div>

        <p
          ref={subRef}
          className="text-base md:text-2xl text-zinc-400 font-sans max-w-2xl mb-12 tracking-wide font-light px-4"
        >
          Transformando ideias em presenças digitais impactantes, velozes e inesquecíveis.
        </p>

        <button
          ref={ctaRef}
          onClick={() => scrollToSection('vantagens')}
          className="magnetic px-8 py-4 uppercase tracking-widest text-sm font-semibold bg-white text-black rounded-full hover:bg-zinc-200 transition-colors duration-300"
        >
          Explorar Soluções
        </button>
      </div>

      <div className="absolute bottom-10 left-10 text-md font-mono tracking-widest text-zinc-500 uppercase overflow-hidden">
        <div className="animate-pulse">Scroll to discover</div>
      </div>
      <div className="absolute bottom-10 right-10 text-md font-mono tracking-widest text-zinc-500 uppercase overflow-hidden">
        <div className="animate-pulse">Bryan Zimbrão</div>
      </div>
    </section>
  );
}
