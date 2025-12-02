import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/profile');
    } catch (err) {
      // Error handled by UI below via context
    }
  };

  return (
    <div className="min-h-screen py-20 px-4 flex items-center justify-center">
      <div className="bg-white/80 backdrop-blur-md w-full max-w-md rounded-[2rem] shadow-xl shadow-sand-200/60 border border-white/60 p-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif text-slate-800 mb-2">Welcome Back</h1>
          <p className="text-slate-500">Sign in to access your conversation history.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-6 flex items-center gap-2 text-sm">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <Mail className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-terracotta-400 transition-colors" size={18} />
            <input 
              type="email" 
              required
              placeholder="Email Address" 
              className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta-100 focus:border-terracotta-400 bg-white/50 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-terracotta-400 transition-colors" size={18} />
            <input 
              type="password" 
              required
              placeholder="Password" 
              className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta-100 focus:border-terracotta-400 bg-white/50 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-sage-600 hover:bg-sage-700 text-white py-4 rounded-full font-bold text-lg transition shadow-md mt-2 flex items-center justify-center gap-2 group"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
            {!isLoading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-terracotta-600 font-semibold hover:text-terracotta-700 underline underline-offset-2">
              Join for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;