import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './VoterLogin.css';

const VoterLogin = () => {
  const [voterId, setVoterId] = useState('');
  const [voterInfo, setVoterInfo] = useState(null);
  const [error, setError] = useState('');
  const qrRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setVoterInfo(null);

    try {
      const res = await axios.post('http://voter-app-web.onrender.com/api/voter-login/', {
        voter_id: voterId,
      });

      setVoterInfo(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong.');
    }
  };

  useEffect(() => {
    if (voterInfo && qrRef.current) {
      qrRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [voterInfo]);

  return (
    <div className="voter-login-container">
      <h2 className="voter-login-title">Voter Login</h2>
      <form onSubmit={handleSubmit} className="voter-login-form">
        <input
          type="text"
          placeholder="Enter Voter ID"
          value={voterId}
          onChange={(e) => setVoterId(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {voterInfo && (
        <div className="voter-info" ref={qrRef}>
          <h3>Voter Details</h3>
          <p><strong>Name:</strong> {voterInfo.name}</p>
          <p><strong>DOB:</strong> {voterInfo.birth_date}</p>
          <p><strong>Voter ID:</strong> {voterInfo.voter_id}</p>
          <p><strong>Has Voted:</strong> {voterInfo.has_voted ? 'Yes' : 'No'}</p>
          <img
            src={`http://localhost:8000${voterInfo.image}`}
            alt="Voter"
            className="voter-photo"
          />
          <img
            src={`data:image/png;base64,${voterInfo.qr_code}`}
            alt="QR Code"
            className="qr-code"
          />
        </div>
      )}
    </div>
  );
};

export default VoterLogin;
