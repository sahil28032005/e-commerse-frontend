import React, { useState, useEffect } from 'react';
import './styles/slideshow.css'; // Import CSS file

const slides = [
  { url: 'https://click-leaders.pl/wp-content/uploads/2022/07/01-e-commerce-czyli-jak-ogarnac-ten-caly-bigos.jpg', title: 'Slide 1' },
  { url: 'https://cdn.wedevs.com/uploads/2021/04/Limited-Time-Offer_-How-To-Write-a-Discount-Offer-For-Limited-Time-Only.png', title: 'Slide 2' },
  { url: 'https://cdn.prod.website-files.com/6352c402e23b70ffdd5803f2/63896ddc8d627ce09e294e49_10-Ways-to-Wield-Offers-Discounts-and-Deals-to-Your-Business-Advantage.jpeg', title: 'Slide 3' },
  { url: 'https://www.advanceecomsolutions.com/wp-content/uploads/2022/08/ecom-ban-img.jpg', title: 'Slide 4' },
];

const Slideshow = () => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className="slideshow">
      <button className="left-arrow" onClick={prevSlide}>&#10094;</button>
      <button className="right-arrow" onClick={nextSlide}>&#10095;</button>
      {slides.map((slide, index) => (
        <div
          className={index === current ? 'slide active' : 'slide'}
          key={index}
        >
          {index === current && (
            <img src={slide.url} alt={slide.title} className="image" />
          )}
        </div>
      ))}
    </div>
  );
};

export default Slideshow;
