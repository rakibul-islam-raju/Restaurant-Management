import SectionHeader from 'components/SectionHeader';
import Image from 'next/image';
import React from 'react';
import ChefCard from './ChefCard';

function Chef() {
	return (
		<section className='md:max-w-6xl mx-auto md:pt-16 pt-3 '>
			<SectionHeader upperText={'Chef'} lowerText={'Our Master Chef'} />
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