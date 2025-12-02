import React from 'react';
import { Phone, AlertCircle } from 'lucide-react';
import { SUICIDE_PREVENTION_NUMBER, EMERGENCY_TEXT } from '../constants';

const CrisisBanner: React.FC = () => {
  return (
    <div className="bg-terracotta-100 text-terracotta-900 py-2.5 px-4 text-center text-xs md:text-sm font-medium sticky top-0 z-50 shadow-sm tracking-wide">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6">
        <span className="flex items-center">
          <Phone className="w-3.5 h-3.5 mr-2 text-terracotta-600" />
          Suicide & Crisis Lifeline: Call or Text <span className="font-bold ml-1 text-terracotta-700">{SUICIDE_PREVENTION_NUMBER}</span>
        </span>
        <span className="hidden md:inline text-terracotta-300">|</span>
        <span className="flex items-center italic">
          <AlertCircle className="w-3.5 h-3.5 mr-2 text-terracotta-600" />
          {EMERGENCY_TEXT}
        </span>
      </div>
    </div>
  );
};

export default CrisisBanner;