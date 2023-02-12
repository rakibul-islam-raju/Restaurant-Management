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

export default function Reviewer() {
	return (

		<div class='  pb-14    max-w-sm  p-8     rounded-2xl space-y-4  '>
			<Image
				src={'/person_3.jpg.webp'}
				height={99}
				width={99}
				className='rounded-full ring-4 ring-green-400  mx-auto '
			/>

			<div className='text-center space-y-2'>
				<p className='text-base text-center'>
					Far far away, behind the word mountains, far from the
					countries Vokalia and Consonantia,
				</p>
				<p className='text-2xl'>Mark Stevenson</p>
				<p className='text-sm'>Customer</p>
			</div>
		</div>


	);
}
