import Image from 'next/image';
import React from 'react';
import ChefCard from './ChefCard';

function Chef() {
	return (
		<section className='md:max-w-6xl mx-auto '>
			<div className='flex flex-col md:flex-row items-center   '>

				<ChefCard />
				<ChefCard />
				<ChefCard />
				<ChefCard />
			</div>
		</section>
	);
}

export default Chef;