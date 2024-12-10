import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReservationForm from './ReservationForm';
import axios from 'axios';

const ConcertDetails = () => {
  const { id } = useParams();
  const [concert, setConcert] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/concerts/${id}`)
      .then((response) => {
        setConcert(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the concert details!', error);
      });
  }, [id]);

  if (!concert) {
    return <div style={styles.loading}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.detailsCard}>
        <img src={concert.image} alt={concert.name} style={styles.image} />
        <div style={styles.infoContainer}>
          <h2 style={styles.title}>{concert.name}</h2>
          <p style={styles.info}>
            <strong>Artist:</strong> {concert.artist}
          </p>
          <p style={styles.info}>
            <strong>Date:</strong> {concert.date}
          </p>
          <p style={styles.info}>
            <strong>Place:</strong> {concert.place}
          </p>
          <p style={styles.description}>{concert.description}</p>
          <ReservationForm
            concertId={concert.id}
            concertName={concert.name}
            availableSeats={concert.availableSeats}
          />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  detailsCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    padding: '20px',
    width: '90%',
    maxWidth: '800px',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    borderRadius: '10px',
    marginBottom: '20px',
    objectFit: 'cover',
  },
  infoContainer: {
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '10px',
  },
  info: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '10px',
  },
  description: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '20px',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.5rem',
    color: '#777',
    marginTop: '50px',
  },
};

export default ConcertDetails;
