import React, { useState, useRef, useEffect } from 'react';
import { X, Send, User, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/utils';
import { trackEvent } from '../lib/analytics';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function AIAssistantWidget({mobileLayer=false}: {mobileLayer?:boolean}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!mobileLayer || !isOpen) return;
    closeRef.current?.focus({preventScroll: true});
    return () => toggleRef.current?.focus({preventScroll: true});
  }, [isOpen, mobileLayer]);
  const [keyboardViewport,setKeyboardViewport]=useState<{bottom:number;height:number}|null>(null);
  useEffect(()=>{
    if(!mobileLayer||!isOpen||!window.visualViewport){setKeyboardViewport(null);return;}
    const viewport=window.visualViewport;
    const resize=()=>setKeyboardViewport({bottom:Math.max(24,window.innerHeight-viewport.height-viewport.offsetTop+24),height:Math.min(600,Math.max(180,viewport.height-112))});
    resize();viewport.addEventListener('resize',resize);
    return ()=>viewport.removeEventListener('resize',resize);
  },[isOpen,mobileLayer]);
  const [hasStarted, setHasStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: 'Hola, soy el Asistente de Contexto de RAUVIA. Puedo ayudarte a entender mejor una situación de tu empresa o responder preguntas sobre RAUVIA. ¿Qué está ocurriendo?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: mobileLayer && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleOpenToggle = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState) {
      trackEvent('assistant_open');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (!hasStarted) {
      setHasStarted(true);
      trackEvent('assistant_start');
    }
    trackEvent('assistant_question');

    const userMessage = input.trim();
    setInput('');
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/llm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();
      
      if (response.ok && data.status === 'success') {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
        trackEvent('assistant_response');
        if (data.response.includes('LO QUE ENTENDIMOS')) {
          trackEvent('assistant_summary_generated');
        }
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Lo siento, hubo un problema al procesar tu solicitud.' }]);
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error de conexión con el servidor.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (typeof window === 'undefined') return null;

  return (
    <div style={keyboardViewport ? {bottom:keyboardViewport.bottom} : undefined} className={mobileLayer ? "rv-assistant fixed bottom-6 right-6 z-50" : "fixed bottom-6 right-6 z-50"}>
      {/* Floating Button */}
      <button
        ref={toggleRef}
        hidden={mobileLayer && isOpen}
        aria-label={mobileLayer ? "Abrir asistente RAUVIA" : undefined}
        onClick={handleOpenToggle}
        className={cn(
          "w-14 h-14 rounded-full bg-rauvia-navy text-white flex items-center justify-center shadow-xl hover:bg-rauvia-navy-light transition-all",
          isOpen && "rotate-90 scale-0 opacity-0 absolute"
        )}
      >
        <img src="/media/icono-asistente-rauvia-v2/simbolo-claro.svg" alt="Asistente RAUVIA" className="w-7 h-7" />
      </button>

      {/* Chat Window */}
      <div 
        onKeyDown={mobileLayer ? e => {if (e.key === 'Escape') {e.preventDefault();setIsOpen(false);}} : undefined}
        hidden={mobileLayer && !isOpen}
        role={mobileLayer ? "dialog" : undefined}
        aria-label={mobileLayer ? "Asistente RAUVIA" : undefined}
        className={cn(
          "absolute bottom-0 right-0 w-[90vw] sm:w-[450px] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col transition-all origin-bottom-right duration-300 border border-slate-200",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        )}
        style={{ height: keyboardViewport?.height || '600px', maxHeight: mobileLayer ? 'calc(100dvh - 112px - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px))' : '85vh' }}
      >
        {/* Header */}
        <div className="bg-rauvia-navy text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 flex items-center justify-center rounded-full">
              <img src="/media/icono-asistente-rauvia-v2/simbolo-claro.svg" alt="Asistente RAUVIA" className="w-5 h-5" />
            </div>
            <span className="font-bold">Asistente RAUVIA</span>
          </div>
          <button ref={closeRef} aria-label={mobileLayer ? "Cerrar asistente" : undefined} onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={cn("flex gap-3", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}>
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
                msg.role === 'user' ? "bg-rauvia-blue text-white" : "bg-white border border-slate-200 text-rauvia-navy shadow-sm overflow-hidden"
              )}>
                {msg.role === 'user' ? (
                  <User size={16} />
                ) : (
                  <img src="/media/icono-asistente-rauvia-v2/simbolo-oscuro.svg" alt="RAUVIA" className="w-5 h-5 object-contain" />
                )}
              </div>
              <div className={cn(
                "px-4 py-3 rounded-xl max-w-[85%] text-sm overflow-hidden",
                msg.role === 'user' ? "bg-rauvia-blue text-white rounded-tr-none shadow-sm" : "bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm"
              )}>
                {msg.role === 'assistant' ? (
                  <div className="markdown-body prose prose-sm max-w-none prose-p:leading-relaxed prose-headings:font-bold prose-headings:text-rauvia-navy">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-white border border-slate-200 text-rauvia-navy flex items-center justify-center mt-1 shadow-sm overflow-hidden">
                <img src="/media/icono-asistente-rauvia-v2/simbolo-oscuro.svg" alt="RAUVIA" className="w-5 h-5 object-contain" />
              </div>
              <div className="px-4 py-3 rounded-xl bg-white border border-slate-200 rounded-tl-none flex items-center gap-2 shadow-sm">
                <Loader2 size={16} className="animate-spin text-rauvia-blue" />
                <span className="text-xs text-slate-500 font-medium">Procesando...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-slate-200 flex gap-2">
          <input
            type="text"
            aria-label={mobileLayer ? "Describe tu situación" : undefined}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe tu situación..."
            className="min-w-0 flex-1 px-4 py-2.5 bg-slate-100 rounded-lg outline-none focus:ring-2 focus:ring-rauvia-blue/50 border border-transparent focus:border-rauvia-blue text-sm transition-all"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            aria-label={mobileLayer ? "Enviar mensaje" : undefined}
            disabled={!input.trim() || isLoading}
            className="w-11 h-11 rounded-lg bg-rauvia-navy text-white flex items-center justify-center hover:bg-rauvia-navy-light disabled:opacity-50 disabled:hover:bg-rauvia-navy transition-colors shadow-sm"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
