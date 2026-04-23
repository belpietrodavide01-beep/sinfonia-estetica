import React from 'react';

const Logo = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center select-none ${className}`}>
      <img 
        src="/sinfoniaaa-removebg-preview.svg" 
        alt="Logo Sinfonia" 
        className="w-14 md:w-16 h-auto object-contain transition-all duration-300"
      />
    </div>
  );
};

export default Logo;

