import React, { useState, useRef, useCallback } from 'react';
import { Upload, FileUp, Download } from 'lucide-react';
import { FileUploadProps } from '../types';
import { generateSampleText } from '../utils/anagramUtils';

const FileUpload: React.FC<FileUploadProps> = ({ onFileProcessed, isProcessing }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const processFile = useCallback((file: File) => {
    setError(null);
    
    // Validate file type
    if (!file.name.endsWith('.txt')) {
      setError('Please upload a text (.txt) file');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError('File size should be less than 2MB');
      return;
    }

    setFileName(file.name);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      onFileProcessed(text);
    };
    reader.onerror = () => {
      setError('Failed to read file');
    };
    reader.readAsText(file);
  }, [onFileProcessed]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  }, [processFile]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  }, [processFile]);

  const handleBrowseClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const downloadSample = useCallback(() => {
    const sampleText = generateSampleText();
    const blob = new Blob([sampleText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'anagram_sample.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  return (
    <div className="max-w-2xl mx-auto mb-8">
      <div 
        className={`
          border-2 border-dashed rounded-lg p-8 
          transition-all duration-300 ease-in-out
          ${isDragging 
            ? 'border-indigo-500 bg-indigo-50' 
            : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
          }
          ${isProcessing ? 'opacity-75 pointer-events-none' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center">
          <Upload className="w-12 h-12 mb-3 text-indigo-500" />
          <p className="mb-2 text-lg font-medium text-gray-700">
            {isProcessing 
              ? 'Processing...'
              : fileName 
                ? `File ready: ${fileName}` 
                : 'Drag and drop your file here'
            }
          </p>
          <p className="mb-4 text-sm text-gray-500">
            or
          </p>
          <button
            onClick={handleBrowseClick}
            disabled={isProcessing}
            className="
              px-4 py-2.5 rounded-md 
              flex items-center justify-center
              bg-indigo-600 hover:bg-indigo-700 
              text-white font-medium
              transition-colors duration-300
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            <FileUp className="w-4 h-4 mr-2" />
            Browse Files
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt"
            onChange={handleFileChange}
            disabled={isProcessing}
            className="hidden"
          />
        </div>
      </div>

      {error && (
        <div className="mt-3 p-3 bg-red-50 text-red-700 rounded-md border border-red-200">
          <p>{error}</p>
        </div>
      )}

      <div className="mt-4 flex justify-center">
        <button 
          onClick={downloadSample}
          className="
            text-indigo-600 hover:text-indigo-800 
            text-sm flex items-center
            transition-colors duration-300
          "
        >
          <Download className="w-4 h-4 mr-1" />
          Download sample file
        </button>
      </div>
    </div>
  );
};

export default FileUpload;