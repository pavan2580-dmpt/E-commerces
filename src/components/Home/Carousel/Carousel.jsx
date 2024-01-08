import React, { useState, useEffect } from 'react';
import './Carousel.css';

const Carousel = ({ images, interval }) => {

    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, interval);
  
      return () => {
        clearTimeout(timer);
      };
    }, [currentIndex, interval, images]);

  return (
    <div className="image-carousel">
      {images.map((image, index) => (
        <div key={index} className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}>
          <img src={image} alt={`Image ${index + 1}`} style={{height:'500px'}}/>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
