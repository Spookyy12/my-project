import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Phone, Coffee, LifeBuoy, ArrowRight } from 'lucide-react';
import { VOLUNTEERS } from '../constants';

const Home: React.FC = () => {
  const scrollToListeners = () => {
    const element = document.getElementById('listeners');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="animate-fade-in font-sans">
      {/* Hero Section с фоновым изображением */}
      <section 
        className="min-h-[80vh] flex items-center justify-center text-center px-6 relative overflow-hidden"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(168, 134, 108, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(121, 143, 96, 0.05) 0%, transparent 50%),
            linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 245, 240, 0.98) 100%),
            url('/images/hero-bg.jpg')
          `,
          backgroundSize: 'cover, cover, auto, cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay, overlay, normal, normal',
        }}
      >
        {/* Glass card for Hero Content */}
        <div className="bg-white/40 backdrop-blur-md rounded-[3rem] p-10 md:p-20 max-w-5xl mx-auto shadow-sm border border-white/50">
          <span className="text-sage-700 font-bold tracking-wider text-sm uppercase mb-4 block">Welcome to a safe space</span>
          <h1 className="text-5xl md:text-7xl font-serif text-slate-800 mb-8 leading-[1.1] tracking-tight">
            A conversation tailored <br/> <span className="text-terracotta-600 italic">just for you.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-700 mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
            This world can be a lonely place. Connect with a stranger who cares. 
            Warm, confidential, and completely anonymous.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link to="/communicate?mode=chat" className="bg-terracotta-500 hover:bg-terracotta-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 shadow-lg shadow-terracotta-200/50 hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Start Chat
            </Link>
            <Link to="/communicate?mode=call" className="bg-white/80 border border-white text-sage-700 hover:bg-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-sm">
              <Phone className="w-5 h-5" />
              Schedule Call
            </Link>
          </div>
        </div>
      </section>

      {/* Mission / Who We Are */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative">
              <div className="bg-white/70 backdrop-blur-sm rounded-[2rem] p-12 relative z-10 shadow-lg shadow-sand-200/50 border border-white/60 text-center">
                 <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-terracotta-500 mx-auto mb-6 shadow-sm">
                    <Heart size={32} />
                 </div>
                 <p className="font-serif text-slate-800 italic text-2xl leading-relaxed">"Small but mighty."</p>
                 <p className="text-sage-600 mt-4 text-sm uppercase tracking-widest font-semibold">Since 2023</p>
              </div>
            </div>
            <div className="order-1 md:order-2 bg-white/40 backdrop-blur-md p-10 rounded-[3rem] border border-white/40">
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-6 tracking-tight">Who We Are</h2>
              <div className="h-1 w-20 bg-terracotta-300 mb-8 rounded-full"></div>
              <p className="text-slate-700 mb-6 leading-relaxed text-lg font-light">
                We are a dedicated crew of 5 men and women who believe in the power of connection. 
                Originating in Florida, we are expanding our warmth across the United States.
              </p>
              <p className="text-slate-700 mb-6 leading-relaxed text-lg font-light">
                Our service charges a nominal <strong>$2.99</strong> for a 15-minute conversation 
                solely to maintain the platform. Our goal is to create a digital safe harbor—warm, inviting, and calm.
              </p>
              <button onClick={scrollToListeners} className="flex items-center gap-2 text-terracotta-700 font-medium group">
                <span className="border-b border-terracotta-300 pb-0.5 group-hover:border-terracotta-500 transition-colors">Learn more about our volunteers</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 bg-white/40 backdrop-blur-sm p-8 rounded-3xl inline-block w-full max-w-3xl mx-auto border border-white/30">
            <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-4 tracking-tight">How It Works</h2>
            <p className="text-slate-600 max-w-xl mx-auto">Three simple steps to find a listening ear.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-sm border border-white hover:border-sage-200 transition-colors duration-300">
              <div className="w-14 h-14 bg-sand-100 rounded-2xl flex items-center justify-center mb-8 text-slate-600">
                <Coffee size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 font-serif">1. Guest or Member</h3>
              <p className="text-slate-600 leading-relaxed">Create a simple anonymous profile or proceed as a guest. Your privacy is our priority.</p>
            </div>
            <div className="bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-sm border border-white hover:border-sage-200 transition-colors duration-300">
              <div className="w-14 h-14 bg-sage-50 rounded-2xl flex items-center justify-center mb-8 text-sage-600">
                <MessageCircle size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 font-serif">2. Choose Format</h3>
              <p className="text-slate-600 leading-relaxed">Jump into the chat queue for immediate text support or schedule a voice call.</p>
            </div>
            <div className="bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-sm border border-white hover:border-sage-200 transition-colors duration-300">
              <div className="w-14 h-14 bg-terracotta-50 rounded-2xl flex items-center justify-center mb-8 text-terracotta-600">
                <Heart size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 font-serif">3. Connect</h3>
              <p className="text-slate-600 leading-relaxed">Pay a small fee of $2.99. Talk to a caring volunteer represented by a friendly avatar.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Volunteers Preview */}
      <section id="listeners" className="py-24 px-6 relative scroll-mt-20">
        <div className="container mx-auto text-center max-w-6xl bg-white/50 backdrop-blur-md rounded-[3rem] p-12 border border-white/40 shadow-lg shadow-sand-200/20">
          <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-16 tracking-tight">Our Friendly Ears</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {VOLUNTEERS.map(vol => (
              <div key={vol.id} className="flex flex-col items-center group cursor-default">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-white/80 rounded-full blur-md opacity-50 group-hover:bg-terracotta-100 transition-colors duration-500"></div>
                  <img 
                    src={vol.avatarUrl} 
                    alt={vol.alias} 
                    className="relative w-32 h-32 rounded-full border-4 border-white shadow-sm bg-sand-100 object-contain p-2 transform group-hover:scale-110 transition-all duration-500" 
                  />
                  <div className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-2 border-white ${
                    vol.status === 'available' ? 'bg-sage-400' : 
                    vol.status === 'busy' ? 'bg-terracotta-400' : 'bg-sand-400'
                  }`}></div>
                </div>
                <h4 className="text-xl font-bold text-slate-800 font-serif mb-2">{vol.alias}</h4>
                <p className="text-sm text-slate-600 max-w-xs">{vol.bio}</p>
              </div>
            ))}
          </div>
          <div className="mt-16">
            <Link to="/volunteer" className="inline-block border-b border-sage-500 pb-1 text-sage-700 hover:text-terracotta-600 hover:border-terracotta-600 transition-colors font-medium">
              Become a Volunteer
            </Link>
          </div>
        </div>
      </section>

      {/* Crisis Info Block */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl text-center bg-white/80 backdrop-blur-md p-12 rounded-[2rem] border border-white/60 shadow-md shadow-sand-200/30">
          <div className="flex flex-col items-center gap-6">
            <div className="p-4 bg-white rounded-full shadow-sm text-terracotta-400">
              <LifeBuoy className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-serif text-slate-800">Help is always available</h2>
            <p className="text-slate-600 max-w-2xl leading-relaxed">
              We provide peer support and friendly conversation, but we are not crisis counselors. 
              If you or someone you know is struggling or in crisis, help is available. 
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              <a href="tel:988" className="bg-terracotta-500 text-white px-8 py-3 rounded-full font-bold hover:bg-terracotta-600 transition shadow-lg shadow-terracotta-200">
                Call 988
              </a>
              <a href="tel:911" className="bg-white text-slate-600 border border-slate-200 px-8 py-3 rounded-full font-bold hover:bg-slate-50 transition">
                Emergency: Call 911
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;