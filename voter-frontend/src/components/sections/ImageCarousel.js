import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom Next Arrow
const NextArrow = ({ onClick }) => (
  <div
    className="custom-arrow next-arrow"
    onClick={onClick}
    style={{
      position: "absolute",
      top: "50%",
      right: "20px",
      transform: "translateY(-50%)",
      zIndex: 2,
      fontSize: "30px",
      color: "#fff",
      cursor: "pointer",
      borderRadius: "50%",
      padding: "10px",
    }}
  >
    ▶
  </div>
);

// Custom Prev Arrow
const PrevArrow = ({ onClick }) => (
  <div
    className="custom-arrow prev-arrow"
    onClick={onClick}
    style={{
      position: "absolute",
      top: "50%",
      left: "20px",
      transform: "translateY(-50%)",
      zIndex: 2,
      fontSize: "30px",
      color: "#fff",
      cursor: "pointer",
      borderRadius: "50%",
      padding: "10px",
    }}
  >
    ◀
  </div>
);

const images = [
  { src: "/img/first.jpg", alt: "Image 1" },
  { src: "/img/secjpg.jpg", alt: "Image 2" },
  { src: "/img/whYSDm7vCSzS0MO1737616897.jpg", alt: "Image 3" },
  { src: "/img/yAZRSIv0CrnbyL71728551668.jpg", alt: "Image 4" },
  { src: "/img/MivlTMWyqfszHFA1736326155.jpg", alt: "Image 5" },
  { src: "/img/KKf8o4KoJi4jRM81740074978.jpg", alt: "Image 6" },
  { src: "/img/KLEWfiVU4HdLSdu1741589446.jpg", alt: "Image 7" },
  { src: "/img/FLipYObUslchUzk1739512362.jpg", alt: "Image 8" },
  { src: "/img/bXDQo5fCrDutjvj1739956015.jpg", alt: "Image 9" },
  { src: "/img/BkKoLRW2n3wkm4P1737821452.jpg", alt: "Image 10" },
];

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="container mt-4 position-relative">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image.src}
              alt={image.alt}
              className="w-100"
              style={{
                height: "300px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
