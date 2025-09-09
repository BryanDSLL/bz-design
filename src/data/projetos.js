import { FaCode, FaPalette, FaMobile } from 'react-icons/fa';
import DentalCare from '../assets/dentalcare.mp4';
import BraIA from '../assets/braia.png';
import Hotel from '../assets/hotel.mp4';
import BlackCanvas from '../assets/blackcanvas.mp4';

// Array com os dados dos projetos em destaque
export const projectsData = [
  {
    id: 1,
    title: "DentalCare",
    description: "Sistema de agendamento para clínica odontológica com interface moderna e responsiva.",
    url: "https://dentalcare-pearl.vercel.app/", 
    technologies: [
      { name: "React", color: "bg-blue-600/20 text-blue-400" },
      { name: "Vite", color: "bg-green-600/20 text-green-400" },
      { name: "Tailwind CSS", color: "bg-cyan-600/20 text-cyan-400" },
      { name: "Node.js", color: "bg-green-600/20 text-green-400" }
    ],
    media: [
      { type: "video", src: DentalCare, alt: "DentalCare Demo" }
    ],
    fallbackIcon: FaCode,
    fallbackColor: "from-blue-600/20 to-purple-600/20",
    iconColor: "text-blue-400"
  },
  {
    id: 2,
    title: "Bra.IA",
    description: "Chatbot conectado a LLMs para uso como assistente pessoal.",
    url: "https://bra-ia.vercel.app/", 
    technologies: [
      { name: "React", color: "bg-blue-600/20 text-blue-400" },
      { name: "Next.js", color: "bg-gray-600/20 text-gray-400" },
      { name: "Tailwind CSS", color: "bg-cyan-600/20 text-cyan-400" },
      { name: "Node.js", color: "bg-green-600/20 text-green-400" }
    ],
    media: [
      { type: "image", src: BraIA, alt: "Bra.IA Interface" }
    ],
    fallbackIcon: FaPalette,
    fallbackColor: "from-green-600/20 to-blue-600/20",
    iconColor: "text-green-400"
  },
  {
    id: 3,
    title: "Hotel Boutique",
    description: "Landing page",
    url: "https://hotel-boutique.vercel.app/", 
    technologies: [
      { name: "React", color: "bg-blue-600/20 text-blue-400" },
      { name: "Next.js", color: "bg-gray-600/20 text-gray-400" },
      { name: "Tailwind CSS", color: "bg-cyan-600/20 text-cyan-400" }
    ],
    media: [
      { type: "video", src: Hotel, alt: "Hotel Boutique" }
    ],
    fallbackIcon: FaMobile,
    fallbackColor: "from-purple-600/20 to-pink-600/20",
    iconColor: "text-purple-400"
  },
  {
    id: 4,
    title: "Black Canvas Studio",
    description: "Landing page",
    url: "https://black-canvas-studio.vercel.app/", // Adicione a URL aqui
    technologies: [
      { name: "React", color: "bg-blue-600/20 text-blue-400" },
      { name: "Next.js", color: "bg-gray-600/20 text-gray-400" },
      { name: "Tailwind CSS", color: "bg-cyan-600/20 text-cyan-400" }
    ],
    media: [
      { type: "video", src: BlackCanvas, alt: "Black Canvas" }
    ],
    fallbackIcon: FaMobile,
    fallbackColor: "from-purple-600/20 to-pink-600/20",
    iconColor: "text-purple-400"
  }
];