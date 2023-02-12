'use client';

import React, { useEffect, useState } from 'react';

import NavLinks from '../Navlink';

// import Button from './Button';
export default function Navbar() {
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  // useEffect(() => {

  // }, []);
  if (typeof window != 'undefined') {
    window.addEventListener('scroll', changeBackground);
  }
  return (
    <nav
      className={`${
        navbar
          ? 'md:bg-gray-200 md:fixed md:transition md:duration-300  top-0 left-0 right-0 md:ease-out md:shadow-lg '
          : 'md:bg-transparent md:absolute md:top-[30px] border-gray-700'
      } fixed top-0 py-4 md:py-2 md:px-4  md:border-b-[1px]     bg-gradient-to-r from-yellow-700  to-yellow-500 md:bg-none z-[3] w-full px-4 `}
    >
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
            ' md:static md:bg-transparent fixed bottom-0   left-0 right-0 px-4  py-1 md:border-0 border-t-[1px]   shadow-inner  bg-gray-100  '
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
