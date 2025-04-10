import React, { useState, useRef } from 'react';
import axios from 'axios';
import './RegisterVoter.css';

const RegisterVoter = () => {
  const [formData, setFormData] = useState({
    name: '',
    birth_date: '',
    image: null,
  });

  const [qrCode, setQrCode] = useState(null);
  const [voterId, setVoterId] = useState(null);
  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const qrRef = useRef(null); // ✅ QR section ref

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });

      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('birth_date', formData.birth_date);
    data.append('image', formData.image);

    try {
      const res = await axios.post('http://voter-app-web.onrender.com/api/add-voter/', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setQrCode(res.data.qr_code);
      setVoterId(res.data.voter_id);
      setMessage('✅ Voter registered successfully!');

      // ✅ Scroll to QR Code section after a small delay
      setTimeout(() => {
        qrRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to register voter.');
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register Voter</h2>

      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="birth_date"
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />

        {imagePreview && (
          <div className="image-preview-container">
            <h3>Image Preview:</h3>
            <img src={imagePreview} alt="Preview" className="image-preview" />
          </div>
        )}

        <button type="submit" className="register-btn">
          Register
        </button>
      </form>

      {message && (
        <p className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
          {message}
        </p>
      )}

      {qrCode && (
        <div className="qr-container" ref={qrRef}> {/* ✅ Reference applied here */}
          <h3>Your Voter QR Code</h3>
          <img
            src={`data:image/png;base64,${qrCode}`}
            alt="QR Code"
          />
          <p>Voter ID: <strong>{voterId}</strong></p>
        </div>
      )}
    </div>
  );
};

export default RegisterVoter;
