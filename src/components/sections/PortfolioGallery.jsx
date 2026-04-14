import { useEffect, useRef, useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '../../data/projetos';

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioGallery() {
  const containerRef = useRef(null);
  const scrollWrapperRef = useRef(null);

  // Initialize the horizontal scroll using GSAP
  useEffect(() => {
    let ctx = gsap.context(() => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
      
      if (isDesktop && containerRef.current && scrollWrapperRef.current) {
        // Robust calculation of scrollable width
        const getScrollAmount = () => {
          // Use scrollWidth but ensure we subtract clientWidth
          return scrollWrapperRef.current.scrollWidth - window.innerWidth;
        };

        let scrollAmount = getScrollAmount();

        const horizontalTween = gsap.to(scrollWrapperRef.current, {
          x: () => -getScrollAmount(),
          ease: "none"
        });

        const st = ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          animation: horizontalTween,
          scrub: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        });

        // Use ResizeObserver to catch layout shifts (images loading, viewport changes)
        const ro = new ResizeObserver(() => {
          scrollAmount = getScrollAmount();
          st.refresh();
        });
        ro.observe(scrollWrapperRef.current);

        // Global refreshes as fallbacks
        const refreshAll = () => {
          ScrollTrigger.refresh();
        };

        window.addEventListener('load', refreshAll);
        setTimeout(refreshAll, 1000);
        setTimeout(refreshAll, 3000);

        return () => {
          ro.disconnect();
          window.removeEventListener('load', refreshAll);
        };
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="projetos" className="w-full bg-black py-20 lg:py-0 text-white overflow-hidden relative lg:h-screen">
      <div className="absolute top-10 left-6 lg:left-12 z-20 mix-blend-difference pointer-events-none">
        <h2 className="text-5xl lg:text-8xl font-black uppercase tracking-tighter opacity-10">Showcase</h2>
      </div>

      <div 
        ref={scrollWrapperRef}
        className="flex flex-col lg:flex-row h-full lg:h-screen items-center px-6 lg:px-20 gap-16 lg:gap-32 w-max lg:pl-32 py-20 lg:py-0"
      >
        <div className="project-panel w-screen lg:w-[40vw] flex flex-col justify-center flex-shrink-0 mb-10 lg:mb-0">
          <h3 className="text-4xl lg:text-7xl font-bold uppercase leading-none mb-6">Trabalhos<br/><span className="text-zinc-600">Seletos</span></h3>
          <p className="text-zinc-400 font-sans max-w-sm text-lg">
            Um olhar sobre a fusão entre técnica e estética. Arraste ou role para explorar.
          </p>
        </div>

        {projectsData.map((project, idx) => (
          <div key={project.id} className="project-panel w-full lg:w-[60vw] h-[60vh] lg:h-[70vh] flex-shrink-0 group relative overflow-hidden rounded-2xl cursor-pointer" onClick={() => project.url && window.open(project.url, '_blank', 'noopener,noreferrer')}>
            {/* Media */}
            <div className="w-full h-full relative overflow-hidden bg-zinc-900">
              {project.media.length > 0 ? (
                project.media[0].type === 'video' ? (
                  <video 
                    className="w-full h-full object-cover origin-center opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out"
                    autoPlay muted loop playsInline
                  >
                    <source src={project.media[0].src} type="video/mp4" />
                  </video>
                ) : (
                  <img 
                    src={project.media[0].src}
                    alt={project.media[0].alt}
                    className="w-full h-full object-cover origin-center opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out"
                  />
                )
              ) : (
                <div className={`w-full h-full bg-gradient-to-br flex items-center justify-center opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out ${project.fallbackColor}`}>
                   <project.fallbackIcon className={`text-6xl ${project.iconColor}`} />
                </div>
              )}
            </div>
            
            {/* Data Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-8 lg:p-12 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-wrap lg:flex-nowrap items-end justify-between gap-4">
              <div>
                <h4 className="text-3xl lg:text-5xl font-bold uppercase mb-2">{project.title}</h4>
                <p className="text-zinc-300 font-sans mb-4 text-sm lg:text-base max-w-lg">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, tIdx) => (
                    <span key={tIdx} className={`px-4 py-1 rounded-full text-xs font-medium uppercase tracking-wider backdrop-blur-md bg-white/10 ${tech.color}`}>
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
              
              {project.url && (
                <div className="flex-shrink-0 w-16 h-16 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300 -rotate-45 group-hover:rotate-0">
                  <span className="text-2xl font-light">→</span>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {/* Spacer at end */}
        <div className="project-panel w-[10vw] flex-shrink-0 hidden lg:block"></div>
      </div>
    </section>
  );
}
