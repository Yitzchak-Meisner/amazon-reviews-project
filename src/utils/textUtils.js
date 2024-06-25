export const findSimilarWords = (word, allWords, limit = 5) => {
    const calculateSimilarity = (word1, word2) => {
      const set1 = new Set(word1);
      const set2 = new Set(word2);
      const intersection = new Set([...set1].filter(x => set2.has(x)));
      const union = new Set([...set1, ...set2]);
      return intersection.size / union.size;
    };
  
    return Object.keys(allWords)
      .filter(w => w !== word)
      .map(w => ({ word: w, similarity: calculateSimilarity(word, w) }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit)
      .map(item => item.word);
  };
  
  export const getTopWords = (wordCount, limit = 10) => {
    return Object.entries(wordCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
  };
