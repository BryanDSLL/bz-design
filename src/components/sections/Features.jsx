import { useEffect, useRef } from 'react';
import { HiLightBulb, HiClock, HiDeviceTablet, HiCheckCircle, HiChartBar, HiStar, HiCodeBracket, HiGlobeAlt } from 'react-icons/hi2';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Marquee } from "../ui/marquee";
import {
  SiReact, SiNextdotjs, SiTypescript, SiNodedotjs,
  SiTailwindcss, SiFigma, SiFramer, SiPostgresql,
  SiVite, SiSupabase, SiPrisma, SiJavascript
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const technologies = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  { name: "GSAP", icon: SiJavascript, color: "#88CE02" },
  { name: "Framer Motion", icon: SiFramer, color: "#FF00C1" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Vite", icon: SiVite, color: "#646CFF" },
  { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
  { name: "Prisma", icon: SiPrisma, color: "#5A67D8" }
];

export default function Features() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  const features = [
    {
      icon: HiLightBulb,
      title: "Design Estratégico",
      desc: "Não apenas estética. Crio interfaces intencionais projetadas para fisgar a atenção e reter o seu público.",
      delay: 0
    },
    {
      icon: HiChartBar,
      title: "Foco em Conversão",
      desc: "Arquitetura persuasiva desenhada milimetricamente para transformar visitantes curiosos em clientes de alto valor.",
      delay: 0.1
    },
    {
      icon: HiClock,
      title: "Ultra Performance",
      desc: "Velocidade extrema e código otimizado. Tempos de carregamento instantâneos que impedem a fuga de usuários.",
      delay: 0.2
    },
    {
      icon: HiStar,
      title: "Estética Premium",
      desc: "Visuais de alto padrão (High-End) que posicionam sua marca no topo do mercado e geram autoridade instantânea.",
      delay: 0.3
    },
    {
      icon: HiDeviceTablet,
      title: "Multiplataforma Absoluta",
      desc: "Experiência fluida e impecável, adaptada com perfeição matemática para celulares, tablets e telas grandes.",
      delay: 0.4
    },
    {
      icon: HiCodeBracket,
      title: "Engenharia Robusta",
      desc: "Uso as stacks mais poderosas do mercado atual (React, Next, GSAP) para garantir estabilidade e escalabilidade.",
      delay: 0.5
    },
    {
      icon: HiGlobeAlt,
      title: "Otimização SEO",
      desc: "Estruturação semântica de elite para que o Google ame o seu site e te posicione na frente da concorrência.",
      delay: 0.6
    },
    {
      icon: HiCheckCircle,
      title: "Parceria Estratégica",
      desc: "Pense em mim como seu sócio técnico. Trabalho focado no longo prazo e no crescimento contínuo do seu negócio.",
      delay: 0.7
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
    <section ref={sectionRef} id="vantagens" className="w-full py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
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

      {/* Full-Width Technologies Marquee Wrapper */}
      <div className="mt-12 w-full overflow-hidden relative border-y border-white/5 bg-white/[0.01] py-0.5">
        <div className="relative flex w-full flex-col items-center justify-center [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <Marquee pauseOnHover className="[--duration:40s]">
            {technologies.map((tech, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center mx-6 cursor-default gap-3"
              >
                <tech.icon
                  style={{ color: tech.color }}
                  className="text-lg opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="text-xs md:text-sm font-semibold tracking-[0.2em] text-zinc-300 hover:text-white uppercase transition-colors duration-300">
                  {tech.name}
                </span>
                <span className="ml-6 text-zinc-800 text-lg font-bold">—</span>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
