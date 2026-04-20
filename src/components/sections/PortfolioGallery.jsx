import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { projectsData } from '../../data/projetos';
import { MacbookScroll } from '../ui/macbook-scroll';

export default function PortfolioGallery() {
  const sectionRef = useRef(null);
  const [sectionH, setSectionH] = useState(
    typeof window !== 'undefined' ? window.innerHeight * 2 : 1400
  );
  useEffect(() => {
    if (sectionRef.current) setSectionH(sectionRef.current.offsetHeight);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // ── Badge + Title ────────────────────────────────────────────────
  const groupScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.8]);
  const groupY = useTransform(scrollYProgress, [0, 1], [0, 1100]);
  const groupOpacity = useTransform(scrollYProgress, [0.25, 0.38], [1, 0]);

  // ── Screen dim overlay ───────────────────────────────────────────
  const dimOpacity = useTransform(
    scrollYProgress,
    [0.32, 0.48, 0.70, 0.80],
    [0, 0.55, 0.55, 0]
  );
  const dimStickY = useTransform(scrollYProgress, [0, 1], [0, sectionH]);

  // ── Description + button ─────────────────────────────────────────
  const descOpacity = useTransform(
    scrollYProgress,
    [0.24, 0.40, 0.68, 0.75],
    [0, 1, 1, 0]
  );
  const descSlideY = useTransform(scrollYProgress, [0.24, 0.40], [20, 0]);

  const project = projectsData[0];

  return (
    <section
      ref={sectionRef}
      id="projetos"
      className="w-full bg-[#0B0B0F] text-white relative"
    >
      {/* Showcase watermark */}
      <div className="overflow-hidden absolute top-10 left-6 lg:left-12 z-0 mix-blend-difference pointer-events-none">
        <h2 className="text-5xl lg:text-8xl font-black uppercase tracking-tighter opacity-10">Showcase</h2>
      </div>

      {/* ── Badge + Title overlay ─────────────────────────────────── */}
      <motion.div
        className="hidden lg:flex absolute left-0 right-0 flex-col items-center pointer-events-none"
        style={{ top: '320px', zIndex: 50, scale: groupScale, y: groupY, opacity: groupOpacity }}
      >
        <span className="px-5 py-1.5 rounded-full bg-blue-500/40 text-blue-200 border border-blue-400/60 font-black text-sm uppercase tracking-[0.2em] backdrop-blur-md mb-4">
          Projeto Destaque
        </span>
        <span className="text-5xl lg:text-7xl font-black text-white" style={{ textShadow: '0 2px 30px rgba(0,0,0,0.8)' }}>
          {project.title}
        </span>
      </motion.div>

      {/* ── MacBook component ─────────────────────────────────────── */}
      <div className="relative z-10 w-full hidden lg:block bg-[#0B0B0F] dark:bg-[#0B0B0F]">
        <MacbookScroll
          src={project.media[0].src}
          badge={null}
          title={<span />}
          showGradient={false}
        >
          {/* Dimmer backdrop inside the screen */}
          <motion.div
            style={{ opacity: dimOpacity }}
            className="absolute inset-0 bg-black/60 rounded-xl"
          />

          {/* Overlays Wrapper inside the screen */}
          <motion.div
            style={{ opacity: descOpacity, y: descSlideY }}
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            {/* Top-Left Description Box (Floating Outside the Left Edge) */}
            <div className="absolute top-8 right-[calc(100%+3rem)] w-[300px] bg-white/[0.05] backdrop-blur-xl border border-white/20 rounded-2xl p-5 text-left shadow-[0_0_20px_rgba(255,255,255,0.15)] pointer-events-auto transition-shadow hover:shadow-[0_0_25px_rgba(255,255,255,0.25)]">
              <h3 className="text-base font-bold text-white mb-3 leading-tight drop-shadow-md">
                Gestão Clínica Digital
              </h3>
              <p className="text-[12px] text-zinc-300 leading-relaxed font-medium">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>

            {/* Bottom-Right Button (Floating Outside the Right Edge) */}
            <div className="absolute bottom-8 left-[calc(100%+3rem)] w-[500px] pointer-events-auto">
              <motion.a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/20 hover:border-white/40 text-white text-[12px] font-semibold backdrop-blur-xl transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] group"
              >
                Ver Projeto
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 drop-shadow-lg"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </motion.a>
            </div>
          </motion.div>
        </MacbookScroll>
      </div>
    </section>
  );
}
