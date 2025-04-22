import React from 'react';
import { FileText } from 'lucide-react';
import { HeaderProps } from '../types';

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="w-full py-6 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div className="max-w-4xl mx-auto flex items-center">
        <FileText className="w-8 h-8 mr-3" />
        <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
      </div>
    </header>
  );
};

export default Header;