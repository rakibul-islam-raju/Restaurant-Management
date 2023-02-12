import React from 'react';
import Image from 'next/image';
const FeaturedMenus = () => {
  return (
    <div className='  text-center space-y-3 p-5 md:text-white'>
      <div className='bg-center mx-auto'>
        <Image
          className=' rounded-[50%] inline-block'
          src='/breakfast-2.jpg.webp'
          height={99}
          width={99}
        />
      </div>
      <div>
        <p className='text-lg'>Grilled Beef with potatoes</p>
        <p className='text-sm'>Grilled Beef with potatoes</p>
      </div>
    </div>
  );
};

export default FeaturedMenus;
