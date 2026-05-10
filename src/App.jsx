import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Header from './components/Header';

const ProtectedRoute = ({ children }) => {
  const { isAdmin, loading } = useAuth();
  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center">Loading...</div>;
  if (!isAdmin) return <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen relative overflow-hidden">
        {/* Mobile Watermark Logo */}
        <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center md:hidden opacity-[0.03]">
          <img src="/logo.png" alt="Watermark" className="w-[80%] max-w-sm grayscale" />
        </div>

        <div className="relative z-10">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              {/* Admin routes could go here if separate pages are needed */}
            </Routes>
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
