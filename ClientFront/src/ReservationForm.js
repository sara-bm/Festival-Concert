import React, { useState, useRef } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import { toPng } from 'html-to-image';

const ReservationForm = ({ concertId, concertName, availableSeats }) => {
  const [seats, setSeats] = useState(1);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [ticket, setTicket] = useState(null);
  const ticketRef = useRef();

  const handleReservation = () => {
    if (!userName.trim() || !email.trim()) {
      alert('Please enter a valid name and email.');
      return;
    }

    if (seats > availableSeats) {
      alert('Not enough seats available.');
      return;
    }

    const reservationData = {
      UserName: userName,
      Email: email,
      ConcertId: concertId,
      ReservedSeats: seats,
    };

    axios.post('http://localhost:5000/api/reservations', reservationData)
      .then(() => {
        console.log(concertName)
        alert('Reservation successful!');
        setTicket({
          userName,
          email,
          concertName,
          reservedSeats: seats,
          date: new Date().toLocaleDateString(),
        });
        setShowPopup(false);
      })
      .catch((error) => {
        console.error('Error making the reservation!', error);
      });
  };

  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  const downloadTicket = () => {
    if (ticketRef.current) {
      toPng(ticketRef.current)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = 'ticket.png';
          link.href = dataUrl;
          link.click();
        })
        .catch((error) => {
          console.error('Error generating ticket image:', error);
        });
    }
  };

  return (
    <div>
      <button onClick={openPopup} style={styles.reserveButton}>Reserve</button>

      {showPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popupContent}>
            <h3 style={styles.popupTitle}>Reserve Seats</h3>
            <label htmlFor="userName">Your Name:</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              style={styles.input}
            />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={styles.input}
            />
            <label htmlFor="seats">Number of Seats:</label>
            <input
              type="number"
              id="seats"
              min="1"
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
              style={styles.input}
            />
            <div style={styles.buttonContainer}>
              <button onClick={handleReservation} style={styles.confirmButton}>Confirm Reservation</button>
              <button onClick={closePopup} style={styles.cancelButton}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {ticket && (
        <div ref={ticketRef} style={styles.ticketContainer}>
          <div style={styles.ticketHeader}>
            <h2 style={styles.concertName}>{ticket.concertName}</h2>
            <p style={styles.ticketDate}>Date: {ticket.date}</p>
          </div>
          <div style={styles.ticketBody}>
          {/* <p style={{color:"#900C3F"}}><strong >{concertName}</strong></p> */}
            <p><strong>Name:</strong> {ticket.userName}</p>
            <p><strong>Email:</strong> {ticket.email}</p>
            <p><strong>Reserved Seats:</strong> {ticket.reservedSeats}</p>
            <QRCodeCanvas
              value={`Name: ${ticket.userName}, Email: ${ticket.email}, Concert: ${ticket.concertName}, Seats: ${ticket.reservedSeats}`}
              style={styles.qrCode}
            />
          </div>
          <button onClick={downloadTicket} style={styles.downloadButton}>Download Ticket</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  reserveButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  popupOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    width: '400px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  popupTitle: {
    fontSize: '1.5rem',
    marginBottom: '15px',
    color: '#4CAF50',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '15px',
  },
  confirmButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  ticketContainer: {
    margin: '20px auto',
    padding: '20px',
    maxWidth: '600px',
    border: '2px dashed #4CAF50',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  ticketHeader: {
    borderBottom: '2px solid #4CAF50',
    paddingBottom: '10px',
    marginBottom: '10px',
    textAlign: 'center',
  },
  concertName: {
    fontSize: '1.5rem',
    color: '#4CAF50',
  },
  ticketDate: {
    color: '#888',
  },
  ticketBody: {
    textAlign: 'center',
  },
  qrCode: {
    marginTop: '15px',
  },
  downloadButton: {
    marginTop: '15px',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
  },
};

export default ReservationForm;
