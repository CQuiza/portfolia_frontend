import { Link, useLocation } from 'react-router-dom';
import { Lock, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { isAdmin, logout } = useAuth();
    const location = useLocation();
    const isHome = location.pathname === '/';

    const NavLink = ({ to, children }) => {
        if (isHome) {
            return <a href={to} className="hover:text-neon-cyan transition-colors">{children}</a>;
        }
        return <Link to={`/${to}`} className="hover:text-neon-cyan transition-colors">{children}</Link>;
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-center">
            <nav className="glass py-3 px-8 rounded-full flex items-center gap-8 text-slate-300 text-sm font-medium">
                <NavLink to="#hero">Home</NavLink>
                <NavLink to="#projects">Projects</NavLink>
                <NavLink to="#skills">Skills</NavLink>
                <NavLink to="#research">Research</NavLink>
                <NavLink to="#contact">Contact</NavLink>
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
