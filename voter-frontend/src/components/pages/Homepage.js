// src/components/pages/HomePage.js

import React from "react";
import QRScannerSection from "../sections/QRScannerSection";
import ImageCarousel from "../sections/ImageCarousel";
import Photocoll from "../sections/photocoll";

const HomePage = () => {
  return (
    <>
      <QRScannerSection />
      <ImageCarousel />
      <Photocoll />
    </>
  );
};

export default HomePage;
