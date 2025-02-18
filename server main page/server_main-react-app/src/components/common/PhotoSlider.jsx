import React from 'react';
import Slider from 'react-slick';
import photoBannerPre from '../../assets/일상 - ARCO7858 .jpg';
import festivalPhoto from '../../assets/축제날 - 009.png';
import '../../styles/components/PhotoSlider.css';

const NextArrow = (props) => (
  <div className="slick-arrow slick-next custom-arrow" {...props}>
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path fill="#fff" d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"/>
    </svg>
  </div>
);

const PrevArrow = (props) => (
  <div className="slick-arrow slick-prev custom-arrow" {...props}>
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path fill="#fff" d="M15.41,16.59L10.83,12l4.58-4.59L14,6l-6,6l6,6L15.41,16.59z"/>
    </svg>
  </div>
);

const PhotoSlider = () => {
  const settings = {
    dots: true,               // dot 네비게이터 활성화
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,             // 화살표 네비게이션 활성화
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dotsClass: "slick-dots custom-dots",  // 커스텀 dots 클래스
  };

  return (
    <div className="photo-section">
      <Slider {...settings}>
        <div className="slide-item">
          <img src={photoBannerPre} className="slider-image" alt="Photo 1" />
        </div>
        <div className="slide-item">
          <img src={festivalPhoto} className="slider-image" alt="Photo 2" />
        </div>
      </Slider>
    </div>
  );
};

export default PhotoSlider;
