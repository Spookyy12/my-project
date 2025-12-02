import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageSquare, Phone, Calendar, Clock, CreditCard, CheckCircle, Send, X, Shield, AlertCircle } from 'lucide-react';
import { VOLUNTEERS, MOCK_SLOTS, PRICE_PER_SESSION } from '../constants';
import { sendMockEmail } from '../services/emailService';
import PayPalModal from '../components/PayPalModal';
import { useAuth } from '../context/AuthContext';

const Communication: React.FC = () => {
  const location = useLocation();
  const { addTransaction, isAuthenticated } = useAuth();
  const [mode, setMode] = useState<'chat' | 'call'>('chat');
  const [step, setStep] = useState<number>(1);
  const [selectedVolunteer, setSelectedVolunteer] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{sender: string, text: string}[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Payment Form State
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    expiry: '',
    cvc: ''
  });
  const [errors, setErrors] = useState<{cardNumber?: string, expiry?: string, cvc?: string}>({});
  const [showPayPalModal, setShowPayPalModal] = useState(false);

  // Check query params for mode
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const modeParam = params.get('mode');
    if (modeParam === 'call') {
      setMode('call');
      setStep(1);
    } else if (modeParam === 'chat') {
      setMode('chat');
      setStep(1);
    }
  }, [location.search]);

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  // Handlers
  const handleSlotSelect = (id: string) => setSelectedSlot(id);

  const handlePaymentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isProcessing) return; // Prevent edits while processing

    const { name, value } = e.target;
    let formattedValue = value;

    // Simple auto-formatting for Expiry
    if (name === 'expiry') {
      // Allow only numbers and slash
      formattedValue = value.replace(/[^\d/]/g, '');
      
      // Auto-add slash after 2 digits if typing forward
      if (formattedValue.length === 2 && paymentForm.expiry.length === 1) {
        formattedValue = formattedValue + '/';
      } 
      // Handle backspace over slash
      else if (formattedValue.length === 2 && paymentForm.expiry.length === 3) {
        formattedValue = formattedValue.substring(0, 1);
      }
      // Limit length
      if (formattedValue.length > 5) return;
    }

    // Limit CVC length
    if (name === 'cvc' && value.length > 4) return;

    // Limit Card Number length (visual only, strict check in validation)
    if (name === 'cardNumber' && value.replace(/\D/g, '').length > 19) return;

    setPaymentForm(prev => ({ ...prev, [name]: formattedValue }));
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validatePayment = () => {
    const newErrors: {cardNumber?: string, expiry?: string, cvc?: string} = {};
    let isValid = true;

    // Validate Card Number
    const cleanCard = paymentForm.cardNumber.replace(/\D/g, '');
    if (!cleanCard) {
      newErrors.cardNumber = "Required";
      isValid = false;
    } else if (cleanCard.length < 13 || cleanCard.length > 19) {
      newErrors.cardNumber = "Invalid card";
      isValid = false;
    }

    // Validate Expiry (MM/YY)
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!paymentForm.expiry) {
      newErrors.expiry = "Required";
      isValid = false;
    } else if (!expiryRegex.test(paymentForm.expiry)) {
      newErrors.expiry = "MM/YY";
      isValid = false;
    } else {
      // Check if expired
      const [month, year] = paymentForm.expiry.split('/').map(Number);
      const now = new Date();
      const currentYear = now.getFullYear() % 100; // last 2 digits
      const currentMonth = now.getMonth() + 1;

      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        newErrors.expiry = "Expired";
        isValid = false;
      }
    }

    // Validate CVC (3-4 digits)
    if (!paymentForm.cvc) {
      newErrors.cvc = "Required";
      isValid = false;
    } else if (!/^\d{3,4}$/.test(paymentForm.cvc)) {
      newErrors.cvc = "3-4 digits";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  
  const handleProceedPayment = async () => {
    if (paymentMethod === 'card') {
      if (!validatePayment()) return;
      setIsProcessing(true);
      // Simulate Payment Processing
      setTimeout(async () => {
        completePayment("Credit Card");
      }, 2000);
    } else {
      setShowPayPalModal(true);
    }
  };

  const completePayment = async (methodStr: string) => {
    setIsProcessing(false);
    setShowPayPalModal(false);
    setStep(3); // Success
    
    // Record Transaction if logged in
    if (isAuthenticated) {
      addTransaction(
        PRICE_PER_SESSION,
        mode === 'chat' ? 'Chat' : 'Call',
        mode === 'chat' ? '15 min Chat Session' : '15 min Scheduled Call',
        methodStr === 'PayPal' ? 'PayPal' : 'Card'
      );
    }

    // Simulate Email Trigger
    await sendMockEmail("user@example.com", "confirmation", `Mode: ${mode === 'chat' ? 'Chat Session' : 'Phone Call'} (Via ${methodStr})`);
  };

  const startChat = () => {
    setStep(4);
    setChatHistory([]); // Clear previous
    // Simulate volunteer joining
    setTimeout(() => {
      setChatHistory(prev => [...prev, { sender: 'System', text: 'Secure connection established.' }]);
    }, 500);
    setTimeout(() => {
      setChatHistory(prev => [...prev, { sender: 'System', text: 'Captain Listener joined the chat.' }]);
    }, 1500);
    setTimeout(() => {
      setChatHistory(prev => [...prev, { sender: 'Volunteer', text: 'Hi there! I am here to listen. How are you feeling today?' }]);
    }, 2500);
  };

  const sendMessage = () => {
    if (!chatMessage.trim()) return;
    setChatHistory(prev => [...prev, { sender: 'Me', text: chatMessage }]);
    setChatMessage("");
  };

  return (
    <div className="min-h-screen pt-10 pb-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-3xl md:text-5xl font-serif text-center text-slate-800 mb-4 tracking-tight drop-shadow-sm">
          Start a Conversation
        </h1>
        <p className="text-center text-slate-700 font-medium mb-10">Safe, anonymous, and affordable support.</p>

        {/* Toggle Switch - Only show if not in active chat */}
        {step < 4 && (
          <div className="flex justify-center mb-12">
            <div className="bg-white/80 backdrop-blur-sm p-1.5 rounded-full border border-white shadow-sm flex relative">
              <button 
                onClick={() => { setMode('chat'); setStep(1); }}
                disabled={step > 1}
                className={`px-8 py-3 rounded-full flex items-center gap-2 transition-all duration-300 text-sm font-medium z-10 ${
                  mode === 'chat' ? 'bg-sage-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'
                } ${step > 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <MessageSquare size={16} />
                Chat Queue
              </button>
              <button 
                onClick={() => { setMode('call'); setStep(1); }}
                disabled={step > 1}
                className={`px-8 py-3 rounded-full flex items-center gap-2 transition-all duration-300 text-sm font-medium z-10 ${
                  mode === 'call' ? 'bg-sage-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'
                } ${step > 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Phone size={16} />
                Schedule Call
              </button>
            </div>
          </div>
        )}

        {/* Main Content Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-[2rem] shadow-xl shadow-sand-200/50 overflow-hidden border border-white/60 min-h-[500px] transition-all duration-500 max-w-4xl mx-auto relative">
          
          {/* Decorative background blob */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-terracotta-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

          {/* STEP 1: Selection */}
          {step === 1 && (
            <div className="p-8 md:p-12 animate-fade-in">
              {mode === 'chat' ? (
                <div className="text-center max-w-lg mx-auto">
                  <h2 className="text-2xl font-bold font-serif text-slate-800 mb-4">Join the Chat Queue</h2>
                  <p className="text-slate-600 mb-10 leading-relaxed">
                    Our volunteers are ready to listen. Connect with the next available listener. 
                    No booking required for chat.
                  </p>
                  <div className="bg-sand-50/50 border border-sand-100 rounded-2xl p-8 mb-10 relative overflow-hidden backdrop-blur-sm">
                    <div className="relative z-10">
                       <p className="text-slate-500 font-medium text-sm uppercase tracking-wide mb-2">Estimated Wait</p>
                       <p className="text-4xl font-bold text-slate-700">~ 2 mins</p>
                       <div className="flex justify-center items-center gap-2 mt-4">
                          <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-sage-500"></span>
                          </span>
                          <p className="text-sm text-slate-600 font-medium">3 Volunteers Online</p>
                       </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setStep(2)}
                    className="bg-terracotta-500 hover:bg-terracotta-600 text-white px-10 py-4 rounded-full text-lg font-medium w-full transition shadow-lg shadow-terracotta-100"
                  >
                    Proceed to Payment (${PRICE_PER_SESSION})
                  </button>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold font-serif text-slate-800 mb-4 text-center">Book a 15-Minute Call</h2>
                  <p className="text-center text-slate-600 mb-10">Select a time that works for you.</p>
                  
                  {/* Calendar Grid Simulation */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-6 flex items-center gap-2">
                        <Calendar size={18} className="text-terracotta-500" /> Available Slots
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {MOCK_SLOTS.map(slot => (
                          <button
                            key={slot.id}
                            disabled={!slot.available}
                            onClick={() => handleSlotSelect(slot.id)}
                            className={`p-4 rounded-xl border text-sm flex flex-col items-center justify-center transition-all duration-200 ${
                              selectedSlot === slot.id 
                                ? 'bg-terracotta-500 text-white border-terracotta-500 shadow-md transform scale-105' 
                                : slot.available 
                                  ? 'bg-white/60 hover:bg-white border-sand-200 hover:border-terracotta-300 text-slate-700' 
                                  : 'bg-sand-50/50 border-sand-100 text-sand-300 cursor-not-allowed'
                            }`}
                          >
                            <span className="font-bold text-base">{slot.time}</span>
                            <span className="text-xs opacity-80 mt-1">{slot.date}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Volunteer Preference (Optional) */}
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-6">Preferred Listener (Optional)</h3>
                      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {VOLUNTEERS.map(vol => (
                          <div 
                            key={vol.id} 
                            onClick={() => setSelectedVolunteer(vol.id)}
                            className={`flex items-center gap-4 p-3 rounded-xl border cursor-pointer transition-all ${
                              selectedVolunteer === vol.id ? 'border-terracotta-400 bg-terracotta-50/50' : 'border-sand-100 hover:bg-sand-50/50'
                            }`}
                          >
                            <img src={vol.avatarUrl} alt="avatar" className="w-12 h-12 rounded-full bg-white border border-sand-200 object-cover" />
                            <div className="flex-grow">
                              <p className="font-bold text-sm text-slate-800">{vol.alias}</p>
                              <p className="text-xs text-slate-500 truncate w-32">{vol.bio}</p>
                            </div>
                            {selectedVolunteer === vol.id && <div className="w-4 h-4 rounded-full bg-terracotta-500"></div>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 text-center border-t border-sand-100 pt-8">
                     <button 
                      onClick={() => setStep(2)}
                      disabled={!selectedSlot}
                      className="bg-terracotta-500 disabled:bg-sand-300 disabled:cursor-not-allowed hover:bg-terracotta-600 text-white px-10 py-4 rounded-full text-lg w-full max-w-sm transition shadow-lg shadow-terracotta-100"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Payment */}
          {step === 2 && (
            <div className="p-8 md:p-12 max-w-md mx-auto animate-fade-in">
              <h2 className="text-2xl font-bold font-serif text-slate-800 mb-8 text-center">Secure Payment</h2>
              
              <div className="bg-sand-50/50 p-6 rounded-2xl mb-8 border border-sand-100">
                <div className="flex justify-between mb-3 text-slate-600">
                  <span>Session Type</span>
                  <span className="font-semibold capitalize text-slate-900">{mode} (15 min)</span>
                </div>
                {mode === 'call' && (
                  <div className="flex justify-between mb-3 text-slate-600 text-sm">
                    <span>Scheduled for</span>
                    <span className="text-slate-900">10:00 AM Today</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold text-slate-800 border-t border-sand-200 pt-4 mt-4">
                  <span>Total Due</span>
                  <span className="text-terracotta-600">${PRICE_PER_SESSION}</span>
                </div>
              </div>

              {/* Payment Methods Tabs */}
              <div className="flex bg-sand-100/50 p-1.5 rounded-xl mb-6">
                <button 
                  onClick={() => { setPaymentMethod('card'); setErrors({}); }}
                  className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition ${paymentMethod === 'card' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <CreditCard size={16}/> Credit Card
                  </div>
                </button>
                <button 
                  onClick={() => { setPaymentMethod('paypal'); setErrors({}); }}
                  className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition ${paymentMethod === 'paypal' ? 'bg-white shadow-sm text-[#003087]' : 'text-slate-500 hover:text-slate-700'}`}
                >
                   <div className="flex items-center justify-center gap-1">
                     <span className="font-bold italic">Pay</span><span className="font-bold italic text-[#009cde]">Pal</span>
                   </div>
                </button>
              </div>

              {/* Payment Content */}
              <div className="space-y-6">
                 {paymentMethod === 'card' ? (
                   <div className="space-y-5 animate-fade-in">
                      <div className="relative">
                        <CreditCard className="absolute left-4 top-3.5 text-slate-400" size={20} />
                        <input 
                          type="text" 
                          name="cardNumber"
                          placeholder="Card Number" 
                          value={paymentForm.cardNumber}
                          onChange={handlePaymentInputChange}
                          disabled={isProcessing}
                          maxLength={19}
                          className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-terracotta-200 focus:outline-none transition disabled:bg-slate-50 disabled:text-slate-400 ${errors.cardNumber ? 'border-red-400 focus:border-red-400 bg-red-50' : 'border-slate-200 focus:border-terracotta-400'}`} 
                        />
                        {errors.cardNumber && <p className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1 font-medium"><AlertCircle size={10} /> {errors.cardNumber}</p>}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <input 
                            type="text" 
                            name="expiry"
                            placeholder="MM/YY" 
                            value={paymentForm.expiry}
                            onChange={handlePaymentInputChange}
                            disabled={isProcessing}
                            maxLength={5}
                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-terracotta-200 focus:outline-none transition disabled:bg-slate-50 disabled:text-slate-400 ${errors.expiry ? 'border-red-400 focus:border-red-400 bg-red-50' : 'border-slate-200 focus:border-terracotta-400'}`}
                          />
                          {errors.expiry && <p className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1 font-medium"><AlertCircle size={10} /> {errors.expiry}</p>}
                        </div>
                        <div>
                          <input 
                            type="text" 
                            name="cvc"
                            placeholder="CVC" 
                            value={paymentForm.cvc}
                            onChange={handlePaymentInputChange}
                            disabled={isProcessing}
                            maxLength={4}
                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-terracotta-200 focus:outline-none transition disabled:bg-slate-50 disabled:text-slate-400 ${errors.cvc ? 'border-red-400 focus:border-red-400 bg-red-50' : 'border-slate-200 focus:border-terracotta-400'}`}
                          />
                          {errors.cvc && <p className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1 font-medium"><AlertCircle size={10} /> {errors.cvc}</p>}
                        </div>
                      </div>
                    </div>
                 ) : (
                    <div className="bg-[#ffc439]/10 border border-[#ffc439]/30 rounded-xl p-8 text-center mb-8 animate-fade-in">
                      <p className="text-slate-800 font-medium mb-1">Pay safely with PayPal</p>
                      <p className="text-slate-500 text-sm">You will be asked to log in to verify your payment.</p>
                    </div>
                 )}
                  
                  {/* Action Buttons */}
                  <button 
                    onClick={handleProceedPayment}
                    disabled={isProcessing}
                    className={`w-full py-4 rounded-full text-lg transition flex justify-center items-center shadow-lg disabled:opacity-70 disabled:cursor-not-allowed font-medium gap-2 ${
                      paymentMethod === 'paypal' 
                      ? 'bg-[#ffc439] hover:bg-[#ffd466] text-slate-900 shadow-[#ffc439]/30' 
                      : 'bg-sage-600 hover:bg-sage-700 text-white'
                    }`}
                  >
                    {isProcessing ? 'Processing...' : paymentMethod === 'paypal' ? 'Proceed with PayPal' : `Pay $${PRICE_PER_SESSION} with Card`}
                  </button>

                  <button 
                    onClick={() => setStep(1)} 
                    disabled={isProcessing}
                    className="w-full text-center mt-6 text-slate-400 hover:text-slate-600 text-sm disabled:opacity-50"
                  >
                    Cancel
                  </button>
              </div>
            </div>
          )}

          {/* STEP 3: Success */}
          {step === 3 && (
            <div className="p-8 md:p-12 text-center h-full flex flex-col justify-center items-center min-h-[500px] animate-fade-in">
              <div className="w-24 h-24 bg-sage-100 rounded-full flex items-center justify-center text-sage-600 mb-8 animate-bounce">
                <CheckCircle size={48} />
              </div>
              <h2 className="text-3xl font-serif text-slate-800 mb-4">You're All Set!</h2>
              <p className="text-slate-600 max-w-md mx-auto mb-10 text-lg">
                {mode === 'chat' 
                  ? "We are ready to connect you with 'Captain Listener'. Click below to enter the private chat room." 
                  : "Your call is scheduled. Check your email for the confirmation details."}
              </p>
              
              <div className="bg-sand-50/50 p-5 rounded-xl text-sm text-slate-500 mb-8 max-w-md border border-sand-200">
                <p><strong>Note:</strong> A confirmation email has been sent to your registered address.</p>
              </div>

              <div className="flex gap-4">
                <button className="bg-white border border-slate-200 text-slate-600 px-8 py-3 rounded-full hover:bg-slate-50 transition" onClick={() => window.location.hash = '/'}>Return Home</button>
                {mode === 'chat' && (
                  <button 
                    onClick={startChat}
                    className="bg-terracotta-500 text-white px-8 py-3 rounded-full hover:bg-terracotta-600 transition shadow-lg shadow-terracotta-200"
                  >
                    Enter Chat Room
                  </button>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: Active Chat Interface (Mock) */}
          {step === 4 && (
            <div className="flex flex-col h-[600px] bg-sand-50/50 animate-fade-in">
              {/* Chat Header */}
              <div className="bg-white px-6 py-4 flex justify-between items-center border-b border-sand-200 shadow-sm z-10">
                <div className="flex items-center gap-4">
                  <div className="relative">
                     <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Captain Listener" className="w-12 h-12 rounded-full border border-sand-200 object-cover bg-white" />
                     <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-sage-500 rounded-full border-2 border-white"></span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">Captain Listener</h3>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Shield size={10} className="text-terracotta-500"/>
                      <span>Verified Volunteer</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden sm:block px-3 py-1 rounded-full text-xs font-semibold text-slate-500 bg-sand-100">
                    14:20 remaining
                  </div>
                  <button onClick={() => { if(confirm("End chat?")) setStep(1); }} className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition">
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Chat Area */}
              <div className="flex-grow p-6 overflow-y-auto space-y-6">
                {chatHistory.map((msg, idx) => (
                  <div key={idx} className={`flex w-full ${msg.sender === 'Me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] sm:max-w-[70%] px-5 py-3 shadow-sm text-sm leading-relaxed ${
                      msg.sender === 'System' ? 'bg-transparent text-center w-full shadow-none text-xs text-slate-400 uppercase tracking-wider my-2' :
                      msg.sender === 'Me' ? 'bg-sage-600 text-white rounded-2xl rounded-tr-sm' : 'bg-white text-slate-800 border border-sand-200 rounded-2xl rounded-tl-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-sand-200">
                 <div className="flex gap-3 max-w-3xl mx-auto">
                    <input 
                      type="text" 
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Type your message..." 
                      className="flex-grow px-6 py-3 bg-sand-50/50 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-terracotta-200 text-slate-800 placeholder-slate-400"
                    />
                    <button 
                      onClick={sendMessage}
                      className="bg-terracotta-500 hover:bg-terracotta-600 text-white p-3 rounded-full w-12 h-12 flex items-center justify-center transition shadow-md shadow-terracotta-100"
                    >
                      <Send size={20} className="ml-0.5" />
                    </button>
                 </div>
              </div>
            </div>
          )}

        </div>
      </div>
      
      {showPayPalModal && (
        <PayPalModal 
          amount={PRICE_PER_SESSION}
          onClose={() => setShowPayPalModal(false)}
          onSuccess={() => completePayment("PayPal")}
        />
      )}
    </div>
  );
};

export default Communication;