import React, { useState } from 'react';
import { Heart, CreditCard, AlertCircle } from 'lucide-react';
import { sendMockEmail } from '../services/emailService';
import PayPalModal from '../components/PayPalModal';
import { useAuth } from '../context/AuthContext';

const Donate: React.FC = () => {
  const { addTransaction, isAuthenticated } = useAuth();
  const [amount, setAmount] = useState<number | string>('');
  const [method, setMethod] = useState<'card' | 'paypal'>('card');
  const [success, setSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPayPalModal, setShowPayPalModal] = useState(false);
  
  // Payment State
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvc: '' });
  const [validationErrors, setValidationErrors] = useState<{number?: string, expiry?: string, cvc?: string}>({});
  
  // General error state
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isProcessing) return;
    const { name, value } = e.target;
    let formattedValue = value;

    // Formatting logic
    if (name === 'expiry') {
      formattedValue = value.replace(/[^\d/]/g, '');
      if (formattedValue.length === 2 && cardDetails.expiry.length === 1) {
        formattedValue = formattedValue + '/';
      } else if (formattedValue.length === 2 && cardDetails.expiry.length === 3) {
        formattedValue = formattedValue.substring(0, 1);
      }
      if (formattedValue.length > 5) return;
    }
    if (name === 'cvc' && value.length > 4) return;
    if (name === 'number' && value.replace(/\D/g, '').length > 19) return;

    setCardDetails(prev => ({ ...prev, [name]: formattedValue }));
    
    // Clear specific field error
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors(prev => ({ ...prev, [name]: undefined }));
    }
    // Clear global error
    if (error) setError(null);
  };

  const validateCard = () => {
    const newErrors: typeof validationErrors = {};
    let isValid = true;

    // Clean number (remove spaces if any)
    const cleanNumber = cardDetails.number.replace(/\D/g, '');
    if (!cardDetails.number.trim()) {
      newErrors.number = "Card number is required";
      isValid = false;
    } else if (cleanNumber.length < 13 || cleanNumber.length > 19) {
      newErrors.number = "Must be 13-19 digits";
      isValid = false;
    }

    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!cardDetails.expiry.trim()) {
      newErrors.expiry = "Required";
      isValid = false;
    } else if (!expiryRegex.test(cardDetails.expiry)) {
      newErrors.expiry = "Format MM/YY";
      isValid = false;
    } else {
       // Expiry check
       const [month, year] = cardDetails.expiry.split('/').map(Number);
       const now = new Date();
       const currentYear = now.getFullYear() % 100;
       const currentMonth = now.getMonth() + 1;
       if (year < currentYear || (year === currentYear && month < currentMonth)) {
         newErrors.expiry = "Card expired";
         isValid = false;
       }
    }

    if (!cardDetails.cvc.trim()) {
      newErrors.cvc = "Required";
      isValid = false;
    } else if (cardDetails.cvc.length < 3) {
      newErrors.cvc = "Invalid CVC";
      isValid = false;
    }

    setValidationErrors(newErrors);
    return isValid;
  };

  const handleDonateClick = () => {
    setError(null);
    setValidationErrors({});

    // 1. Validate Amount
    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid donation amount.");
      return;
    }

    // 2. Routing based on Method
    if (method === 'card') {
      if (!validateCard()) {
        setError("Please check your card details.");
        return;
      }
      // If valid, proceed to processing
      processCardDonation();
    } else {
      // Open PayPal Modal
      setShowPayPalModal(true);
    }
  };

  const processCardDonation = async () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(async () => {
      completeDonation("Card");
    }, 2000);
  };

  const completeDonation = async (methodStr: string = "PayPal") => {
    setSuccess(true);
    setIsProcessing(false);
    setShowPayPalModal(false);
    
    // Record Transaction if logged in
    if (isAuthenticated) {
      addTransaction(
        Number(amount),
        'Donation',
        'Charitable Contribution',
        methodStr as 'Card' | 'PayPal'
      );
    }

    await sendMockEmail("donor@example.com", "welcome", `Thank you for your generous donation of $${amount} via ${methodStr}!`);
  };

  return (
    <div className="min-h-screen pt-20 pb-20 px-4">
      <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-md rounded-[2rem] shadow-xl shadow-sand-200/50 border border-white/60 overflow-hidden">
        <div className="bg-sage-600/90 p-10 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-sage-500 opacity-50" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '20px 20px'}}></div>
          <div className="relative z-10">
             <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm shadow-inner">
                <Heart className="w-8 h-8 text-white animate-pulse" />
             </div>
             <h1 className="text-3xl font-serif">Support Our Mission</h1>
             <p className="mt-2 text-sage-100 font-light">Help us keep our ears open for everyone.</p>
          </div>
        </div>
        
        <div className="p-8 md:p-10">
          {!success ? (
            <>
              <p className="text-slate-600 mb-8 text-center leading-relaxed">
                We are a small volunteer team. Your donation helps pay for hosting, email services, and outreach.
              </p>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[10, 25, 50].map((val) => (
                  <button 
                    key={val}
                    onClick={() => { setAmount(val); setError(null); }}
                    className={`py-4 rounded-xl border font-semibold transition-all duration-200 ${
                      amount === val 
                      ? 'bg-terracotta-500 text-white border-terracotta-500 shadow-md transform scale-105' 
                      : 'bg-white border-slate-200 text-slate-600 hover:border-terracotta-300 hover:text-terracotta-600'
                    }`}
                  >
                    ${val}
                  </button>
                ))}
              </div>

              <div className="relative mb-8">
                <span className="absolute left-4 top-3.5 text-slate-400 font-serif text-lg">$</span>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => { setAmount(e.target.value); setError(null); }}
                  placeholder="Other Amount" 
                  className="w-full pl-8 pr-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-terracotta-200 focus:border-terracotta-400 outline-none transition bg-white/80"
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-6 flex items-center gap-2 text-sm justify-center border border-red-100">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              {/* Payment Method Tabs */}
              <div className="flex bg-sand-100/50 p-1.5 rounded-xl mb-6">
                <button 
                  onClick={() => { setMethod('card'); setError(null); }}
                  className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition ${method === 'card' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <CreditCard size={16}/> Credit Card
                  </div>
                </button>
                <button 
                  onClick={() => { setMethod('paypal'); setError(null); }}
                  className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition ${method === 'paypal' ? 'bg-white shadow-sm text-[#003087]' : 'text-slate-500 hover:text-slate-700'}`}
                >
                   <div className="flex items-center justify-center gap-1">
                     <span className="font-bold italic">Pay</span><span className="font-bold italic text-[#009cde]">Pal</span>
                   </div>
                </button>
              </div>

              {method === 'card' ? (
                <div className="space-y-4 mb-8">
                  <div>
                    <input 
                      type="text" 
                      name="number"
                      value={cardDetails.number}
                      onChange={handleInputChange}
                      placeholder="Card Number" 
                      maxLength={19}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta-200 bg-white/80 transition ${validationErrors.number ? 'border-red-400 bg-red-50' : 'border-slate-200'}`} 
                    />
                    {validationErrors.number && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{validationErrors.number}</p>}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input 
                        type="text" 
                        name="expiry"
                        value={cardDetails.expiry}
                        onChange={handleInputChange}
                        placeholder="MM/YY" 
                        maxLength={5}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta-200 bg-white/80 transition ${validationErrors.expiry ? 'border-red-400 bg-red-50' : 'border-slate-200'}`} 
                      />
                      {validationErrors.expiry && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{validationErrors.expiry}</p>}
                    </div>
                    <div>
                      <input 
                        type="text" 
                        name="cvc"
                        value={cardDetails.cvc}
                        onChange={handleInputChange}
                        placeholder="CVC" 
                        maxLength={4}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta-200 bg-white/80 transition ${validationErrors.cvc ? 'border-red-400 bg-red-50' : 'border-slate-200'}`} 
                      />
                      {validationErrors.cvc && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{validationErrors.cvc}</p>}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-[#ffc439]/10 border border-[#ffc439]/30 rounded-xl p-8 text-center mb-8">
                  <p className="text-slate-800 font-medium mb-1">Pay safely with PayPal</p>
                  <p className="text-slate-500 text-sm">You will be asked to log in to verify your donation.</p>
                </div>
              )}

              <button 
                onClick={handleDonateClick}
                disabled={isProcessing}
                className={`w-full py-4 rounded-full font-bold text-lg transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed ${
                  method === 'paypal' 
                  ? 'bg-[#ffc439] hover:bg-[#ffd466] text-slate-900 shadow-[#ffc439]/30' 
                  : 'bg-sage-600 hover:bg-sage-700 text-white shadow-sage-200'
                }`}
              >
                {isProcessing ? 'Processing...' : method === 'paypal' ? 'Proceed with PayPal' : 'Donate Now'}
              </button>
            </>
          ) : (
            <div className="text-center py-10 animate-fade-in">
              <div className="w-24 h-24 bg-sage-50 rounded-full flex items-center justify-center text-sage-500 mx-auto mb-6 shadow-sm border-4 border-white">
                <Heart size={48} fill="currentColor" />
              </div>
              <h3 className="text-3xl font-serif text-slate-800 mb-4">Thank You!</h3>
              <p className="text-slate-600 mb-10 text-lg">Your generosity means the world to us.</p>
              <button onClick={() => { setSuccess(false); setCardDetails({number:'', expiry:'', cvc:''}); setAmount(''); }} className="text-terracotta-600 font-semibold hover:text-terracotta-700 hover:bg-terracotta-50 px-6 py-2 rounded-full transition">
                Make another donation
              </button>
            </div>
          )}
        </div>
      </div>

      {showPayPalModal && (
        <PayPalModal 
          amount={amount}
          onClose={() => setShowPayPalModal(false)}
          onSuccess={() => completeDonation("PayPal")}
        />
      )}
    </div>
  );
};

export default Donate;