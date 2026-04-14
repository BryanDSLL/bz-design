import { useState } from 'react';
import { FaWhatsapp, FaLongArrowAltRight } from 'react-icons/fa';
import emailjs from 'emailjs-com';

export default function Contact() {
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    email: "",
    assunto: "",
    tipoServico: "",
    mensagem: "",
  });
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true); 
    setStatus(""); 

    emailjs
      .send(
        "service_9juv799",    
        "template_dw3r6ow",      
        {
          from_name: form.nome,
          from_phone: form.telefone,
          from_email: form.email,
          subject: form.assunto,
          service_type: form.tipoServico,
          message: form.mensagem,
        },
        "1SMiRCc2hriY-ZrAS"
      )
      .then(() => {
        setStatus("success");
        setForm({ nome: "", telefone: "", email: "", assunto: "", tipoServico: "", mensagem: "" });
      })
      .catch(() => {
        setStatus("error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section id="contato" className="w-full bg-black py-32 px-6 lg:px-12 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Text Side */}
        <div className="w-full lg:w-5/12 flex flex-col">
          <h2 className="text-5xl lg:text-7xl font-bold uppercase tracking-tight mb-8">
            Vamos<br/>Conversar.
          </h2>
          <p className="text-zinc-400 font-sans text-lg mb-12 max-w-sm">
            Pronto para transformar sua presença no ambiente digital? A excelência requer apenas o primeiro passo.
          </p>

          <a 
            href="https://wa.me/5521990390610?text=Olá! Gostaria de conversar sobre um projeto" 
            target="_blank" 
            rel="noopener noreferrer"
            className="magnetic inline-flex items-center gap-3 w-max bg-zinc-900 border border-zinc-800 hover:border-zinc-500 rounded-full py-4 px-6 text-sm uppercase tracking-widest font-semibold transition-all duration-300 group"
          >
            <FaWhatsapp className="text-xl text-green-400" />
            Vá para o WhatsApp
            <FaLongArrowAltRight className="group-hover:translate-x-2 transition-transform duration-300" />
          </a>
        </div>

        {/* Form Side */}
        <div className="w-full lg:w-7/12">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8 font-sans">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col border-b border-white/20 focus-within:border-white transition-colors">
                <label className="text-xs uppercase tracking-widest text-zinc-500 mb-2">Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                  className="bg-transparent border-none outline-none text-white pb-3 placeholder-zinc-700"
                  placeholder="Seu nome completo"
                />
              </div>
              <div className="flex flex-col border-b border-white/20 focus-within:border-white transition-colors">
                <label className="text-xs uppercase tracking-widest text-zinc-500 mb-2">Telefone</label>
                <input
                  type="tel"
                  name="telefone"
                  value={form.telefone}
                  onChange={handleChange}
                  required
                  className="bg-transparent border-none outline-none text-white pb-3 placeholder-zinc-700"
                  placeholder="(xx) xxxx-xxxx"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col border-b border-white/20 focus-within:border-white transition-colors">
                <label className="text-xs uppercase tracking-widest text-zinc-500 mb-2">E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="bg-transparent border-none outline-none text-white pb-3 placeholder-zinc-700"
                  placeholder="seu@novoemail.com"
                />
              </div>
              <div className="flex flex-col border-b border-white/20 focus-within:border-white transition-colors">
                <label className="text-xs uppercase tracking-widest text-zinc-500 mb-2">Assunto</label>
                <input
                  type="text"
                  name="assunto"
                  value={form.assunto}
                  onChange={handleChange}
                  required
                  className="bg-transparent border-none outline-none text-white pb-3 placeholder-zinc-700"
                  placeholder="A razão do contato"
                />
              </div>
            </div>

            <div className="flex flex-col border-b border-white/20 focus-within:border-white transition-colors">
              <label className="text-xs uppercase tracking-widest text-zinc-500 mb-2">Tipo de Serviço</label>
              <select
                name="tipoServico"
                value={form.tipoServico}
                onChange={handleChange}
                required
                className="bg-transparent border-none outline-none text-white pb-3 appearance-none cursor-pointer"
              >
                <option value="" className="bg-zinc-900 text-zinc-400">Selecione uma opção...</option>
                <option value="Sites Profissionais" className="bg-zinc-900">Sites Profissionais</option>
                <option value="Landing Pages" className="bg-zinc-900">Landing Pages</option>
                <option value="Aplicativos Web" className="bg-zinc-900">Aplicativos Web</option>
                <option value="Mídias Digitais" className="bg-zinc-900">Mídias Digitais</option>
                <option value="Outros" className="bg-zinc-900">Outros</option>
              </select>
            </div>

            <div className="flex flex-col border-b border-white/20 focus-within:border-white transition-colors">
              <label className="text-xs uppercase tracking-widest text-zinc-500 mb-2">Mensagem</label>
              <textarea
                name="mensagem"
                value={form.mensagem}
                onChange={handleChange}
                required
                rows="3"
                className="bg-transparent border-none outline-none text-white pb-3 placeholder-zinc-700 resize-none"
                placeholder="Detalhes interessantes do seu projeto..."
              />
            </div>

            <div className="flex items-center gap-6 mt-4">
              <button 
                type="submit" 
                disabled={isLoading}
                className="magnetic border border-white hover:bg-white hover:text-black uppercase tracking-widest text-xs font-bold py-4 px-10 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group flex gap-3 items-center"
              >
                {isLoading ? "Enviando..." : "Enviar Mensagem"}
                {!isLoading && <FaLongArrowAltRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 w-0 group-hover:w-auto" />}
              </button>

              {status === 'success' && (
                <span className="text-sm text-green-400">Mensagem recebida. Entraremos em contato.</span>
              )}
              {status === 'error' && (
                <span className="text-sm text-red-500">Erro ao enviar. Tente pelo WhatsApp.</span>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
