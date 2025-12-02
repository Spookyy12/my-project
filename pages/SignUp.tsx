import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, User, MapPin, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { sendMockEmail } from '../services/emailService';
import { useAuth } from '../context/AuthContext';

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    location: '',
    password: ''
  });
  const { signup, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Create account in context (Database)
      await signup(formData.username, formData.email, formData.location, formData.password);
      
      // Trigger backend email simulation
      await sendMockEmail(formData.email, 'welcome', `Username: ${formData.username}`);

      navigate('/profile');
    } catch (err) {
      // Error is handled by context state
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 flex items-center justify-center">
      <div className="bg-white/80 backdrop-blur-md w-full max-w-md rounded-[2rem] shadow-xl shadow-sand-200/60 border border-white/60 p-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif text-slate-800 mb-2">Join Our Community</h1>
          <p className="text-slate-500">Create a safe, anonymous profile.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-6 flex items-center gap-2 text-sm">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative group">
            <User className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-terracotta-400 transition-colors" size={18} />
            <input 
              type="text" 
              required
              placeholder="Username (Anonymous)" 
              className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta-100 focus:border-terracotta-400 bg-white/50 transition-all"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>

          <div className="relative group">
            <Mail className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-terracotta-400 transition-colors" size={18} />
            <input 
              type="email" 
              required
              placeholder="Email Address" 
              className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta-100 focus:border-terracotta-400 bg-white/50 transition-all"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="relative group">
            <MapPin className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-terracotta-400 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Location (Optional)" 
              className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta-100 focus:border-terracotta-400 bg-white/50 transition-all"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-terracotta-400 transition-colors" size={18} />
            <input 
              type="password" 
              required
              placeholder="Password" 
              className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta-100 focus:border-terracotta-400 bg-white/50 transition-all"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-sage-600 hover:bg-sage-700 text-white py-4 rounded-full font-bold text-lg transition shadow-lg shadow-sage-200 mt-4 flex items-center justify-center gap-2 group"
          >
            {isLoading ? 'Creating Profile...' : 'Sign Up'}
            {!isLoading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-8 leading-relaxed">
          By signing up, you agree to our <Link to="/legal#terms" className="text-terracotta-600 hover:underline">Terms</Link>.
        </p>
        <p className="text-center text-sm text-slate-500 mt-4">
          Already have an account? <Link to="/login" className="text-terracotta-600 font-semibold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;