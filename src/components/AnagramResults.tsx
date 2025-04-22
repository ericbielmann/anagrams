import React, { useState, useEffect } from 'react';
import { Copy, Check, RotateCw } from 'lucide-react';
import { AnagramResultsProps, AnagramPair } from '../types';

const AnagramResults: React.FC<AnagramResultsProps> = ({ 
  anagramPairs, 
  isLoading 
}) => {
  const [copied, setCopied] = useState(false);
  const [filteredPairs, setFilteredPairs] = useState<AnagramPair[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredPairs(anagramPairs);
    } else {
      setFilteredPairs(
        anagramPairs.filter(
          pair => 
            pair.word1.includes(searchTerm.toLowerCase()) || 
            pair.word2.includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [anagramPairs, searchTerm]);

  const copyToClipboard = () => {
    const text = anagramPairs
      .map(pair => `${pair.word1} ↔ ${pair.word2}`)
      .join('\n');
      
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center my-12 p-6">
        <RotateCw className="w-8 h-8 text-indigo-500 animate-spin mb-4" />
        <p className="text-gray-700">Processing file and finding anagrams...</p>
      </div>
    );
  }

  if (anagramPairs.length === 0) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <h2 className="text-xl font-bold mb-2 md:mb-0">
              Found {anagramPairs.length} Anagram Pairs
            </h2>
            <div className="flex items-center">
              <div className="relative mr-2">
                <input
                  type="text"
                  placeholder="Filter results..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="
                    py-1.5 px-3 pr-8 
                    rounded-md border-0
                    text-gray-900
                    placeholder:text-gray-400
                    focus:ring-2 focus:ring-indigo-600
                    text-sm
                  "
                />
              </div>
              <button
                onClick={copyToClipboard}
                className="
                  p-1.5 rounded
                  bg-white/20 hover:bg-white/30
                  text-white
                  transition-colors duration-300
                  flex items-center
                "
                title="Copy all anagrams"
              >
                {copied ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="p-4">
          {filteredPairs.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No anagrams match your filter criteria
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredPairs.map((pair, index) => (
                <div
                  key={index}
                  className="
                    p-4 rounded-lg 
                    border border-gray-200
                    hover:border-indigo-200 hover:shadow-sm
                    transition-all duration-300 ease-in-out
                    group
                  "
                >
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-medium text-gray-900 mb-2 group-hover:text-indigo-700 transition-colors duration-300">
                      {pair.word1}
                    </span>
                    <div className="w-8 h-8 flex items-center justify-center">
                      <div className="w-0.5 h-5 bg-gray-300 transform rotate-90"></div>
                    </div>
                    <span className="text-lg font-medium text-gray-900 group-hover:text-indigo-700 transition-colors duration-300">
                      {pair.word2}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnagramResults;