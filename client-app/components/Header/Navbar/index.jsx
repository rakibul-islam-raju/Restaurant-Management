'use client';

import React, { useState } from 'react';

import NavLinks from '../Navlink';

// import Button from './Button';
export default function Navbar() {
  return (
    <nav className='relative top-0 py-4 md:py-2 md:px-4 md:bg-transparent md:border-b-[1px]  border-gray-700  md:top-[30px] md:absolute bg-black z-[3] w-full px-4   '>
      <div className='flex items-center justify-between  md:flex-nowrap container  md:px-16 mx-auto  '>
        <a
          className='text-white font-black text-xl inline-block flex-1  '
          href=''
        >
          Check Order
        </a>
        <div className='hover:text-yellow-600 text-2xl text-gray-500  md:hidden px-0 cursor-pointer  pl-10 ml-auto '>
          <i class='bx bxs-user-circle'></i>
        </div>
        <div
          className={
            ' md:static md:bg-transparent fixed bottom-0   left-0 right-0 px-4  py-1 md:border-0 border-t-[1px]  border-gray-700 shadow-cyan-500/50 bg-gray-100  '
          }
        >
          <ul className='pb-1   text-gray-500 flex items-center  flex-row md:ml-auto  md:mx-0 md:pl-0 space-x-4 transition-all duration-200 ease-in justify-between  '>
            <NavLinks />
          </ul>
        </div>
      </div>
    </nav>
  );
}
