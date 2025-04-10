import React, { useState, useEffect } from "react";
import "./qrScannerSection.css";
import qrVideo from "../images/scanning.mp4";
import qr from "../images/qr.png";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";

const QRScannerSection = () => {
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [voterInfo, setVoterInfo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let scannerInstance = null;

    if (scanning) {
      scannerInstance = new Html5QrcodeScanner("scanner", { fps: 10, qrbox: 250 }, false);

      scannerInstance.render(
        async (decodedText) => {
          setScanResult(decodedText);
          setScanning(false);
          scannerInstance.clear();

          try {
            const response = await axios.post("http://voter-app-web.onrender.comlocalhost:8000/api/verify-voter/", {
              qr_data: decodedText,
            });

            setVoterInfo(response.data);
            setError("");
          } catch (err) {
            if (err.response?.data?.error) {
              setError(err.response.data.error);
            } else {
              setError("Verification failed.");
            }
          }
        },
        (error) => console.warn(error)
      );
    }

    return () => {
      if (scannerInstance) {
        scannerInstance.clear().catch((err) => console.error("Clear error:", err));
      }
    };
  }, [scanning]);

  const handleScanAgain = () => {
    setScanResult(null);
    setVoterInfo(null);
    setError("");
    setScanning(false);
  };

  return (
    <div className="qr-section">
      <h2 className="qr-title">Secure Your Vote – Scan Your Voter QR Code</h2>

      <div className="qr-content">
        <div className="qr-video-container">
          <video src={qrVideo} autoPlay loop muted className="qr-video" />
        </div>

        <div className="qr-scan-area">
          {!scanning && !scanResult && (
            <div className="btncont">
              <img
                src={qr}
                alt="QR Scan Illustration"
                className="scan-illustration"
              />
              <button className="scan-btn" onClick={() => setScanning(true)}>
                Scan QR Code
              </button>
            </div>
          )}

          {scanning && <div id="scanner" className="scanner-view"></div>}

          {scanResult && voterInfo && (
            <div className="voter-details">
              <p><strong>Name:</strong> {voterInfo.name}</p>
              <p><strong>Birth Date:</strong> {voterInfo.birth_date}</p>
              <p><strong>Voter ID:</strong> {voterInfo.voter_id}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={voterInfo.has_voted ? "voted" : "not-voted"}>
                  {voterInfo.has_voted ? "Already Voted" : "Not Voted"}
                </span>
              </p>
              {voterInfo.image && (
                <img
                  src={`http://voter-app-web.onrender.com${voterInfo.image}`}
                  alt="Voter"
                  className="voter-image"
                />
              )}
            </div>
          )}

          {scanResult && error && <p className="scan-error">{error}</p>}

          {(scanResult || error) && (
            <button className="scan-again-btn" onClick={handleScanAgain}>
              Scan Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRScannerSection;
