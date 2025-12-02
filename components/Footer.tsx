import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-sand-100 text-slate-600 py-12 px-4 border-t border-sand-200">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-slate-800 font-serif text-xl mb-4 font-bold">Our Ears Are Open</h3>
            <p className="text-sm leading-relaxed max-w-sm text-slate-500">
              Connecting you with compassionate volunteers for meaningful conversations. 
              We are a warm, confidential space in a lonely world.
            </p>
          </div>
          <div>
            <h4 className="text-slate-800 font-bold mb-4 font-serif">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-terracotta-600 transition-colors">Home</Link></li>
              <li><Link to="/communicate" className="hover:text-terracotta-600 transition-colors">Talk Now</Link></li>
              <li><Link to="/volunteer" className="hover:text-terracotta-600 transition-colors">Become a Volunteer</Link></li>
              <li><Link to="/donate" className="hover:text-terracotta-600 transition-colors">Donate</Link></li>
            </ul>
          </div>
          <div>
             <h4 className="text-slate-800 font-bold mb-4 font-serif">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/legal#privacy" className="hover:text-terracotta-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/legal#terms" className="hover:text-terracotta-600 transition-colors">Terms of Service</Link></li>
              <li><Link to="/legal#agreement" className="hover:text-terracotta-600 transition-colors">Volunteer Agreement</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-sand-300 pt-8 text-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Our Ears Are Open. All rights reserved.</p>
          <p className="mt-2 text-slate-400">Not a substitute for professional medical advice. If in crisis, call 988.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;