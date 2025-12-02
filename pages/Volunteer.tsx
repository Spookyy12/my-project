import React, { useState } from 'react';
import { Heart, Send, CheckCircle } from 'lucide-react';
import { sendMockEmail } from '../services/emailService';

const Volunteer: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: '',
    availability: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Send application to admin (simulated)
    await sendMockEmail(formData.email, 'welcome', `Volunteer Application received for ${formData.name}`);
    
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen py-20 px-4 flex items-center justify-center">
        <div className="max-w-lg w-full bg-white/80 backdrop-blur-md p-10 rounded-[2rem] shadow-xl border border-white/60 text-center">
          <div className="w-20 h-20 bg-sand-100 rounded-full flex items-center justify-center text-sage-500 mx-auto mb-6">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-3xl font-serif text-slate-800 mb-4">Application Received</h2>
          <p className="text-slate-600 mb-8">
            Thank you for offering your time and heart. Our team will review your application and get back to you via email shortly.
          </p>
          <a href="/" className="inline-block bg-sage-600 text-white px-8 py-3 rounded-full hover:bg-sage-700 transition">Return Home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-terracotta-50/80 text-terracotta-500 mb-6 backdrop-blur-sm">
            <Heart size={32} />
          </div>
          <h1 className="text-4xl font-serif text-slate-800 mb-4 drop-shadow-sm">Become a Listener</h1>
          <p className="text-slate-700 font-medium text-lg">Join our team of compassionate volunteers and make a difference.</p>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-[2rem] shadow-xl shadow-sand-200/50 border border-white/60 p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">Full Name (Confidential)</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-terracotta-200 focus:border-terracotta-400 outline-none bg-white/50"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-terracotta-200 focus:border-terracotta-400 outline-none bg-white/50"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">Why do you want to join us?</label>
              <textarea 
                required
                rows={4}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-terracotta-200 focus:border-terracotta-400 outline-none bg-white/50 resize-none"
                value={formData.reason}
                onChange={(e) => setFormData({...formData, reason: e.target.value})}
              ></textarea>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">Weekly Availability (Approx. Hours)</label>
              <input 
                type="text" 
                placeholder="e.g. Weeknights, 5 hours/week"
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-terracotta-200 focus:border-terracotta-400 outline-none bg-white/50"
                value={formData.availability}
                onChange={(e) => setFormData({...formData, availability: e.target.value})}
              />
            </div>

            <button 
              type="submit" 
              disabled={status === 'submitting'}
              className="w-full bg-terracotta-500 hover:bg-terracotta-600 text-white py-4 rounded-full font-bold text-lg transition shadow-lg shadow-terracotta-200 mt-6 flex items-center justify-center gap-2"
            >
              {status === 'submitting' ? 'Submitting...' : 'Submit Application'}
              {!status.includes('submitting') && <Send size={18} />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Volunteer;