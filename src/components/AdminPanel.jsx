import React, { useState } from 'react';
import { Upload, Trash2, Shield, Loader2, AlertTriangle, FileText, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { apiService } from '../services/api';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('upload');
    const [uploading, setUploading] = useState(false);
    const [resetting, setResetting] = useState(false);
    const [showResetConfirm, setShowResetConfirm] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const onDrop = async (acceptedFiles) => {
        if (acceptedFiles.length === 0) return;

        setUploading(true);
        setStatus({ type: '', message: '' });

        try {
            const file = acceptedFiles[0];
            const response = await apiService.uploadFile(file);
            setStatus({
                type: 'success',
                message: `Successfully uploaded: ${file.name} (${response.data.chunks_added} chunks)`
            });
        } catch (error) {
            console.error('Upload failed:', error);
            setStatus({
                type: 'error',
                message: error.response?.data?.detail || 'Upload failed. Check backend.'
            });
        } finally {
            setUploading(false);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'text/plain': ['.txt'],
            'text/markdown': ['.md']
        },
        multiple: false
    });

    const handleReset = async () => {
        setResetting(true);
        setShowResetConfirm(false);
        try {
            await apiService.resetSystem();
            setStatus({ type: 'success', message: 'Knowledge base has been completely reset.' });
        } catch (error) {
            setStatus({ type: 'error', message: 'Reset failed. Check backend.' });
        } finally {
            setResetting(false);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="glass-cyan p-6 rounded-3xl border border-neon-cyan/30">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-neon-cyan/20 rounded-xl flex items-center justify-center text-neon-cyan">
                        <Shield size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Admin Dashboard</h2>
                        <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Authenticated Access</p>
                    </div>
                </div>

                <div className="flex gap-2 p-1 bg-slate-900/50 rounded-xl mb-6">
                    <button
                        onClick={() => setActiveTab('upload')}
                        className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'upload' ? 'bg-neon-cyan text-slate-950 shadow-neon-cyan' : 'text-slate-400 hover:text-white'}`}
                    >
                        Upload Logic
                    </button>
                    <button
                        onClick={() => setActiveTab('system')}
                        className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'system' ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' : 'text-slate-400 hover:text-white'}`}
                    >
                        System
                    </button>
                </div>

                {activeTab === 'upload' ? (
                    <div className="space-y-4">
                        <div
                            {...getRootProps()}
                            className={`border-2 border-dashed rounded-2xl p-8 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 ${isDragActive ? 'border-neon-cyan bg-neon-cyan/10' : 'border-white/10 hover:border-white/20 bg-white/5'}`}
                        >
                            <input {...getInputProps()} />
                            {uploading ? (
                                <Loader2 className="text-neon-cyan animate-spin" size={40} />
                            ) : (
                                <Upload className={isDragActive ? 'text-neon-cyan' : 'text-slate-500'} size={40} />
                            )}
                            <div className="text-center">
                                <p className="text-slate-200 font-medium">Click or drag knowledge base file</p>
                                <p className="text-xs text-slate-500 mt-1">Supports PDF, TXT, MD</p>
                            </div>
                        </div>

                        {status.message && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className={`flex items-center gap-3 p-4 rounded-xl text-sm ${status.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}
                            >
                                {status.type === 'success' ? <CheckCircle size={18} /> : <AlertTriangle size={18} />}
                                {status.message}
                            </motion.div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="bg-red-500/5 border border-red-500/10 p-6 rounded-2xl text-center">
                            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Trash2 className="text-red-500" size={24} />
                            </div>
                            <h3 className="text-white font-bold mb-1">Reset Knowledge Base</h3>
                            <p className="text-slate-400 text-sm mb-6">This will delete all documents from the vector store index. This action cannot be undone.</p>

                            <button
                                onClick={() => setShowResetConfirm(true)}
                                disabled={resetting}
                                className="w-full bg-red-500/20 text-red-400 border border-red-500/30 font-bold py-3 rounded-xl hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
                            >
                                {resetting ? <Loader2 size={18} className="animate-spin" /> : 'Reset System'}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <AnimatePresence>
                {showResetConfirm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-950/80 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="glass p-8 rounded-3xl w-full max-w-sm border border-red-500/30"
                        >
                            <div className="flex items-center gap-3 text-red-500 mb-4">
                                <AlertTriangle size={24} />
                                <h3 className="text-xl font-bold">Are you sure?</h3>
                            </div>
                            <p className="text-slate-400 mb-8 leading-relaxed">
                                Resetting the system will clear all RAG documents. The chatbot will only have its base knowledge until you upload new files.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowResetConfirm(false)}
                                    className="flex-1 py-3 bg-white/5 text-slate-300 font-bold rounded-xl hover:bg-white/10"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleReset}
                                    className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl shadow-lg shadow-red-500/30 hover:bg-red-600 active:scale-95"
                                >
                                    Confirm Reset
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminPanel;
