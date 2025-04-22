import React, { useState, useCallback } from 'react';
import Header from '../components/Header';
import FileUpload from '../components/FileUpload';
import AnagramResults from '../components/AnagramResults';
import Footer from '../components/Footer';
import { extractWords, findAnagramPairs } from '../utils/anagramUtils';
import { AnagramPair } from '../types';

const HomePage: React.FC = () => {
  const [anagramPairs, setAnagramPairs] = useState<AnagramPair[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileProcessed = useCallback((text: string) => {
    setIsProcessing(true);
    
    // Use setTimeout to prevent UI from freezing for large files
    setTimeout(() => {
      try {
        const words = extractWords(text);
        const pairs = findAnagramPairs(words);
        setAnagramPairs(pairs);
      } catch (error) {
        console.error("Error processing file:", error);
      } finally {
        setIsProcessing(false);
      }
    }, 10);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header title="Anagram Checker" />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-12 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Find All Anagram Pairs in Your Text
          </h2>
          <p className="text-gray-600 mb-8">
            Upload a text file and instantly discover all the anagram word pairs.
            Our tool processes your text and groups words that are anagrams of each other.
          </p>
          
          <FileUpload 
            onFileProcessed={handleFileProcessed}
            isProcessing={isProcessing}
          />
        </section>
        
        <AnagramResults 
          anagramPairs={anagramPairs}
          isLoading={isProcessing}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;