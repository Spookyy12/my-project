import React, { useState } from 'react';
import { X, Lock } from 'lucide-react';

interface PayPalModalProps {
  amount: number | string;
  onClose: () => void;
  onSuccess: () => void;
}

const PayPalModal: React.FC<PayPalModalProps> = ({ amount, onClose, onSuccess }) => {
  const [step, setStep] = useState<'login' | 'review' | 'processing'>('login');
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('review');
  };

  const handlePay = () => {
    setStep('processing');
    setTimeout(() => {
      onSuccess();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative font-sans transform transition-all scale-100">
        {/* PayPal Header */}
        <div className="bg-[#003087] p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-1">
             <span className="font-bold italic text-xl">Pay</span><span className="font-bold italic text-[#009cde] text-xl">Pal</span>
          </div>
          <button onClick={onClose} className="hover:bg-white/10 p-1 rounded-full transition">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 min-h-[350px] flex flex-col">
          {step === 'login' && (
            <div className="animate-fade-in w-full">
              <h3 className="text-xl text-slate-700 font-semibold mb-6">Log in to PayPal</h3>
              <form onSubmit={handleLogin} className="space-y-4">
                <input type="email" placeholder="Email" className="w-full p-4 border border-slate-300 rounded-lg focus:border-[#009cde] outline-none transition" required defaultValue="user@example.com" />
                <input type="password" placeholder="Password" className="w-full p-4 border border-slate-300 rounded-lg focus:border-[#009cde] outline-none transition" required defaultValue="password" />
                <button type="submit" className="w-full bg-[#003087] text-white py-4 rounded-full font-bold hover:bg-[#00256b] transition mt-4 shadow-lg shadow-blue-900/20">Log In</button>
              </form>
              <div className="mt-6 flex justify-center text-xs">
                <span className="text-slate-500">New to PayPal? <span className="text-[#003087] font-bold cursor-pointer hover:underline">Sign Up</span></span>
              </div>
            </div>
          )}

          {step === 'review' && (
             <div className="animate-fade-in flex-grow flex flex-col w-full">
               <div className="text-center mb-8 border-b border-slate-100 pb-6">
                 <p className="text-slate-500 text-sm uppercase tracking-wider font-semibold mb-1">Total Amount</p>
                 <p className="text-4xl font-bold text-slate-800">${Number(amount).toFixed(2)}</p>
                 <p className="text-slate-400 text-sm mt-2 italic">Our Ears Are Open Donation</p>
               </div>
               
               <div className="bg-slate-50 p-5 rounded-xl mb-8 border border-slate-200">
                 <div className="flex justify-between items-center text-sm mb-3">
                    <span className="text-slate-500">Ship to</span>
                    <span className="text-slate-800 font-medium">123 Main St, Anytown, USA</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Pay with</span>
                    <span className="text-slate-800 font-medium flex items-center gap-2">
                      <div className="w-8 h-5 bg-slate-300 rounded"></div> Visa •••• 1234
                    </span>
                 </div>
               </div>

               <button onClick={handlePay} className="w-full bg-[#009cde] text-white py-4 rounded-full font-bold hover:bg-[#008ac4] transition mt-auto shadow-lg shadow-cyan-900/20">
                 Complete Purchase
               </button>
             </div>
          )}

          {step === 'processing' && (
            <div className="flex flex-col items-center justify-center flex-grow animate-fade-in">
               <div className="w-16 h-16 border-4 border-[#009cde] border-t-transparent rounded-full animate-spin mb-6"></div>
               <p className="text-slate-700 font-bold text-lg">Processing...</p>
               <p className="text-slate-400 text-sm mt-2">Please do not close this window.</p>
            </div>
          )}
        </div>
        
        <div className="bg-slate-50 p-4 text-center border-t border-slate-200 text-xs text-slate-400 flex justify-center items-center gap-1.5">
          <Lock size={12} />
          <span>Securely processing via PayPal Simulation</span>
        </div>
      </div>
    </div>
  );
};

export default PayPalModal;