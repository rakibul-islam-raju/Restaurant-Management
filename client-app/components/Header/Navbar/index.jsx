'use client';

import Link from 'next/link';
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
          : 'md:bg-transparent md:absolute md:top-[40px] border-gray-700 '
      } fixed top-0  md:border-b-[1px]     bg-golden md:bg-none z-[3] w-full `}
    >
      <div
        className={`${
          navbar ? ' md:my-0' : 'md:my-4  '
        } flex items-center md:max-w-6xl mx-auto  p-4  pb-4 md:py-0  `}
      >
        <Link
          className={`${
            navbar ? 'md:text-black ' : 'md:text-white'
          } font-black text-2xl text-white `}
          href='/'
        >
          Check Order
        </Link>

        <div
          className={
            ' md:static md:bg-transparent fixed bottom-0   left-0 right-0    md:border-0 border-t-[1px]   shadow-inner md:shadow-none  bg-gray-100 md:bg-none md:ml-auto m-0 px-4 py-2 md:py-0 '
          }
        >
          <ul className='   flex items-center  flex-row   transition-all duration-200 ease-in justify-between  '>
            <NavLinks value={navbar} />
          </ul>
        </div>
        <div className=' text-white md:text-golden hover:opacity-80 text-2xl ml-auto   cursor-pointer md:ml-7  '>
          <i class='bx bxs-user-circle'></i>
        </div>
      </div>
    </nav>
  );
}
