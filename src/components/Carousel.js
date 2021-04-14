import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const Dot = styled.div`
  opacity: ${(props) => (props.isActive ? 1 : 0.5)};
`;

const Indicator = ({ currentSlide, amountSlides, nextSlide }) => {
  return (
    <div className="indicator-wrapper">
      {Array(amountSlides)
        .fill(1)
        .map((_, i) => (
          <Dot
            key={i}
            isActive={currentSlide === i}
            onClick={() => nextSlide(i)}
            className="dot"
          />
        ))}
    </div>
  );
};

const Carousel = ({
  images = [],
  autoPlay = true,
  autoPlayTime = 3000,
  children,
  ...props
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  function nextSlide(slideIndex = currentSlide + 1) {
    const newSlideIndex = slideIndex >= images.length ? 0 : slideIndex;

    setCurrentSlide(newSlideIndex);
  }

  function prevSlide(slideIndex = currentSlide - 1) {
    const newSlideIndex = slideIndex < 0 ? images.length - 1 : slideIndex;

    setCurrentSlide(newSlideIndex);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (autoPlay) {
        nextSlide();
      }
    }, autoPlayTime);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <div className="wrapper" {...props}>
      {images.map((imageUrl, index) => (
        <div
          className="slide"
          key={index}
          style={{
            backgroundImage: `url(${imageUrl})`,
            marginLeft: index === 0 ? `-${currentSlide * 100}%` : undefined,
          }}
        ></div>
      ))}
      <div className="gradient" />
      <Indicator
        currentSlide={currentSlide}
        amountSlides={images.length}
        nextSlide={nextSlide}
      />
      <div className="arrows">
        <i class="fas fa-arrow-left" onClick={() => prevSlide()}></i>
        <i class="fas fa-arrow-right" onClick={() => nextSlide()}></i>
      </div>
      <div className="children-wrapper">{children}</div>
    </div>
  );
};

export default Carousel;
