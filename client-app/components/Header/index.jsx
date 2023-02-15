import Image from 'next/image';
import React from 'react';
import Navbar from './Navbar';
import Topbar from './Topbar';

function Header() {
  return (
    <div>
      <Topbar />
      <Navbar />
      <section className='relative bg-gradient-to-br w-full h-screen from-gray-800 to-gray-600  '>
        <div className=' md:top-0 h-screen top-16  mix-blend-overlay z-0 opacity-80 '>
          <Image
            src={'/bg_1.jpg.webp'}
            fill
            alt=' Food Background'
            className='object-cover object-center md:object-center'
          />
        </div>
        <div className='absolute text-center right-[20%] left-[18%] top-[40%] text-white'>
          <p className='text-[80px] great-font '>Take Order</p>
          <h1 className=''>Best Restraurant</h1>
        </div>
      </section>
    </div>
  );
}

export default Header;
