import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Send, Bot, User, Minimize2, X, Info, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiService } from '../services/api';

const Chatbot = forwardRef((props, ref) => {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hi! Ask me anything about my experience, projects, or AI in general!' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [conversationId, setConversationId] = useState(null);
    const messagesContainerRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        const timer = setTimeout(scrollToBottom, 50);
        return () => clearTimeout(timer);
    }, [messages, loading]);

    useImperativeHandle(ref, () => ({
        triggerMessage: (msg) => {
            sendMessage(msg);
        }
    }));

    const sendMessage = async (msg) => {
        const userMsg = msg.trim();
        if (!userMsg || loading) return;

        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setLoading(true);

        try {
            const response = await apiService.chat(userMsg, conversationId);
            const data = response.data;

            setConversationId(data.conversation_id);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: data.response,
                sources: data.sources,
                tool: data.tool_used
            }]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: '❌ Sorry, I encountered an error. Please check if the backend is running.'
            }]);
        } finally {
            setLoading(false);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;
        const msg = input;
        setInput('');
        sendMessage(msg);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-cyan rounded-3xl overflow-hidden flex flex-col h-[600px] w-full max-w-lg shadow-2xl relative"
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-50"></div>

            {/* Header */}
            <div className="p-5 flex items-center justify-between border-b border-white/5 bg-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-neon-cyan/20 rounded-xl flex items-center justify-center border border-neon-cyan/30 text-neon-cyan">
                        <Bot size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-lg leading-tight">Portfol-IA</h3>
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Online</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="text-slate-400 hover:text-white transition-colors"><Minimize2 size={18} /></button>
                    <button className="text-slate-400 hover:text-white transition-colors"><X size={18} /></button>
                </div>
            </div>

            {/* Messages */}
            <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar"
            >
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border border-white/10 ${msg.role === 'user' ? 'bg-slate-800 text-slate-300' : 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20'}`}>
                                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                            </div>
                            <div className={`space-y-2`}>
                                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-slate-800 text-slate-200 rounded-tr-none' : 'bg-white/5 text-slate-300 rounded-tl-none border border-white/5'}`}>
                                    {msg.content}

                                    {msg.tool && (
                                        <div className="mt-3 flex items-center gap-2">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${msg.tool === 'rag' ? 'bg-blue-500/20 text-blue-400' : 'bg-orange-500/20 text-orange-400'}`}>
                                                {msg.tool}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {msg.sources && msg.sources.length > 0 && (
                                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                                        <div className="flex items-center gap-2 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                            <Info size={12} /> Sources
                                        </div>
                                        <div className="space-y-1.5">
                                            {msg.sources.map((s, idx) => (
                                                <div key={idx} className="text-[11px] text-slate-400 flex items-start gap-1.5 truncate">
                                                    <span className="text-neon-cyan opacity-50">•</span>
                                                    {s.source.startsWith('http') ? (
                                                        <a href={s.source} target="_blank" rel="noreferrer" className="hover:text-neon-cyan underline decoration-white/10">
                                                            {s.source.length > 40 ? s.source.substring(0, 40) + '...' : s.source}
                                                        </a>
                                                    ) : s.source}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20">
                                <Bot size={16} />
                            </div>
                            <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5 flex gap-1 items-center">
                                <span className="w-1.5 h-1.5 bg-neon-cyan/50 rounded-full animate-bounce"></span>
                                <span className="w-1.5 h-1.5 bg-neon-cyan/50 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                <span className="w-1.5 h-1.5 bg-neon-cyan/50 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input */}
            <form onSubmit={handleFormSubmit} className="p-5 border-t border-white/5">
                <div className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={loading}
                        placeholder="Type your message here..."
                        className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-3.5 pr-14 text-white text-sm focus:outline-none focus:border-neon-cyan/50 transition-colors disabled:opacity-50"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || loading}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-neon-cyan text-slate-950 rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-neon-cyan disabled:opacity-50 disabled:scale-100 disabled:shadow-none"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </form>
        </motion.div >
    );
});

export default Chatbot;
