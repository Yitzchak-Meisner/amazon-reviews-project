import * as XLSX from 'xlsx';

const POSITIVE_SENTIMENT = '2';
const NEGATIVE_SENTIMENT = '1';

const parseSentiment = (sentiment) => {
  return sentiment === POSITIVE_SENTIMENT ? 'Positive' : 'Negative';
};

const parseReview = (line) => {
  const [sentiment, title, text] = line.split('","').map(item => item.replace(/^"|"$/g, ''));
  return {
    sentiment: parseSentiment(sentiment),
    title,
    text
  };
};

export const loadReviews = async () => {
  try {
    const response = await fetch('/test_ex.csv');
    const csvText = await response.text();
    
    const lines = csvText.split('\n');
    const reviews = lines
      .filter(line => line.trim())
      .map(parseReview)
      .filter(review => review.text);

    console.log('Loaded reviews:', reviews);
    return reviews;
  } catch (error) {
    console.error('Error loading reviews:', error);
    return [];
  }
};

export const exportToExcel = (data) => {
  const start = performance.now();
  
  const exportData = data.map(review => ({
    Sentiment: review.sentiment,
    Title: review.title,
    Text: review.text
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Filtered Reviews");
  
  const fileName = `filtered_reviews_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(workbook, fileName);
  
  const end = performance.now();
  console.log(`Exporting to Excel took ${end - start} milliseconds.`);
};