import { ParallaxHeroImages } from "../ui/parallax-hero-images";
import BraIA from '../../assets/braia.png';

const bgImages = [
  "https://assets.aceternity.com/components/hero-section-with-mesh-gradient.webp",
  BraIA,
  "https://assets.aceternity.com/components/3d-globe.webp",
  "https://assets.aceternity.com/components/keyboard-2.webp",
  BraIA,
  "https://assets.aceternity.com/components/hero-1.webp",
  "https://assets.aceternity.com/components/hero-2.webp",
  "https://assets.aceternity.com/components/hero-3.webp",
];

export default function ShowcaseParallax() {
  return (
    <section id="galeria" className="relative z-20 flex min-h-screen w-full items-center justify-center overflow-hidden bg-neutral-950">
      <ParallaxHeroImages images={bgImages} />
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-neutral-100 drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] md:text-6xl">
          Todos os detalhes importam. Onde quer que se olhe.
        </h2>
        <p className="max-w-md text-neutral-400 drop-shadow-[0_0_10px_rgba(0,0,0,0.6)]">
          Projetos concebidos com as mais altas tecnologias de interação. Cada movimento se torna uma narrativa de profundidade na conversão do usuário.
        </p>
      </div>
    </section>
  );
}
