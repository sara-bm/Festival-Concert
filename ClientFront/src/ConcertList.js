import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ConcertList = () => {
  const [concerts, setConcerts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/concerts')
      .then((response) => {
        setConcerts(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the concerts!', error);
      });
  }, []);

  return (
    <div>
      <h2 className="page-title">Upcoming Concerts</h2>
      <div className="concert-grid">
  {concerts.map((concert) => (
    <div key={concert.id} className="concert-item">
      <img
        src={concert.image || '/placeholder-image.jpg'}
        alt={concert.name}
        className="concert-image"
      />
      <div className="concert-details">
        <h3>{concert.name}</h3>
        <p><strong>Artist:</strong> {concert.artist}</p>
        <p><strong>Date:</strong> {concert.date}</p>
        <p><strong>Available Seats:</strong> {concert.availableSeats}</p>
        <Link to={`/concert/${concert.id}`} className="view-details-link">View Details</Link>
      </div>
    </div>
  ))}
</div>
    </div>
  );
};

export default ConcertList;
