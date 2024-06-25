import React from 'react';
import { Table, Badge } from 'react-bootstrap';

const ReviewList = ({ reviews }) => {
  return (
    <div style={{ height: '500px', overflowY: 'auto' }}>
      <Table striped hover bordered>
        <thead style={{ position: 'sticky', top: 0, background: '#f8f9fa', zIndex: 1 }}>
          <tr>
            <th>Sentiment</th>
            <th>Title</th>
            <th>Text</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, index) => (
            <tr key={index}>
              <td>
                <Badge bg={review.sentiment === 'Positive' ? 'success' : 'danger'}>
                  {review.sentiment}
                </Badge>
              </td>
              <td>{review.title}</td>
              <td>{review.text}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ReviewList;