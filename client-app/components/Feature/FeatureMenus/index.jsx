import React from 'react';
import Image from 'next/image';
const FeaturedMenus = () => {
  return (
    <div className='  text-center space-y-3  md:text-white mt-3'>
      <div className='relative h-20 w-20 mx-auto '>
        <Image
          src='/breakfast-2.jpg.webp'
          fill
          alt=' Grilled Beef'
          className='object-cover object-center rounded-full '
        />
      </div>
      <div>
        <h6 className='md:text-white'>Grilled Beef with potatoes</h6>
        <p className='text-sm md:text-white'>Grilled Beef with potatoes</p>
      </div>
    </div>
  );
};

export default FeaturedMenus;
