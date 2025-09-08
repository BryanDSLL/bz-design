"use client";

import { useRef, useState } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Home() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const chatRef = useRef(null);
  const fileInputRef = useRef(null);

  function downloadFile(content, filename) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  }

  function removeFile() {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  async function enviar() {
    if (!msg.trim() && !selectedFile) return;
    
    const userId = "usuario1";
    let messageContent = msg;
    
    if (selectedFile) {
      try {
        const fileContent = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.onerror = reject;
          reader.readAsText(selectedFile);
        });
        
        messageContent = msg + (msg ? '\n\n' : '') + `[Arquivo anexado: ${selectedFile.name}]\n${fileContent}`;
      } catch (error) {
        alert('Erro ao ler o arquivo. Tente novamente.');
        return;
      }
    }

    setChat((prev) => [
      ...prev,
      { 
        autor: "Você", 
        texto: msg,
        arquivo: selectedFile ? { nome: selectedFile.name, conteudo: null } : null
      },
      { autor: "Bra.IA", texto: "__LOADING__" }
    ]);
    
    setMsg("");
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setLoading(true);
    
    setTimeout(() => {
      if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, 10);
    
    try {
      const res = await fetch("http://172.16.31.176:3001/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, mensagem: messageContent })
      });
      const data = await res.json();
      setChat((prev) => {
        const novo = [...prev];
        const idx = novo.findIndex(x => x.texto === "__LOADING__");
        if (idx !== -1) novo[idx] = { autor: "Bra.IA", texto: data.resposta };
        return novo;
      });
    } finally {
      setLoading(false);
      setTimeout(() => {
        if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }, 10);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !loading) enviar();
  }

  function formatarMensagem(texto) {
    // Substituir aspas invertidas por aspas normais
    texto = texto.replace(/`/g, '"');
    
    const regexBloco = /```([\w]*)?\n([\s\S]*?)```/g;
    const regexInline = /`([^`]+)`/g;
    const regexLista = /^\s*[-*]\s+(.+)$/gm;
    const regexNegrito = /"([^"]+?)"/g;
    const regexTitulo = /^(#{1,6})\s+(.+)$/gm;
    const regexParagrafo = /^(?!```|#{1,6}\s|\s*[-*]\s)(.+)$/gm;
    
    let partes = [];
    let lastIndex = 0;
    let match;
    
    // Processar blocos de código
    while ((match = regexBloco.exec(texto)) !== null) {
      if (match.index > lastIndex) {
        partes.push(texto.slice(lastIndex, match.index));
      }
      
      const language = match[1] || 'txt';
      const code = match[2];
      const filename = `codigo.${language === '' ? 'txt' : language}`;
      
      partes.push(
        <div key={match.index} className="relative group">
          <SyntaxHighlighter
            language={language === '' ? 'text' : language}
            style={vscDarkPlus}
            customStyle={{
              backgroundColor: '#0a0612',
              border: '1px solid #7c3aed55',
              borderRadius: '8px',
              margin: '8px 0',
              padding: '16px',
              fontSize: '14px',
              fontFamily: 'Consolas, Monaco, "Courier New", monospace'
            }}
            codeTagProps={{
              style: {
                fontFamily: 'Consolas, Monaco, "Courier New", monospace'
              }
            }}
          >
            {code}
          </SyntaxHighlighter>
          <button
            onClick={() => downloadFile(code, filename)}
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 bg-[#16121f]/80 backdrop-blur-sm text-[#b18fff] p-2 rounded-md text-xs hover:bg-[#2d1a4d]/90 hover:text-white transition-all duration-200 shadow-lg border border-[#b18fff]/20"
            title="Baixar arquivo"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7,10 12,15 17,10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </button>
        </div>
      );
      lastIndex = regexBloco.lastIndex;
    }
    if (lastIndex < texto.length) {
      partes.push(texto.slice(lastIndex));
    }

    return partes.map((parte, i) => {
      if (typeof parte === "string") {
        // Processar títulos
        let tituloMatch = regexTitulo.exec(parte);
        if (tituloMatch) {
          const nivel = tituloMatch[1].length;
          const textoTitulo = tituloMatch[2];
          const tamanhoClasses = {
            1: "text-2xl font-bold text-[#b18fff] mt-6 mb-4",
            2: "text-xl font-bold text-[#b18fff] mt-5 mb-3",
            3: "text-lg font-bold text-[#b18fff] mt-4 mb-2",
            4: "text-base font-bold text-[#b18fff] mt-3 mb-2",
            5: "text-sm font-bold text-[#b18fff] mt-2 mb-1",
            6: "text-xs font-bold text-[#b18fff] mt-2 mb-1"
          };
          return <div key={i} className={tamanhoClasses[nivel]}>{textoTitulo}</div>;
        }
        
        // Processar listas
        const lista = [];
        let lastList = 0;
        let mList;
        let isList = false;
        while ((mList = regexLista.exec(parte)) !== null) {
          isList = true;
          if (mList.index > lastList) lista.push(parte.slice(lastList, mList.index));
          lista.push(
            <li key={mList.index} className="ml-6 list-disc text-[#b18fff] leading-relaxed mb-1">{mList[1]}</li>
          );
          lastList = regexLista.lastIndex;
        }
        if (isList) {
          if (lastList < parte.length) lista.push(parte.slice(lastList));
          return <ul key={i} className="mb-2">{lista}</ul>;
        }
        // Verificar se é um parágrafo
        const paragrafos = [];
        let lastPara = 0;
        let mPara;
        let isParagrafo = false;
        
        // Processar texto com formatação inline
        const processarTextoInline = (texto) => {
          const subpartes = [];
          let last = 0;
          let m;
          while ((m = regexInline.exec(texto)) !== null) {
            if (m.index > last) subpartes.push(texto.slice(last, m.index));
            subpartes.push(
              <code key={m.index} className="bg-[#16121f] text-[#b18fff] px-1.5 py-0.5 rounded text-sm mx-1">
                {m[1]}
              </code>
            );
            last = regexInline.lastIndex;
          }
          let textoFinal = last < texto.length ? texto.slice(last) : "";
          let negritoPartes = [];
          let lastBold = 0;
          let mBold;
          while ((mBold = regexNegrito.exec(textoFinal)) !== null) {
            if (mBold.index > lastBold) negritoPartes.push(textoFinal.slice(lastBold, mBold.index));
            negritoPartes.push(
              <b key={mBold.index} className="font-bold text-[#b18fff]">{mBold[1]}</b>
            );
            lastBold = regexNegrito.lastIndex;
          }
          if (lastBold < textoFinal.length) negritoPartes.push(textoFinal.slice(lastBold));
          subpartes.push(...negritoPartes);
          return subpartes;
        };
        
        // Verificar se o texto contém múltiplos parágrafos
        while ((mPara = regexParagrafo.exec(parte)) !== null) {
          isParagrafo = true;
          if (mPara.index > lastPara) paragrafos.push(parte.slice(lastPara, mPara.index));
          paragrafos.push(
            <p key={mPara.index} className="mb-4">{processarTextoInline(mPara[1])}</p>
          );
          lastPara = regexParagrafo.lastIndex;
        }
        
        if (isParagrafo) {
          if (lastPara < parte.length) paragrafos.push(parte.slice(lastPara));
          return <div key={i} className="space-y-2">{paragrafos}</div>;
        }
        
        // Se não for parágrafo, processar normalmente
        return <span key={i}>{processarTextoInline(parte)}</span>;
      }
      return parte;
    });
  }

  return (
    <div className="h-screen flex bg-gradient-to-br from-[#0a0612] to-[#16121f] text-[#eee] font-sans relative overflow-hidden">
      <div className="font-bold text-xl tracking-wide text-[#b18fff] drop-shadow-lg whitespace-nowrap absolute left-20 top-4 z-10">
        Bra.IA
      </div>
      {/* Sidebar */}
      <aside className="w-16 bg-[#0f0a1a] border-r border-[#b18fff55] flex flex-col items-center py-4 space-y-6">
        <button className="text-[#b18fff] hover:text-white transition-colors" title="Menu">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <button className="text-[#b18fff] hover:text-white transition-colors" title="Chat">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-message-circle">
            <path d="M21 11.5a8.38 8.38 0 0 1-1.9 5.4 8.5 8.5 0 0 1-6.6 3.1 8.38 8.38 0 0 1-5.4-1.9L3 21l1.9-5.4a8.38 8.38 0 0 1-1.9-5.4 8.5 8.5 0 0 1 3.1-6.6 8.38 8.38 0 0 1 5.4-1.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-between px-6 py-8 h-screen overflow-hidden">
      

      <div className="w-full max-w-5xl flex flex-col space-y-4 pt-12">
        <div
          id="chat"
          ref={chatRef}
          className="w-full bg-[#0f0a1a]/95 rounded-2xl p-8 overflow-y-auto shadow-2xl flex flex-col gap-4 scrollbar-thin scrollbar-thumb-[#b18fff80] scrollbar-track-[#16121f] h-[calc(100vh-220px)]"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#b18fff80 #16121f' }}
        >
        {chat.length === 0 && (
          <div className="text-[#b18fff99] text-center mt-20 text-lg">
            Envie uma mensagem para começar a conversa!
          </div>
        )}
        {chat.map((item, idx) => (
          <div
            key={idx}
            className={
              (item.autor === "Você"
                ? "self-end bg-[#16121f] text-[#e2d6ff] rounded-2xl rounded-br-md border border-[#7c3aed33]"
                : "self-start bg-[#2d1a4d] text-[#b18fff] rounded-2xl rounded-bl-md") +
              " px-5 py-3 max-w-2xl text-base shadow-md mb-1 leading-relaxed"
            }
          >
            <span className="font-semibold text-xs opacity-70 block mb-1">{item.autor}</span>
            {item.arquivo && (
              <div className="bg-[#16121f] px-3 py-2 rounded mb-2 text-sm">
                📎 {item.arquivo.nome}
              </div>
            )}
            {item.texto === "__LOADING__" ? (
              <span className="flex items-center gap-2"><svg className="animate-spin h-5 w-5 text-[#b18fff]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="#b18fff" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" /></svg> <span className="text-[#b18fff99]">Pensando...</span></span>
            ) : (
              <span>
                {formatarMensagem(item.texto)}
              </span>
            )}
          </div>
        ))}
        </div>
        
        {selectedFile && (
        <div className="w-full max-w-5xl mb-4 bg-[#16121f] rounded-lg p-3 flex items-center justify-between border border-[#b18fff55]">
          <span className="text-[#b18fff] text-sm">
            📎 {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
          </span>
          <button
            onClick={removeFile}
            className="text-[#ff6b6b] hover:text-[#ff5252] transition-colors"
            title="Remover arquivo"
          >
            ✕
          </button>
        </div>
      )}

      <div className="flex gap-3 w-full">
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          className="hidden"
          accept=".txt,.js,.json,.html,.css,.md,.py,.java,.cpp,.c,.ts,.jsx,.tsx,.xml,.csv"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={loading}
          className="px-3 py-3 rounded-lg border-2 border-[#b18fff] bg-[#0a0612] text-[#b18fff] font-bold text-base hover:bg-[#16121f] hover:text-white transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          title="Anexar arquivo"
        >
          📎
        </button>
        
        <input
          id="msg"
          value={msg}
          onChange={e => setMsg(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          className="flex-1 px-4 py-3 rounded-lg border border-[#b18fff55] bg-[#16121f] text-[#eee] text-base outline-none shadow-md placeholder:text-[#b18fff99] scrollbar-thin scrollbar-thumb-[#b18fff80] scrollbar-track-[#16121f]"
          placeholder="Digite sua mensagem..."
        />
        <button
          onClick={enviar}
          disabled={loading}
          className="px-7 py-3 rounded-lg border-2 border-[#b18fff] bg-[#0a0612] text-[#b18fff] font-bold text-base tracking-wide shadow-md transition-all duration-200 hover:bg-[#16121f] hover:text-white hover:border-[#b18fff] focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center gap-2 justify-center"><svg className="animate-spin h-5 w-5 text-[#b18fff]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="#b18fff" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" /></svg> Enviando...</span>
          ) : "Enviar"}
        </button>
      </div>
        <div className="mt-4 text-[#b18fff55] text-xs tracking-wide">
          <a href="https://github.com/bryandsll" target="_blank" rel="noopener noreferrer" className=" hover:text-white transition-colors">Developed by github.com/BryanDSLL</a>
        </div>
      </div>
      </main>
    </div>
  );
}
