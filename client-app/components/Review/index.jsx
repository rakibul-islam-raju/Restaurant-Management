import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { Pagination } from 'swiper';
import Image from 'next/image';
import Reviewer from './Reviewer';

export default function Review() {
  return (
    <>
      <div className='p-4 md:px-60  mx-auto  '>
        <Swiper
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            // when window width is >= 640px
            640: {
              width: 640,
              slidesPerView: 1,
            },
            // when window width is >= 768px
            768: {
              width: 768,
              slidesPerView: 3,
            },
          }}
          modules={[Pagination]}
          className='mySwiper cursor-pointer '
        >
          <SwiperSlide>
            <Reviewer />
          </SwiperSlide>
          <SwiperSlide>
            <Reviewer />
          </SwiperSlide>
          <SwiperSlide>
            <Reviewer />
          </SwiperSlide>
          <SwiperSlide>
            <Reviewer />
          </SwiperSlide>
          <SwiperSlide>
            <Reviewer />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
