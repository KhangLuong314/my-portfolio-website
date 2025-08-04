// Carousel.jsx
import React, { useState, useEffect, useRef } from 'react';
import "../designs/Carousel.css" // Adjust path to match your CSS file location

const Carousel = ({ images, interval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    if (!hovering) {
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, interval);
    }
    return () => resetTimeout();
  }, [currentIndex, hovering, interval, images.length]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const goToIndex = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="carousel-wrapper">
      <div
        className={`carousel-container ${isLoaded ? 'loaded' : ''}`}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <div className="carousel-fade">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index + 1}`}
              className={`carousel-image ${index === currentIndex ? 'active' : ''}`}
              onError={(e) => {
                console.error(`Failed to load image: ${src}`);
                e.target.style.display = 'none';
              }}
            />
          ))}
        </div>

        <div className="carousel-overlay">
          <h1 className="carousel-title">Innovation. Research. Explore. Discover</h1>
        </div>

        <button className="arrow left" onClick={goToPrevious} aria-label="Previous slide">
          &#8249;
        </button>
        <button className="arrow right" onClick={goToNext} aria-label="Next slide">
          &#8250;
        </button>

        <div className="dots">
          {images.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {!hovering && <div className="progress-bar" />}
      </div>
    </div>
  );
};

export default Carousel;