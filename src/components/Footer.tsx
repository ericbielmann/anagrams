import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 px-4 mt-12 border-t border-gray-200">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-gray-600">
        <p className="text-sm flex items-center">
          Created with <Heart className="w-3 h-3 mx-1 text-red-500" /> by Anagram Checker
        </p>
        <p className="text-xs mt-2">
          &copy; {new Date().getFullYear()} Anagram Checker | All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;