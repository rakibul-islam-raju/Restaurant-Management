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

		<div class='  pb-14   flex flex-col items-center py-4    space-y-8 rounded-2xl   '>
			<Image
				src={'/person_3.jpg.webp'}
				height={99}
				width={99}
				className='rounded-full ring-4 ring-golden  mx-auto '
			/>

			<div className='text-center space-y-2'>
				<p className=' text-center'>
					Far far away, behind the word mountains, far from the
					countries Vokalia
				</p>
				<h4 className='text-2xl'>Mark Stevenson</h4>
				<p className='text-xs font-semibold uppercase leading-loose'>Customer</p>
			</div>
		</div>


	);
}
