import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User as UserIcon, LogIn } from 'lucide-react';
import Logo from './Logo';
import { useAuth } from '../context/AuthContext';

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const isActive = (path: string) => location.pathname === path 
    ? "text-terracotta-600 font-semibold" 
    : "text-slate-600 hover:text-sage-600 transition-colors duration-200";

  // Helper to handle navigation to sections
  const scrollToSection = (id: string) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProfileClick = () => {
    setIsOpen(false);
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="bg-sand-50/80 backdrop-blur-md border-b border-white/50 sticky top-10 z-40 shadow-sm shadow-sand-100/30">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <Logo className="w-12 h-12 transition-transform duration-300 group-hover:scale-105" />
            <span className="text-xl md:text-2xl font-serif font-bold text-slate-800 tracking-tight group-hover:text-sage-600 transition-colors">
              Our Ears Are Open
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-slate-600 hover:text-sage-500 transition">
            {isOpen ? <X /> : <Menu />}
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={`text-sm tracking-wide ${isActive('/')}`}>Home</Link>
            
            <button onClick={() => scrollToSection('listeners')} className="text-sm tracking-wide text-slate-600 hover:text-sage-600 transition-colors duration-200">
              Listeners
            </button>

            <Link to="/communicate?mode=chat" className={`text-sm tracking-wide ${location.pathname === '/communicate' && location.search.includes('chat') ? "text-terracotta-600 font-semibold" : "text-slate-600 hover:text-sage-600 transition-colors"}`}>
              Chat
            </Link>

            <Link to="/communicate?mode=call" className={`text-sm tracking-wide ${location.pathname === '/communicate' && location.search.includes('call') ? "text-terracotta-600 font-semibold" : "text-slate-600 hover:text-sage-600 transition-colors"}`}>
              Schedule
            </Link>

            <Link to="/donate" className={`text-sm tracking-wide ${isActive('/donate')}`}>Donate</Link>
            
            <div className="h-4 w-px bg-sand-300 mx-2"></div>
            
            <button onClick={handleProfileClick} className={`flex items-center gap-2 text-sm tracking-wide ${isActive('/profile')}`}>
              {isAuthenticated ? <UserIcon size={16} /> : <LogIn size={16} />}
              <span>{isAuthenticated ? 'Profile' : 'Log In'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4 border-t border-sand-200/50 pt-4 animate-fade-in bg-white/50 rounded-b-2xl backdrop-blur-md">
            <Link to="/" onClick={() => setIsOpen(false)} className={`px-4 ${isActive('/')}`}>Home</Link>
            <button onClick={() => scrollToSection('listeners')} className="text-left px-4 text-slate-600 hover:text-sage-600">Listeners</button>
            <Link to="/communicate?mode=chat" onClick={() => setIsOpen(false)} className="px-4 text-slate-600 hover:text-sage-600">Chat</Link>
            <Link to="/communicate?mode=call" onClick={() => setIsOpen(false)} className="px-4 text-slate-600 hover:text-sage-600">Schedule</Link>
            <Link to="/donate" onClick={() => setIsOpen(false)} className={`px-4 ${isActive('/donate')}`}>Donate</Link>
            <button onClick={handleProfileClick} className={`text-left px-4 ${isActive('/profile')}`}>
               {isAuthenticated ? 'My Profile' : 'Log In / Sign Up'}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;