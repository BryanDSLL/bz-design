
You are given a task to integrate a React component into your codebase.
Please verify your project has the following setup:
- shadcn/ui project structure
- Tailwind CSS v4.0
- TypeScript

If any of these are missing, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder
Copy-paste this component to /components/ui folder:
File location: components/parallax-hero-images-demo.tsx

File content: "use client";
import { ParallaxHeroImages } from "@/components/ui/parallax-hero-images";

export default function ParallaxHeroImagesDemo() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-neutral-50 dark:bg-neutral-950">
      <ParallaxHeroImages images={images} />
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-800 drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] md:text-6xl dark:text-neutral-100 dark:drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">
          State of the art, cutting edge images, everywhere.
        </h1>
        <p className="max-w-md text-neutral-600 drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] dark:text-neutral-400 dark:drop-shadow-[0_0_10px_rgba(0,0,0,0.6)]">
          Move your mouse to see the parallax effect. Images at different depths
          move at different speeds.
        </p>
      </div>
    </div>
  );
}

const images = [
  "https://assets.aceternity.com/components/hero-section-with-mesh-gradient.webp",
  "https://assets.aceternity.com/components/3d-globe.webp",
  "https://assets.aceternity.com/components/keyboard-2.webp",
  "https://assets.aceternity.com/components/hero-1.webp",
  "https://assets.aceternity.com/components/hero-2.webp",
  "https://assets.aceternity.com/components/hero-3.webp",
];


File location: components/ui/parallax-hero-images.tsx

File content: "use client";
import React, { useEffect, useState, useMemo, useCallback, memo } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";

type ImagePosition = {
  src: string;
  position:
    | "top-left"
    | "top-right"
    | "mid-left"
    | "mid-right"
    | "bottom-left"
    | "bottom-right"
    | "far-left"
    | "far-right";
  depth: number;
  delay: number;
};

const positionStyles: Record<
  ImagePosition["position"],
  { top: string; left?: string; right?: string }
> = {
  "top-left": { top: "8%", left: "4%" },
  "top-right": { top: "8%", right: "4%" },
  "mid-left": { top: "38%", left: "6%" },
  "mid-right": { top: "38%", right: "6%" },
  "bottom-left": { top: "68%", left: "4%" },
  "bottom-right": { top: "68%", right: "4%" },
  "far-left": { top: "52%", left: "2%" },
  "far-right": { top: "52%", right: "2%" },
};

const positionOrder: ImagePosition["position"][] = [
  "top-left",
  "top-right",
  "mid-left",
  "mid-right",
  "bottom-left",
  "bottom-right",
  "far-left",
  "far-right",
];

type DepthVariant = "default" | "edge-focus";

const depthValuesByVariant: Record<DepthVariant, number[]> = {
  default: [0.3, 0.35, 0.9, 0.85, 0.4, 0.45, 0.25, 0.2],
  "edge-focus": [0.85, 0.9, 0.3, 0.35, 0.8, 0.85, 0.4, 0.45],
};

const SPRING_CONFIG = { damping: 25, stiffness: 120 };

export interface ParallaxHeroImagesProps {
  images: string[];
  className?: string;
  imageClassName?: string;
  variant?: DepthVariant;
}

export const ParallaxHeroImages = ({
  images,
  className,
  imageClassName,
  variant = "default",
}: ParallaxHeroImagesProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, SPRING_CONFIG);
  const smoothMouseY = useSpring(mouseY, SPRING_CONFIG);

  const positions = useMemo(() => {
    const limitedImages = images.slice(0, 8);
    const depthValues = depthValuesByVariant[variant];
    return limitedImages.map((src, index) => ({
      src,
      position: positionOrder[index],
      depth: depthValues[index],
      delay: index * 0.12,
    }));
  }, [images, variant]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {positions.map((pos, index) => (
        <ParallaxImage
          key={`${pos.src}-${index}`}
          src={pos.src}
          position={pos.position}
          depth={pos.depth}
          delay={pos.delay}
          imageClassName={imageClassName}
          smoothMouseX={smoothMouseX}
          smoothMouseY={smoothMouseY}
        />
      ))}
    </div>
  );
};

interface ParallaxImageProps extends ImagePosition {
  imageClassName?: string;
  smoothMouseX: MotionValue<number>;
  smoothMouseY: MotionValue<number>;
}

const ParallaxImage = memo(function ParallaxImage({
  src,
  position,
  depth,
  delay,
  imageClassName,
  smoothMouseX,
  smoothMouseY,
}: ParallaxImageProps) {
  const maxOffset = 40;

  const translateX = useTransform(
    smoothMouseX,
    [-1, 1],
    [-maxOffset * depth, maxOffset * depth],
  );

  const translateY = useTransform(
    smoothMouseY,
    [-1, 1],
    [-maxOffset * depth, maxOffset * depth],
  );

  const posStyle = positionStyles[position];

  return (
    <motion.div
      className="absolute"
      style={{
        top: posStyle.top,
        left: posStyle.left,
        right: posStyle.right,
        x: translateX,
        y: translateY,
        zIndex: Math.round(depth * 10),
      }}
      initial={{ opacity: 0, filter: "blur(20px)", scale: 0.9 }}
      animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        className={cn(
          "aspect-4/3 h-20 w-32 rounded-lg object-cover shadow-sm ring-1 ring-black/10 sm:h-40 sm:w-56 md:h-52 md:w-80 dark:ring-white/10",
          imageClassName,
        )}
      />
    </motion.div>
  );
});


