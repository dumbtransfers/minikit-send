import React from 'react';

const Header = () => {
  return (
    <header 
      className="sticky top-0 w-full bg-white border-b border-blue-200 shadow-sm z-10 rounded-b-lg"
      style={{ backgroundColor: '#2C40F0' }}
    >
      <h1 className="text-xl font-bold text-white p-2 py-4">
        Envialo
      </h1>
    </header>
  );
};

export default Header;
