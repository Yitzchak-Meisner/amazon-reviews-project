import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Dropdown, Button, Card } from 'react-bootstrap';
import ReviewList from '../components/ReviewList';
import PopularWords from '../components/PopularWords';
import SimilarWords from '../components/SimilarWords';
import { loadReviews, exportToExcel } from '../services/reviewService';
import { getTopWords } from '../utils/textUtils';

const MainPage = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [popularWords, setPopularWords] = useState({});
  const [allWords, setAllWords] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All Reviews');

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadReviews();
      setReviews(data);
      setFilteredReviews(data);
      updatePopularWords(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    updatePopularWords(filteredReviews);
  }, [filteredReviews]);

  const updatePopularWords = (reviewsToAnalyze) => {
    const words = {};
    reviewsToAnalyze.forEach(review => {
      const reviewWords = review.text.toLowerCase().split(/\s+/);
      reviewWords.forEach(word => {
        if (word.length > 2) {
          words[word] = (words[word] || 0) + 1;
        }
      });
    });
    setPopularWords(getTopWords(words, 20));
    setAllWords(words);
  };

  const handleFilterChange = (eventKey) => {
    setFilterType(eventKey);
    if (eventKey === 'All Reviews') {
      setFilteredReviews(reviews);
    } else {
      const sentiment = eventKey === 'Positive Reviews' ? 'Positive' : 'Negative';
      const filtered = reviews.filter(review => review.sentiment === sentiment);
      setFilteredReviews(filtered);
    }
  };

  const handleExport = () => {
    exportToExcel(filteredReviews);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = reviews.filter(review =>
      review.text.toLowerCase().includes(term) || review.title.toLowerCase().includes(term)
    );
    setFilteredReviews(filtered);
  };

  return (
    <>
      <div style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1000, padding: '20px 0', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <Container>
          <h1 className="text-center">Amazon Reviews Analysis</h1>
        </Container>
      </div>
      <Container fluid className="py-4">
        <Row className="mb-4">
          <Col md={6}>
            <Card style={{ height: '300px', overflowY: 'auto' }}>
              <Card.Body>
                <SimilarWords allWords={allWords} />
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card style={{ height: '300px' }}>
              <Card.Body>
                <PopularWords popularWords={popularWords} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Card className="mb-4 search-container">
          <Card.Body>
            <Row className="align-items-center">
              <Col md={2}>
                <span>Displaying {filteredReviews.length} reviews</span>
              </Col>
              <Col md={6}>
                <Form.Control
                  type="text"
                  placeholder="Search reviews"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </Col>
              <Col md={4} className="d-flex justify-content-end">
                <Dropdown onSelect={handleFilterChange} className="me-2">
                  <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    {filterType}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="All Reviews">All Reviews</Dropdown.Item>
                    <Dropdown.Item eventKey="Positive Reviews">Positive Reviews</Dropdown.Item>
                    <Dropdown.Item eventKey="Negative Reviews">Negative Reviews</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Button variant="success" onClick={handleExport}>Export to Excel</Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <ReviewList reviews={filteredReviews} />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default MainPage;