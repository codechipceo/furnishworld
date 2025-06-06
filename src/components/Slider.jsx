// components/AutoPlaySwiper.jsx

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const AutoPlaySwiper = ({ slides, config, breakpoints = {} }) => {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      autoplay={{ delay: config.delay ?? 3000, disableOnInteraction: false }}
      // pagination={{ clickable: true }}
      navigation
      loop
      scrollbar
      {...config}
      breakpoints={breakpoints}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>{slide}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default AutoPlaySwiper;
