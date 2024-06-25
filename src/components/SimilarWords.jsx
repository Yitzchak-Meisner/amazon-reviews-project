import React, { useState } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import { findSimilarWords } from '../utils/textUtils';

const SimilarWords = ({ allWords }) => {
  const [word, setWord] = useState('');
  const [similarWords, setSimilarWords] = useState([]);

  const handleSearch = () => {
    const results = findSimilarWords(word, allWords);
    setSimilarWords(results);
  };

  return (
    <div>
      <h3>Find Similar Words</h3>
      <Form.Group className="mb-3 d-flex">
        <Form.Control
          type="text"
          placeholder="Enter a word"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <Button onClick={handleSearch} className="ms-2">Search</Button>
      </Form.Group>
      <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
        <ListGroup>
          {similarWords.map((similarWord, index) => (
            <ListGroup.Item key={index}>{similarWord}</ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
};

export default SimilarWords;