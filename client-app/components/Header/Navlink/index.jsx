import React from 'react';

const NavLinks = () => {
  const Links = [
    {
      name: 'Home',
      link: '/',
      icon: 'bx bx-home',
    },
    {
      name: 'About',
      link: '/',
      icon: 'bx bx-info-circle',
    },
    {
      name: 'Menu',
      link: '/',
      icon: 'bx bx-food-menu',
    },
    {
      name: 'Contact',
      link: '/',
      icon: 'bx bx-message-square-dots',
    },
    {
      name: 'Book a Table',
      link: '/',
      icon: 'bx bx-purchase-tag',
    },
  ];
  return (
    <>
      {Links.map((link, i) => (
        <li key={i} className=' hover:text-yellow-600 '>
          <a
            className={` ${
              (link.name == 'Book a Table' &&
                ' bg-yellow-500 text-white px-4 py-3 md:py-3 text-sm font-normal opacity-[1] block rounded-md  transition ease-in-out hover:bg-yellow-600 ') ||
              'px-0 py:2 md:py-4 text-sm  text-gray-400 font-normal opacity-[1]  hover:text-yellow-500 transition ease-in-out flex flex-col items-center space-y-1 '
            }`}
            href={link.link}
          >
            {link.name != 'Book a Table' && (
              <span className='text-2xl md:hidden'>
                <i class={`${link.icon}`}></i>
              </span>
            )}

            {link.name}
          </a>
        </li>
      ))}
    </>
  );
};

export default NavLinks;
