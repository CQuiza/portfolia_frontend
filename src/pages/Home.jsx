import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Chatbot from '../components/Chatbot';
import AdminPanel from '../components/AdminPanel';
import { useAuth } from '../context/AuthContext';
import {
    ExternalLink, Github, Mail, ChevronRight, Terminal,
    MapPin, Globe, BookOpen, Download, Linkedin, Send,
    Code2, Cpu, Database, Layers, Eye, Ship, Bot, Sparkles
} from 'lucide-react';

const Home = () => {
    const { isAdmin } = useAuth();
    const chatbotRef = useRef(null);

    const handleEmailClick = () => {
        window.location.href = "mailto:crtquiza@gmail.com";
    };

    const handleAskBot = (projectTitle) => {
        const message = `De qué se trata el proyecto ${projectTitle} de Cristhian?`;
        document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });

        // Small delay to ensure scroll starts before bot logic if needed, 
        // but smooth scroll is handled by CSS mostly.
        setTimeout(() => {
            if (chatbotRef.current) {
                chatbotRef.current.triggerMessage(message);
            }
        }, 500);
    };

    const projects = [
        {
            title: 'ODIN - PRESERVE',
            desc: 'Distributed Visual Intelligence Pipeline (SAM2, GroundingDINO & LLM) for defense against drones.',
            tags: ['YOLO', 'SAM2', 'GroundingDINO', 'Ollama', 'RabbitMQ', 'Postgres'],
            icon: <Eye size={24} />,
            url: "https://preserve-he.eu/"
        },
        {
            title: 'RESCUE-5G',
            desc: 'Distributed system for 5G network quality and floating debris detection in ports.',
            tags: ['GeoDjango', 'PostGIS', 'YOLO', 'OpenCV', 'FFMPEG', 'WebRTC', 'MediaMTX', 'Kafka'],
            icon: <Ship size={24} />,
            url: "https://imagineb5g.eu/rescue-5g-in-imagine-b5g-open-call-2/"
        },
        {
            title: 'PORTFOLIA',
            desc: 'Agent portfolio based on State Graphs, RAG technique, and external search with Tavily',
            tags: ['LangGraph', 'Ollama', 'Tavily', 'QdrantDB', 'FastAPI', 'Docker'],
            icon: <Bot size={24} />,
            url: "#"
        },
        {
            title: 'Video Movement Detector',
            desc: 'Modular server for vehicular movement detection using YOLO and MediaMTX.',
            tags: ['YOLO', 'OpenCV', 'MediaMTX', 'FFMPEG'],
            icon: <Eye size={24} />,
            url: null
        }
    ];

    const research = [
        {
            title: "Mobile Cadastral Application with Open-Source Software in Colombia",
            journal: "ISPRS International Journal of Geo-Information (MDPI)",
            date: "Feb 20, 2025",
            url: "https://www.mdpi.com/2220-9964/14/3/96",
            pdf: "/public/documents/papers/ijgi-14-00096-v2.pdf"
        },
        {
            title: "Diagnosis of the Situation of the Land Administration System in Ibero-America",
            journal: "Land (MDPI)",
            date: "Jun 30, 2025",
            url: "https://www.mdpi.com/2073-445X/14/7/1376",
            pdf: "/public/documents/papers/land-14-01376-v2.pdf"
        }
    ];

    const skills = [
        {
            category: "AI & Computer Vision",
            items: [
                { name: "YOLO", url: "https://docs.ultralytics.com/" },
                { name: "SAM2", url: "https://segment-anything.com/" },
                { name: "Grounding DINO", url: "https://github.com/IDEA-Research/GroundingDINO" },
                { name: "Ollama", url: "https://ollama.com/" },
                { name: "LangChain & LangGraph", url: "https://www.langchain.com/" },
                { name: "Qdrandt", url: "https://qdrant.tech/" }
            ]
        },
        {
            category: "Backend & Systems",
            items: [
                { name: "FastAPI", url: "https://fastapi.tiangolo.com/" },
                { name: "Kafka", url: "https://kafka.apache.org/" },
                { name: "RabbitMQ", url: "https://www.rabbitmq.com/" },
                { name: "PostGIS", url: "https://postgis.net/" },
                { name: "Docker", url: "https://www.docker.com/" }
            ]
        },
        {
            category: "Geomatics",
            items: [
                { name: "ArcGIS", url: "https://www.esri.com/en-us/arcgis/products/arcgis-pro/overview" },
                { name: "QGIS", url: "https://www.qgis.org/" },
                { name: "RtkLIB", url: "https://www.unavco.org/software/data-processing/postprocessing/rtklib/rtklib.html" },
                { name: "Agisoft Metashape", url: "https://www.agisoft.com/" },
                { name: "GEE", url: "https://earthengine.google.com/" }
            ]
        }
    ];

    return (
        <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-40">

            {/* Hero Section */}
            <section id="hero" className="min-h-[80vh] flex flex-col lg:flex-row items-center gap-16 justify-center relative">
                {/* Large Glowing Logo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute -top-24 left-4 lg:left-12 z-0 pointer-events-none"
                >
                    <div className="relative group">
                        <img
                            src="/logo.png"
                            alt="Large Logo"
                            className="w-48 h-auto mix-blend-screen opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                        />
                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-neon-cyan/20 blur-[60px] rounded-full -z-10 animate-pulse"></div>
                    </div>
                </motion.div>

                <div className="flex-1 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-neon-cyan/20 text-neon-cyan text-xs font-bold uppercase tracking-wider shadow-neon-cyan/20"
                    >
                        <span className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></span>
                        Geomatic, AI Developer & ML Engineer
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl lg:text-7xl font-black text-white leading-tight"
                    >
                        Hello, I'm an <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-blue-400 neon-text-glow">AI Developer</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 text-xl max-w-xl leading-relaxed"
                    >
                        I'm Cristhian geomatics engineer specializing in Large Language Models, Machine Learning, Computer Vision Models, and geoprocessing.
                        <br />Integrating Autonomy. Visualizing Intelligence.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap gap-4"
                    >
                        <button
                            onClick={handleEmailClick}
                            className="bg-neon-cyan text-slate-950 px-8 py-4 rounded-2xl font-black uppercase tracking-wider flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-neon-cyan"
                        >
                            Hire Me
                        </button>
                        <a
                            href="/public/documents/cv/CV_QUIZACRISTHIAN.pdf"
                            download
                            className="glass text-white px-8 py-4 rounded-2xl font-black uppercase tracking-wider flex items-center gap-2 hover:bg-white/10 transition-all border border-white/10"
                        >
                            Download CV
                        </a>
                        <a
                            href={`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}/docs`}
                            target="_blank"
                            rel="noreferrer"
                            className="glass text-white px-8 py-4 rounded-2xl font-black uppercase tracking-wider flex items-center gap-2 hover:bg-white/10 transition-all border border-white/10"
                        >
                            <Terminal size={20} /> API Docs
                        </a>
                    </motion.div>
                </div>

                <div className="flex-1 w-full flex justify-center lg:justify-end">
                    <Chatbot ref={chatbotRef} />
                </div>
            </section>

            {/* Admin Panel (if authenticated) */}
            <AnimatePresence>
                {isAdmin && (
                    <motion.section
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                    >
                        <AdminPanel />
                    </motion.section>
                )}
            </AnimatePresence>

            {/* Projects Section */}
            <section id="projects" className="space-y-12">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6">
                    <div className="text-center md:text-left">
                        <h2 className="text-4xl font-bold text-white mb-4">Featured Projects</h2>
                        <div className="w-20 h-1.5 bg-neon-cyan rounded-full shadow-neon-cyan mx-auto md:mx-0"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {projects.map((p, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className="glass p-6 rounded-3xl border border-white/5 hover:border-neon-cyan/20 transition-all group h-full flex flex-col"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-12 h-12 bg-neon-cyan/10 rounded-xl flex items-center justify-center text-neon-cyan border border-neon-cyan/10">
                                    {p.icon}
                                </div>
                                {p.url && (
                                    <a href={p.url} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-neon-cyan transition-colors">
                                        <ExternalLink size={20} />
                                    </a>
                                )}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neon-cyan transition-colors">{p.title}</h3>
                            <p className="text-slate-400 text-xs mb-6 leading-relaxed flex-1">{p.desc}</p>

                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-1.5">
                                    {p.tags.map(t => (
                                        <span key={t} className="text-[9px] font-bold text-slate-500 uppercase tracking-widest px-2 py-0.5 rounded bg-slate-900/50 border border-white/5">{t}</span>
                                    ))}
                                </div>

                                <button
                                    onClick={() => handleAskBot(p.title)}
                                    className="w-full py-3 rounded-xl bg-neon-cyan/5 border border-neon-cyan/20 text-neon-cyan text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-neon-cyan hover:text-slate-950 transition-all group"
                                >
                                    <Sparkles size={14} className="group-hover:animate-spin" />
                                    Consult Portfol-IA
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="space-y-12">
                <div className="text-center md:text-left">
                    <h2 className="text-4xl font-bold text-white mb-4">Technical Stack</h2>
                    <div className="w-20 h-1.5 bg-neon-cyan rounded-full shadow-neon-cyan mx-auto md:mx-0"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {skills.map((cat, i) => (
                        <div key={i} className="space-y-6">
                            <h3 className="text-xl font-bold text-slate-300 flex items-center gap-3">
                                <Code2 className="text-neon-cyan" size={20} /> {cat.category}
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {cat.items.map((skill, j) => (
                                    <a
                                        key={j}
                                        href={skill.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="px-5 py-2.5 rounded-full glass border border-white/5 text-slate-400 text-sm hover:border-neon-cyan/40 hover:text-neon-cyan transition-all flex items-center gap-2 group"
                                    >
                                        <span>{skill.name}</span>
                                        <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Research Section */}
            <section id="research" className="space-y-12">
                <div className="text-center md:text-left">
                    <h2 className="text-4xl font-bold text-white mb-4 flex items-center gap-4">
                        <BookOpen className="text-neon-cyan" /> Research & Publications
                    </h2>
                    <div className="w-20 h-1.5 bg-neon-cyan rounded-full shadow-neon-cyan mx-auto md:mx-0"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {research.map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            className="glass-cyan p-8 rounded-3xl border border-white/5 flex flex-col justify-between"
                        >
                            <div>
                                <span className="text-neon-cyan text-[10px] font-bold uppercase tracking-widest">{item.date}</span>
                                <h3 className="text-2xl font-bold text-white mt-2 mb-4">{item.title}</h3>
                                <p className="text-slate-400 text-sm mb-6 italic">{item.journal}</p>
                            </div>
                            <div className="flex gap-4">
                                <a href={item.url} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-all border border-white/10 text-sm font-bold">
                                    <Globe size={18} /> View Web
                                </a>
                                <a href={item.pdf} download className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-neon-cyan text-slate-950 hover:bg-neon-cyan/90 transition-all text-sm font-bold shadow-neon-cyan/20">
                                    <Download size={18} /> Download
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="space-y-12 pb-20">
                <div className="glass-cyan p-12 rounded-[3rem] border border-neon-cyan/20 relative overflow-hidden text-center md:text-left">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/5 blur-[100px] -mr-32 -mt-32"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="space-y-6 max-w-xl">
                            <h2 className="text-5xl font-black text-white">Let's build something <span className="text-neon-cyan italic">extraordinary</span></h2>
                            <p className="text-slate-400 text-lg">Ready to integrate AI into your next project or looking for a Geomatics engineer for specialized processing? Get in touch today.</p>

                            <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-4">
                                <div className="flex items-center gap-3 text-slate-300">
                                    <Mail className="text-neon-cyan" size={20} /> crtquiza@gmail.com
                                </div>
                                <div className="flex items-center gap-3 text-slate-300">
                                    <Linkedin className="text-neon-cyan" size={20} /> cristhianquiza
                                </div>
                                <div className="flex items-center gap-3 text-slate-300">
                                    <Github className="text-neon-cyan" size={20} /> CQuiza
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 w-full md:w-auto">
                            <button
                                onClick={handleEmailClick}
                                className="bg-neon-cyan text-slate-950 px-10 py-5 rounded-full font-black uppercase tracking-wider flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-neon-cyan w-full text-center"
                            >
                                <Send size={20} /> Contact Me
                            </button>
                            <div className="flex gap-4">
                                <a
                                    href="https://www.linkedin.com/in/cristhianquiza/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex-1 glass text-white px-6 py-4 rounded-full font-bold uppercase tracking-wider flex items-center justify-center gap-3 hover:bg-white/10 transition-all border border-white/10 text-xs"
                                >
                                    <Linkedin size={18} /> LinkedIn
                                </a>
                                <a
                                    href="https://github.com/CQuiza"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex-1 glass text-white px-6 py-4 rounded-full font-bold uppercase tracking-wider flex items-center justify-center gap-3 hover:bg-white/10 transition-all border border-white/10 text-xs"
                                >
                                    <Github size={18} /> GitHub
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Background Decor */}
            <div className="fixed inset-0 pointer-events-none -z-10 opacity-20">
                <div className="absolute top-1/4 -left-20 w-80 h-80 bg-neon-cyan/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-600/10 blur-[120px] rounded-full"></div>
            </div>
        </div>
    );
};

export default Home;
