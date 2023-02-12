import Image from 'next/image';
import React from 'react';
import Navbar from './Navbar';
import Topbar from './Topbar';

function Header() {
  return (
    <div>
      <Topbar />
      <Navbar />
      <section className='relative  bg-gradient-to-br  from-gray-800 to-gray-600  '>
        <Image
          className=' w-full md:h-screen  mix-blend-overlay z-0 opacity-80 '
          src='/bg_1.jpg.webp'
          height={700}
          width={700}
        />
      </section>
    </div>
  );
}

export default Header;
