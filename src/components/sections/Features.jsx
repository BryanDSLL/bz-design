import { useEffect, useRef } from 'react';
import { HiLightBulb, HiClock, HiDeviceTablet, HiCheckCircle } from 'react-icons/hi2';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  const features = [
    {
      icon: HiLightBulb,
      title: "Soluções Criativas",
      desc: "Designs únicos e estéticos que criam memórias na mente do seu público.",
      delay: 0
    },
    {
      icon: HiClock,
      title: "Performance",
      desc: "Velocidade e otimização levadas a sério. Experiência fluida e instantânea.",
      delay: 0.1
    },
    {
      icon: HiDeviceTablet,
      title: "Multiplataforma",
      desc: "Ajuste milimétrico para celulares, tablets e displays de altíssima resolução.",
      delay: 0.2
    },
    {
      icon: HiCheckCircle,
      title: "Parceria Contínua",
      desc: "Assessoria que vai além do código, com foco no longo prazo do seu negócio.",
      delay: 0.3
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Animation
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out"
        }
      );

      // Cards Animation
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 100, opacity: 0 },
          {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            delay: features[i].delay
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [features]);

  return (
    <section ref={sectionRef} id="vantagens" className="w-full py-32 px-6 lg:px-12 bg-black relative z-10">
      <div className="max-w-7xl mx-auto">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold mb-20 text-center uppercase tracking-tight text-white/90"
        >
          O Diferencial
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div 
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="group magnetic p-8 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/30 hover:-translate-y-3 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] transition-all duration-500 rounded-2xl flex flex-col items-start backdrop-blur-md cursor-pointer"
            >
              <feature.icon className="text-4xl text-zinc-400 group-hover:text-white group-hover:scale-125 transform transition-all duration-500 mb-6" />
              <h3 className="text-2xl font-bold mb-3 text-white/90 group-hover:text-white transition-colors duration-300">{feature.title}</h3>
              <p className="text-zinc-400 font-sans leading-relaxed text-sm group-hover:text-zinc-300 transition-colors duration-300">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
