import { Link, useLocation } from 'react-router-dom';
import { Lock, User, Menu, X, Server } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Header = () => {
    const { isAdmin, logout } = useAuth();
    const location = useLocation();
    const isHome = location.pathname === '/';
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const NavLink = ({ to, children, onClick }) => {
        if (isHome) {
            return <a href={to} onClick={onClick} className="hover:text-neon-cyan transition-colors">{children}</a>;
        }
        return <Link to={`/${to}`} onClick={onClick} className="hover:text-neon-cyan transition-colors">{children}</Link>;
    };

    const NavItems = ({ onClick }) => (
        <>
            <NavLink to="#projects" onClick={onClick}>Projects</NavLink>
            <NavLink to="#skills" onClick={onClick}>Skills</NavLink>
            <NavLink to="#research" onClick={onClick}>Research</NavLink>
            <NavLink to="#contact" onClick={onClick}>Contact</NavLink>
            <a
                href={`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}/docs`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-neon-cyan transition-colors"
                onClick={onClick}
            >
                Docs
            </a>

            <div className="hidden md:block w-px h-4 bg-white/10 mx-2"></div>
            <div className="md:hidden h-px w-full bg-white/10 my-2"></div>

            <a
                href="https://auth.cristhianquiza.com"
                className="flex items-center gap-2 hover:text-neon-cyan transition-colors group relative"
            >
                <Server size={16} />
                <span>Hub Services</span>
                {/* Tooltip */}
                <div className="absolute top-full right-0 md:left-1/2 md:-translate-x-1/2 mt-4 md:mt-6 w-56 p-2 bg-slate-900 border border-white/10 rounded text-xs text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg text-center">
                    Access to services like: GeoServer, pgAdmin, RabbitMQ, or MinIO
                </div>
            </a>

            {isAdmin ? (
                <button
                    onClick={() => { logout(); onClick?.(); }}
                    className="flex items-center gap-2 hover:text-red-400 transition-colors"
                >
                    <User size={16} />
                    <span>Logout</span>
                </button>
            ) : (
                <Link
                    to="/login"
                    onClick={onClick}
                    className="flex items-center gap-2 hover:text-neon-cyan transition-colors"
                >
                    <Lock size={16} />
                    <span>Login</span>
                </Link>
            )}
        </>
    );

    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-6 md:flex md:justify-center">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex glass py-3 px-8 rounded-full items-center gap-8 text-slate-300 text-sm font-medium">
                <NavLink to="#hero">
                    <img src="/logo.png" alt="Logo" className="h-7 w-auto hover:scale-110 transition-transform" />
                </NavLink>
                <NavItems />
            </nav>

            {/* Mobile Header */}
            <div className="md:hidden flex justify-between items-center glass py-3 px-6 rounded-full w-full max-w-sm mx-auto">
                <NavLink to="#hero">
                    <img src="/logo.png" alt="Logo" className="h-7 w-auto" />
                </NavLink>
                <button onClick={toggleMenu} className="text-slate-300 hover:text-neon-cyan focus:outline-none">
                    <Menu size={24} />
                </button>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden" onClick={toggleMenu}></div>
            )}

            {/* Mobile Sidebar */}
            <div className={`fixed top-0 right-0 h-full w-64 bg-slate-950/95 backdrop-blur-md border-l border-white/10 p-6 z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-end mb-8">
                    <button onClick={toggleMenu} className="text-slate-300 hover:text-neon-cyan focus:outline-none">
                        <X size={24} />
                    </button>
                </div>
                <div className="flex flex-col gap-6 text-slate-300 text-base font-medium">
                    <NavItems onClick={toggleMenu} />
                </div>
            </div>
        </header>
    );
};

export default Header;
