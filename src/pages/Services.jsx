import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HiChevronDoubleDown, HiCheckCircle, HiClock, HiLightBulb, HiDeviceTablet, HiChevronLeft, HiChevronRight, HiSun, HiMoon } from 'react-icons/hi2';
import { FaWhatsapp, FaEnvelope, FaRocket, FaPalette, FaCode, FaMobile, FaVideo } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projetos.js';
import Logo from '../assets/bz-logo.png';
import emailjs from 'emailjs-com';
import gsap from 'gsap';
import bgSessao1 from '../assets/bg-sessao1.png';

gsap.registerPlugin(ScrollTrigger);

function Services() {
  const [currentImageIndexes, setCurrentImageIndexes] = useState(
    projectsData.reduce((acc, project) => {
      acc[project.id] = 0;
      return acc;
    }, {})
  );

  const maskRefs = useRef([]);
  const arrowRef = useRef(null);
  const mainContainerRef = useRef(null);

  const [form, setForm] = useState({
    nome: "",
    email: "",
    mensagem: "",
  });
  const [status, setStatus] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_9juv799",    
        "template_dw3r6ow",      
        {
          from_name: form.nome,
          from_email: form.email,
          message: form.mensagem,
        },
        "1SMiRCc2hriY-ZrAS"
      )
      .then(() => {
        setStatus("Mensagem enviada com sucesso!");
        setForm({ nome: "", email: "", mensagem: "" });
        setShowForm(false);
      })
      .catch(() => {
        setStatus("Erro ao enviar a mensagem.");
      });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const masks = maskRefs.current;

      masks.forEach((mask) => {
        if (mask) {
          gsap.fromTo(
            mask,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: mask,
                start: 'top 80%',
                end: 'top 30%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });

      if (arrowRef.current) {
        gsap.to(arrowRef.current, {
          y: 32,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          duration: 1.2,
        });
      }
    }, mainContainerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 20,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div ref={mainContainerRef} className="min-h-[200vh] flex flex-col items-center justify-start text-white text-4xl font-bold overflow-x-hidden">
      {/* Hero Section */}
      <div id="inicio" className="w-full min-h-[100vh] flex flex-col lg:flex-row items-center justify-center p-6 lg:p-12 gap-12 relative pt-20">
        {/* Imagem de Fundo */}
        <div className="absolute inset-0 z-[1]">
          <img 
            src={bgSessao1} 
            alt="Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        {/* Conteúdo Principal - Lado Esquerdo */}
        <div className="relative z-20 flex flex-col justify-center items-start w-full lg:w-1/2 text-left">
          {/* Badge/Tag Superior */}
          <div className="inline-flex items-center px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
            Desenvolvimento de sistemas
          </div>
          
          {/* Título Principal */}
          <h1 className="text-4xl lg:text-5xl font-bold mb-3 leading-tight">
            <span className="text-white">Bryan Zimbrão</span><br/>
            <span className="bg-gradient-to-r lg:text-4xl from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Análise e manutenção de dados
            </span>
          </h1>
          
          {/* Subtítulo */}
          <h2 className="text-lg lg:text-xl text-gray-300 mb-5 max-w-lg leading-relaxed">
            Transforme sua ideia em realidade digital
          </h2>
          
          {/* Lista de Serviços */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-gray-300 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
              <span>Análise e manutenção de dados</span>
            </div>
            <div className="flex items-center text-gray-300 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
              <span>Landing Pages</span>
            </div>
            <div className="flex items-center text-gray-300 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
              <span>Aplicativos Web</span>
            </div>
            <div className="flex items-center text-gray-300 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
              <span>Mídias Digitais</span>
            </div>
            <div className="flex items-center text-gray-300 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
              <span>Manutenção de computadores</span>
            </div>
          </div>
          
          {/* Botão de Ação */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => scrollToSection('servicos')}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-4 rounded-lg text-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              Falar Comigo
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Informações de Contato */}
          <div className="flex flex-col gap-3 mt-8 pt-3 border-t border-gray-700">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16l-5.83 5.83c-.196.196-.512.196-.708 0l-2.83-2.83c-.196-.196-.196-.512 0-.708l.708-.708c.196-.196.512-.196.708 0l1.83 1.83 4.83-4.83c.196-.196.512-.196.708 0l.708.708c.196.196.196.512 0 .708z"/>
              </svg>
              <span className="text-sm text-blue-400">https://bz-design.vercel.app</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="text-sm text-blue-400">https://github.com/BryanDSLL</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span className="text-sm text-blue-400">www.linkedin.com/in/bryandsll</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              <Link className="text-sm text-green-400">(21) 99039-0610</Link>
            </div>
          </div>
        </div>
        
        {/* Área da Imagem - Lado Direito */}
        <div className="relative z-10 flex justify-center items-center w-full lg:w-1/2">
          <div className="relative w-full max-w-lg">
            {/* Container para a imagem */}
            <div className="relative bg-gradient-to-br from-blue-900/20 to-blue-600/10 rounded-2xl p-8 backdrop-blur-sm border border-blue-500/20 aspect-square">
              <div className="flex items-center justify-center h-full">
                <img 
                  src={Logo} 
                  alt="Bryan Zimbrão - Desenvolvimento de Sistemas" 
                  className="w-80 h-80 object-contain"
                />
              </div>
              
              {/* Elementos decorativos */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full opacity-60"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400 rounded-full opacity-40"></div>
              <div className="absolute top-1/2 -left-2 w-4 h-4 bg-blue-300 rounded-full opacity-30"></div>
            </div>
            {/* Elementos flutuantes decorativos */}
            <div className="absolute -z-10 top-10 -right-10 w-32 h-32 bg-blue-600/10 rounded-full blur-xl"></div>
            <div className="absolute -z-10 -bottom-10 -left-10 w-24 h-24 bg-blue-400/10 rounded-full blur-xl"></div>
          </div>
        </div>
        {/* Seta animada */}
        <span
          ref={arrowRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-4xl text-blue-400 drop-shadow-lg"
          style={{ pointerEvents: 'none' }}
        >
          <HiChevronDoubleDown />
        </span>
      </div>

      {/* Por que escolher meus serviços */}
      <div
        id="vantagens"
        ref={(el) => maskRefs.current.push(el)}
        className="relative z-20 w-full min-h-[80vh] p-6 mt-20"
      >
        <h2 className="text-5xl font-bold text-center mb-16">Por que escolher meus serviços?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <div className="text-center p-6 bg-white/10 backdrop-blur rounded-lg hover:bg-white/20 transition-all duration-300">
            <HiLightBulb className="text-6xl text-yellow-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">Soluções Criativas</h3>
            <p className="text-lg font-normal text-gray-300">Designs únicos e modernos que destacam sua marca no mercado</p>
          </div>
          <div className="text-center p-6 bg-white/10 backdrop-blur rounded-lg hover:bg-white/20 transition-all duration-300">
            <HiClock className="text-6xl text-green-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">Entrega Rápida</h3>
            <p className="text-lg font-normal text-gray-300">Projetos entregues no prazo acordado, sem comprometer a qualidade</p>
          </div>
          <div className="text-center p-6 bg-white/10 backdrop-blur rounded-lg hover:bg-white/20 transition-all duration-300">
            <HiDeviceTablet className="text-6xl text-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">100% Responsivo</h3>
            <p className="text-lg font-normal text-gray-300">Funciona perfeitamente em celulares, tablets e computadores</p>
          </div>
          <div className="text-center p-6 bg-white/10 backdrop-blur rounded-lg hover:bg-white/20 transition-all duration-300">
            <HiCheckCircle className="text-6xl text-purple-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">Suporte Completo</h3>
            <p className="text-lg font-normal text-gray-300">Acompanhamento e suporte mesmo após a entrega do projeto</p>
          </div>
        </div>
      </div>

      {/* Seção de Serviços */}
      <div
        id="servicos"
        ref={(el) => maskRefs.current.push(el)}
        className="relative z-20 w-full min-h-[100vh] p-6 mt-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Meus Serviços</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Sites Institucionais */}
          <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur p-8 rounded-xl border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 transform hover:scale-105 flex flex-col">
            <FaCode className="text-5xl text-blue-400 mb-6" />
            <h3 className="text-3xl font-bold mb-4">Sites Profissionais</h3>
            <p className="text-lg font-normal text-gray-300 mb-6">Sites completos para empresas, profissionais liberais e negócios locais. Inclui:</p>
            <ul className="text-base font-normal text-gray-300 space-y-2 flex-grow">
              <li className="flex items-center"><HiCheckCircle className="text-green-400 mr-2" /> Design moderno e profissional</li>
              <li className="flex items-center"><HiCheckCircle className="text-green-400 mr-2" /> Otimizado para Google (SEO)</li>
              <li className="flex items-center"><HiCheckCircle className="text-green-400 mr-2" /> Formulário de contato</li>
              <li className="flex items-center"><HiCheckCircle className="text-green-400 mr-2" /> Integração com redes sociais</li>
            </ul>
            <div className="mt-auto pt-6 text-center border-t border-blue-500/20">
              <span className="text-2xl font-bold text-blue-400">A partir de R$ 800</span>
            </div>
          </div>

          {/* Landing Pages */}
          <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur p-8 rounded-xl border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105 flex flex-col">
            <FaRocket className="text-5xl text-purple-400 mb-6" />
            <h3 className="text-3xl font-bold mb-4">Landing Pages</h3>
            <p className="text-lg font-normal text-gray-300 mb-6">Páginas de conversão otimizadas para campanhas e vendas. Inclui:</p>
            <ul className="text-base font-normal text-gray-300 space-y-2 flex-grow">
              <li className="flex items-center"><HiCheckCircle className="text-green-400 mr-2" /> Alta conversão</li>
              <li className="flex items-center"><HiCheckCircle className="text-green-400 mr-2" /> Design persuasivo</li>
              <li className="flex items-center"><HiCheckCircle className="text-green-400 mr-2" /> Integração com ferramentas</li>
              <li className="flex items-center"><HiCheckCircle className="text-green-400 mr-2" /> Analytics e métricas</li>
            </ul>
            <div className="mt-auto pt-6 text-center border-t border-purple-500/20">
              <span className="text-2xl font-bold text-purple-400">A partir de R$ 500</span>
            </div>
          </div>

          {/* Aplicativos */}
          <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 backdrop-blur p-8 rounded-xl border border-green-500/30 hover:border-green-400/50 transition-all duration-300 transform hover:scale-105 flex flex-col">
            <FaMobile className="text-5xl text-green-400 mb-6" />
            <h3 className="text-3xl font-bold mb-4">Aplicativos Web</h3>
            <p className="text-lg font-normal text-gray-300 mb-6">Sistemas e aplicações personalizadas para seu negócio. Inclui:</p>
            <ul className="text-base font-normal text-gray-300 space-y-2 flex-grow">
              <li className="flex items-center"><HiCheckCircle className="text-green-400 mr-2" /> Sistema personalizado</li>
              <li className="flex items-center"><HiCheckCircle className="text-green-400 mr-2" /> Banco de dados</li>
              <li className="flex items-center"><HiCheckCircle className="text-green-400 mr-2" /> Painel administrativo</li>
              <li className="flex items-center"><HiCheckCircle className="text-green-400 mr-2" /> Funciona em qualquer dispositivo</li>
            </ul>
            <div className="mt-auto pt-6 text-center border-t border-green-500/20">
              <span className="text-2xl font-bold text-green-400">Sob consulta</span>
            </div>
          </div>

          {/* Criação de Mídias Digitais */}
          <div className="bg-gradient-to-br from-orange-600/20 to-red-800/20 backdrop-blur p-8 rounded-xl border border-orange-500/30 hover:border-orange-400/50 transition-all duration-300 transform hover:scale-105 flex flex-col">
            <FaVideo className="text-5xl text-orange-400 mb-6" />
            <h3 className="text-3xl font-bold mb-4">Mídias Digitais</h3>
            <p className="text-lg font-normal text-gray-300 mb-6">Criação de conteúdo visual para suas campanhas e redes sociais. Inclui:</p>
            <ul className="text-base font-normal text-gray-300 space-y-2 flex-grow">
              <li className="flex items-center"><HiCheckCircle className="text-green-400 mr-2" /> Banners promocionais</li>
              <li className="flex items-center"><HiCheckCircle className="text-green-400 mr-2" /> Vídeos promocionais</li>
              <li className="flex items-center"><HiCheckCircle className="text-green-400 mr-2" /> Posts para redes sociais</li>
              <li className="flex items-center"><HiCheckCircle className="text-green-400 mr-2" /> Identidade visual</li>
            </ul>
            <div className="mt-auto pt-6 text-center border-t border-orange-500/20">
              <span className="text-2xl font-bold text-orange-400">A partir de R$ 300</span>
            </div>
          </div>
        </div>
      </div>

      {/* Seção de Portfólio/Projetos */}
      <div
        id="projetos"
        ref={(el) => maskRefs.current.push(el)}
        className="relative z-20 w-full min-h-[100vh] p-6 mt-20"
      >
        <h2 className="text-5xl font-bold text-center mb-8">Projetos em Destaque</h2>
        <p className="text-xl text-center text-gray-300 mb-16 max-w-3xl mx-auto">
          Conheça alguns dos projetos que desenvolvi e veja a qualidade do meu trabalho
        </p>
      
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {projectsData.map((project) => {
            const currentImageIndex = currentImageIndexes[project.id] || 0;
            
            const handleImageChange = (index) => {
              setCurrentImageIndexes(prev => ({
                ...prev,
                [project.id]: index
              }));
            };
            
            return (
              <div 
                key={project.id} 
                className="group bg-white/5 backdrop-blur border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
                onClick={() => project.url && window.open(project.url, '_blank', 'noopener,noreferrer')}
              >
                <div className="aspect-video bg-gray-800 relative overflow-hidden">
                  <div className="w-full h-full relative">
                    {/* Renderização dinâmica de mídia */}
                    {project.media.length > 0 ? (
                      project.media[currentImageIndex].type === 'video' ? (
                        <video 
                          className="w-full h-full object-cover"
                          autoPlay 
                          muted 
                          loop
                          playsInline
                        >
                          <source src={project.media[currentImageIndex].src} type="video/mp4" />
                        </video>
                      ) : (
                        <img 
                          src={project.media[currentImageIndex].src}
                          alt={project.media[currentImageIndex].alt} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextElementSibling.style.display = 'flex';
                          }}
                        />
                      )
                    ) : null}
                    
                    {/* Fallback sempre presente */}
                    <div 
                      className={`w-full h-full bg-gradient-to-br ${project.fallbackColor} flex items-center justify-center`}
                      style={{display: project.media.length === 0 ? 'flex' : 'none'}}
                    >
                      <div className="text-center">
                        <project.fallbackIcon className={`text-4xl ${project.iconColor} mx-auto mb-2`} />
                        <p className="text-gray-400 text-sm">{project.title}</p>
                      </div>
                    </div>
                    
                    {/* Botões de navegação - só aparecem se houver mais de 1 imagem */}
                    {project.media.length > 1 && (
                      <>
                        <button 
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                          onClick={() => handleImageChange(currentImageIndex === 0 ? project.media.length - 1 : currentImageIndex - 1)}
                        >
                          <HiChevronLeft className="text-xl" />
                        </button>
                        <button 
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                          onClick={() => handleImageChange(currentImageIndex === project.media.length - 1 ? 0 : currentImageIndex + 1)}
                        >
                          <HiChevronRight className="text-xl" />
                        </button>
                      </>
                    )}
                    
                    {/* Indicadores dinâmicos - só aparecem se houver mais de 1 imagem */}
                    {project.media.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {project.media.map((_, index) => (
                          <button 
                            key={index}
                            className={`w-2 h-2 rounded-full bg-white transition-opacity duration-200 ${
                              index === currentImageIndex ? 'opacity-100' : 'opacity-50 hover:opacity-75'
                            }`}
                            onClick={() => handleImageChange(index)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    {project.url && (
                      <div className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className={`${tech.color} px-3 py-1 rounded-full text-xs font-medium`}>
                        {tech.name}
                      </span>
                    ))}
                  </div>
                  {project.url && (
                    <div className="mt-4 text-blue-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Clique para visitar o projeto →
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Como funciona */}
      <div
        ref={(el) => maskRefs.current.push(el)}
        className="relative z-20 w-full min-h-[80vh] p-6 mt-20"
      >
        <h2 className="text-5xl font-bold text-center mb-16">Como funciona?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">1</div>
            <h3 className="text-2xl font-bold mb-3">Conversa Inicial</h3>
            <p className="text-lg font-normal text-gray-300">Conversamos sobre sua ideia, objetivos e necessidades</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">2</div>
            <h3 className="text-2xl font-bold mb-3">Proposta</h3>
            <p className="text-lg font-normal text-gray-300">Envio uma proposta detalhada com prazo e investimento</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">3</div>
            <h3 className="text-2xl font-bold mb-3">Desenvolvimento</h3>
            <p className="text-lg font-normal text-gray-300">Desenvolvimento do projeto com atualizações constantes</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">4</div>
            <h3 className="text-2xl font-bold mb-3">Entrega</h3>
            <p className="text-lg font-normal text-gray-300">Entrega do projeto finalizado e suporte pós-entrega</p>
          </div>
        </div>
      </div>

      {/* Seção de Contato */}
      <div
        id="contato"
        ref={(el) => maskRefs.current.push(el)}
        className="relative z-20 w-full min-h-[80vh] p-6 mt-20 mb-20"
      >
        <h2 className="text-5xl font-bold text-center mb-8">Vamos conversar sobre seu projeto?</h2>
        <p className="text-xl font-normal text-center text-gray-300 mb-12 max-w-3xl mx-auto">
          Estou aqui para transformar sua ideia em uma solução digital incrível. Entre em contato e vamos discutir como posso ajudar seu negócio a crescer!
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-8">
          <a 
            href="https://wa.me/5521990390610?text=Olá! Gostaria de conversar sobre um projeto" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-lg text-base font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
          >
            <FaWhatsapp className="text-xl" />
            Chamar no WhatsApp
          </a>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="border-2 border-white hover:bg-white hover:text-black px-8 py-4 rounded-lg text-base font-medium transition-all duration-300 flex items-center gap-3"
          >
            <FaEnvelope className="text-xl" />
            {showForm ? 'Fechar Formulário' : 'Enviar E-mail'}
          </button>
        </div>

        {/* Formulário de contato */}
        {showForm && (
          <div className="max-w-2xl mx-auto mt-12">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-xl">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Entre em Contato</h3>
                <p className="text-gray-400 text-sm">Preencha o formulário abaixo e retornarei em breve</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Nome completo</label>
                    <input
                      type="text"
                      name="nome"
                      placeholder="Digite seu nome"
                      value={form.nome}
                      onChange={handleChange}
                      required
                      className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 transition-all duration-200 hover:bg-white/10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">E-mail</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="seu@email.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 transition-all duration-200 hover:bg-white/10"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Mensagem</label>
                  <textarea
                    name="mensagem"
                    placeholder="Conte-me sobre seu projeto, suas necessidades e objetivos..."
                    value={form.mensagem}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 transition-all duration-200 hover:bg-white/10 resize-none"
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button 
                    type="submit" 
                    className="flex-1 bg-white text-black p-3 rounded-lg font-medium text-sm transition-all duration-200 hover:bg-gray-200 flex items-center justify-center gap-2"
                  >
                    <FaEnvelope className="text-sm" />
                    Enviar Mensagem
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 sm:flex-none bg-transparent border border-white/30 text-white p-3 rounded-lg font-medium text-sm transition-all duration-200 hover:bg-white/10 px-6"
                  >
                    Cancelar
                  </button>
                </div>
                
                {status && (
                  <div className={`text-center p-3 rounded-lg font-medium text-sm ${
                    status.includes('sucesso') 
                      ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
                      : 'bg-red-500/10 border border-red-500/20 text-red-400'
                  }`}>
                    {status}
                  </div>
                )}
              </form>
              
              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <p className="text-gray-400 text-sm mb-4">Ou entre em contato diretamente:</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a 
                    href="https://wa.me/5521990390610?text=Olá! Gostaria de conversar sobre um projeto" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <FaWhatsapp className="text-sm" />
                    WhatsApp
                  </a>
                  <a 
                    href="mailto:bryandaimex@gmail.com" 
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <FaEnvelope className="text-sm" />
                    E-mail Direto
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-base font-normal text-gray-300 mb-4">Resposta garantida em até 24 horas!</p>
          <div className="flex justify-center items-center gap-2 text-yellow-400">
            <FaRocket className="text-lg" />
            <span className="text-base font-medium">Vamos decolar juntos!</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
