/**
 * Checks if two strings are anagrams of each other
 */
export const areAnagrams = (str1: string, str2: string): boolean => {
  // If the strings are the same, they're not interesting anagrams
  if (str1.toLowerCase() === str2.toLowerCase()) return false;
  
  // If the strings are of different lengths, they can't be anagrams
  if (str1.length !== str2.length) return false;
  
  // Sort the characters in both strings and compare them
  const sortedStr1 = str1.toLowerCase().split('').sort().join('');
  const sortedStr2 = str2.toLowerCase().split('').sort().join('');
  
  return sortedStr1 === sortedStr2;
};

/**
 * Extracts words from text content
 */
export const extractWords = (text: string): string[] => {
  // Remove special characters and split by whitespace
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 1); // Filter out single-character words
};

/**
 * Finds all anagram pairs in an array of words
 */
export const findAnagramPairs = (words: string[]): { word1: string, word2: string }[] => {
  const anagramPairs: { word1: string, word2: string }[] = [];
  const wordMap: Record<string, string[]> = {};
  
  // Group words by their sorted characters
  words.forEach(word => {
    const sortedWord = word.split('').sort().join('');
    if (!wordMap[sortedWord]) {
      wordMap[sortedWord] = [];
    }
    // Only add unique words
    if (!wordMap[sortedWord].includes(word)) {
      wordMap[sortedWord].push(word);
    }
  });
  
  // Find groups with more than one word (anagrams)
  Object.values(wordMap).forEach(group => {
    if (group.length > 1) {
      // Create pairs from each group
      for (let i = 0; i < group.length; i++) {
        for (let j = i + 1; j < group.length; j++) {
          anagramPairs.push({
            word1: group[i],
            word2: group[j]
          });
        }
      }
    }
  });
  
  return anagramPairs;
};

/**
 * Creates a sample text file with anagrams for testing
 */
export const generateSampleText = (): string => {
  return `
Here is a sample text file containing several anagrams:

listen silent elbow below
heart earth cinema iceman
astronomer moonstarer night thing
act cat election silent listen
inlets restful fluster debit
below elbow funeral real fluster
evil vile tide diet edit tied
save vase wolf flow
dusty study creative reactive
acres cares
these is a simple example of anagram detection
  `;
};