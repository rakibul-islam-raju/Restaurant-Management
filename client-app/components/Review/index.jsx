import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Pagination } from 'swiper';

import Reviewer from './Reviewer';
import SectionHeader from 'components/SectionHeader';

export default function Review() {
  return (
    <>
      <div className='wrapper '>
        <SectionHeader upperText={'Testimony'} lowerText={'Happy Customer'} />
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
