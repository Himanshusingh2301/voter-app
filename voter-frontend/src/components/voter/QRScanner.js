import React, { useState, useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import API from "../../services/api";

const QRScanner = () => {
  const [scannedData, setScannedData] = useState(null);
  const [voterDetails, setVoterDetails] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const html5QrCodeRef = useRef(null);

  const verifyVoter = async (qrData) => {
    setLoading(true);
    try {
      const response = await API.post("verify-voter/", { qr_data: qrData });
      setVoterDetails(response.data);
      setError("");
    } catch (err) {
      console.error("Verification Error:", err);
      setError(err.response?.data?.error || "Verification failed");
      setVoterDetails(null);
    } finally {
      setLoading(false);
    }
  };

  const startScanner = async () => {
    if (isScanning) return;

    const qrRegionId = "reader";

    if (!html5QrCodeRef.current) {
      html5QrCodeRef.current = new Html5Qrcode(qrRegionId);
    }

    try {
      await html5QrCodeRef.current.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          setScannedData(decodedText);
          verifyVoter(decodedText);
          stopScanner(); // Auto stop after successful scan
        },
        (errorMessage) => {
          console.warn("QR Scan error:", errorMessage);
        }
      );
      setIsScanning(true);
    } catch (err) {
      console.error("Error starting scanner:", err);
    }
  };

  const stopScanner = async () => {
    if (html5QrCodeRef.current && isScanning) {
      try {
        await html5QrCodeRef.current.stop();
        await html5QrCodeRef.current.clear();
        setIsScanning(false);
      } catch (err) {
        console.error("Error stopping scanner:", err);
      }
    }
  };

  useEffect(() => {
    return () => {
      stopScanner(); // Clean up on unmount
    };
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Scan Voter QR Code</h2>
      <div id="reader" style={{ margin: "20px auto", width: "300px" }}></div>

      <button
        onClick={startScanner}
        disabled={isScanning}
        style={{
          padding: "10px 20px",
          margin: "10px",
          backgroundColor: "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: isScanning ? "not-allowed" : "pointer",
        }}
      >
        Start Scanning
      </button>

      <button
        onClick={stopScanner}
        disabled={!isScanning}
        style={{
          padding: "10px 20px",
          margin: "10px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: !isScanning ? "not-allowed" : "pointer",
        }}
      >
        Stop Scanning
      </button>

      {scannedData && (
        <p style={{ marginTop: "10px" }}>
          <strong>Scanned Data:</strong> {scannedData}
        </p>
      )}

      {loading && <p style={{ color: "blue" }}>Verifying voter details...</p>}

      {voterDetails && (
        <div
          style={{
            marginTop: "20px",
            border: "1px solid #ddd",
            padding: "15px",
            borderRadius: "10px",
            display: "inline-block",
          }}
        >
          <h3 style={{ marginBottom: "10px" }}>✅ Voter Verified</h3>
          <p>
            <strong>Name:</strong> {voterDetails.name}
          </p>
          <p>
            <strong>Birth Date:</strong> {voterDetails.birth_date}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              style={{
                color: voterDetails.has_voted ? "red" : "green",
                fontWeight: "bold",
              }}
            >
              {voterDetails.has_voted ? "Already Voted" : "Not Voted"}
            </span>
          </p>
          {voterDetails.image && (
            <img
              src={`http://localhost:8000${voterDetails.image}`}
              alt="Voter"
              width="180"
              style={{ borderRadius: "10px", marginTop: "10px" }}
            />
          )}
        </div>
      )}

      {error && (
        <p style={{ color: "red", fontWeight: "bold", marginTop: "15px" }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default QRScanner;
