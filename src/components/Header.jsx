import { Link } from 'react-router-dom';
import { Lock, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { isAdmin, logout } = useAuth();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-center">
            <nav className="glass py-3 px-8 rounded-full flex items-center gap-8 text-slate-300 text-sm font-medium">
                <a href="#hero" className="hover:text-neon-cyan transition-colors">Home</a>
                <a href="#projects" className="hover:text-neon-cyan transition-colors">Projects</a>
                <a href="#skills" className="hover:text-neon-cyan transition-colors">Skills</a>
                <a href="#research" className="hover:text-neon-cyan transition-colors">Research</a>
                <a href="#contact" className="hover:text-neon-cyan transition-colors">Contact</a>
                <a
                    href={`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}/docs`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-neon-cyan transition-colors"
                >
                    Docs
                </a>

                <div className="w-px h-4 bg-white/10 mx-2"></div>

                {isAdmin ? (
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 hover:text-red-400 transition-colors"
                    >
                        <User size={16} />
                        <span>Logout</span>
                    </button>
                ) : (
                    <Link
                        to="/login"
                        className="flex items-center gap-2 hover:text-neon-cyan transition-colors"
                    >
                        <Lock size={16} />
                        <span>Login</span>
                    </Link>
                )}
            </nav>
        </header>
    );
};

export default Header;
