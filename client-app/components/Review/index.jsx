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
      <div className='p-4  md:max-w-6xl mx-auto  '>
        <div className=''>
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },

              1024: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
            }}
            modules={[Pagination]}
            className='mySwiper cursor-pointer  '
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
            <SwiperSlide>
              <Reviewer />
            </SwiperSlide>
            <SwiperSlide>
              <Reviewer />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
}
