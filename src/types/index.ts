export interface AnagramPair {
  word1: string;
  word2: string;
}

export interface FileUploadProps {
  onFileProcessed: (text: string) => void;
  isProcessing: boolean;
}

export interface AnagramResultsProps {
  anagramPairs: AnagramPair[];
  isLoading: boolean;
}

export interface HeaderProps {
  title: string;
}