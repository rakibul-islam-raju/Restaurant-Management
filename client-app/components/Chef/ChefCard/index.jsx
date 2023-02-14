import Image from 'next/image';
import React from 'react';

function ChefCard() {
  return (
    <div className='w-full  p-4  '>
      <div className=' relative  h-72 md:h-96  '>
        <Image
          src={'/chef-4.jpg.webp'}
          fill
          alt=' Check order chef'
          className='object-cover object-top rounded-lg'
        />
      </div>
      <div className='text-left text-lg pt-5 pb-3 '>
        <p className='text-lg'>Noman Reign</p>
        <p className='text-sm'>Noman Reign Lorem .</p>
      </div>
      <div className='text-2xl space-x-2  '>
        <a href=''>
          <i class='bx bxl-twitter  '></i>
        </a>
        <a href=''>
          <i class='bx bxl-facebook  '></i>
        </a>
        <a href=''>
          <i class='bx bxl-youtube  '></i>
        </a>
        <a href=''>
          <i class='bx bxl-whatsapp  '></i>
        </a>
      </div>
    </div>
  );
}

export default ChefCard;
