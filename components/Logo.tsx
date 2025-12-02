import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      aria-label="Our Ears Are Open Logo"
    >
      {/* Outer Ear Shape - Sage Green */}
      <path 
        d="M35 20 C 55 10, 85 20, 85 50 C 85 75, 65 90, 50 90 C 40 90, 30 80, 30 65" 
        className="stroke-sage-500" 
        strokeWidth="6" 
        strokeLinecap="round"
      />
      
      {/* Hand cradling the bottom - Sage Green */}
      <path 
        d="M30 65 Q 25 85, 55 88" 
        className="stroke-sage-500" 
        strokeWidth="6" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M30 65 Q 35 55, 40 50" 
        className="stroke-sage-500" 
        strokeWidth="6" 
        strokeLinecap="round"
      />

      {/* Inner Ear Swirls - Peach/Terracotta */}
      <path 
        d="M45 35 C 55 30, 70 35, 70 50 C 70 60, 60 65, 55 60" 
        className="stroke-terracotta-400" 
        strokeWidth="4" 
        strokeLinecap="round"
      />
      <path 
        d="M40 45 Q 45 40, 50 45" 
        className="stroke-terracotta-400" 
        strokeWidth="4" 
        strokeLinecap="round"
      />

      {/* Heart at the bottom - Peach/Terracotta */}
      <path 
        d="M52 70 C 52 70, 56 65, 60 68 C 64 71, 62 76, 58 80 L 52 85 L 46 80 C 42 76, 40 71, 44 68 C 48 65, 52 70, 52 70 Z" 
        className="fill-terracotta-500" 
      />
    </svg>
  );
};

export default Logo;