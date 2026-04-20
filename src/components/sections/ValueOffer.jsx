import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ValueOffer() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const cardsRef = useRef([]);

  const pillars = [
    {
      title: "Atenção Capturada",
      desc: "Em um oceano de distrações, os primeiros segundos decidem tudo. Utilizo neuro-design para guiar os olhos do seu cliente exatamente para onde o clique acontece.",
      delay: 0
    },
    {
      title: "Zero Fricção Técnica",
      desc: "Lentidão mata vendas. Desenvolvo uma arquitetura imaculada e de carregamento ultrarrápido, tornando a sua taxa de abandono do site praticamente nula.",
      delay: 0.15
    },
    {
      title: "Autoridade Instantânea",
      desc: "A percepção de valor dita o seu preço de mercado. Uma interface de alto nível justifica tickets maiores, elimina concorrentes e diminui atritos de negociação.",
      delay: 0.3
    }
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Main text reveal
      gsap.fromTo(
        textRef.current,
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out"
        }
      );

      // Pillars stagger
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            scrollTrigger: {
              trigger: cardsRef.current[0],
              start: "top 85%",
            },
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "expo.out",
            delay: pillars[i].delay
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [pillars]);

  return (
    <section id="proposta" ref={sectionRef} className="w-full bg-[#030303] py-40 px-6 lg:px-12 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <div ref={textRef} className="text-center max-w-4xl mb-24">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-8 text-white">
            Design que não apenas impressiona. <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-600">Converte.</span>
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 font-sans leading-relaxed font-light">
            O maior erro das marcas é investir em vitrines virtuais bonitas, mas que afugentam clientes devido à lentidão ou confusão narrativa. Eu construo ecossistemas digitais onde <strong>a estética serve agressivamente à performance comercial.</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 w-full">
          {pillars.map((pillar, i) => (
            <div 
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="p-10 border-l mb-4 md:mb-0 border-white/10 hover:border-white/40 transition-colors duration-500 bg-gradient-to-b from-white/[0.02] to-transparent"
            >
              <h3 className="text-2xl font-bold mb-4 text-white uppercase tracking-tight">{pillar.title}</h3>
              <p className="text-zinc-500 font-sans leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        <button 
          onClick={() => {
            const el = document.getElementById('contato');
            if (el) window.lenis ? window.lenis.scrollTo(el) : el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="magnetic relative group overflow-hidden rounded-full p-[1px] cursor-pointer hover:scale-105 transition-transform duration-300"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-zinc-500 via-white to-zinc-500 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></span>
          <div className="relative bg-black px-12 py-5 rounded-full flex items-center gap-3 transition-all duration-300 group-hover:bg-zinc-900 border border-transparent group-hover:border-white/10">
            <span className="uppercase tracking-widest text-xs font-bold text-white z-10">Quero essa vantagem competitiva</span>
          </div>
        </button>

      </div>
    </section>
  );
}
