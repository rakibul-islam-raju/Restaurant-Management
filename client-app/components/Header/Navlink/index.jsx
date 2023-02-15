import React from 'react';

const NavLinks = ({ value }) => {
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
  ];

  return (
    <>
      {Links.map((link, i) => (
        <li key={i} className=' hover:text-yellow-600 '>
          <a
            className={` ${
              value
                ? ' md:text-black  nav-button  '
                : ' md:text-white  nav-button     '
            }hover:text-yellow-500  flex flex-col items-center `}
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
      <li className='hover:text-yellow-600 '>
        <a
          className={`${
            value ? '  md:rounded-none  ' : '   rounded-lg  '
          } ' text-white  bg-golden p-3  hover:opacity-80 rounded-lg  `}
          href='/'
        >
          Book Table
        </a>
      </li>
    </>
  );
};

export default NavLinks;

// {
//   Links.map((link, i) => (
//     <li key={i} className=' hover:text-yellow-600 '>
//       <a
//         className={` ${
//           link.name == 'Book a Table'
//             ? ' text-white nav-button bg-yellow-500 p-3     hover:bg-yellow-600 '
//             : value
//             ? ' md:text-black  nav-button    '
//             : ' md:text-white  nav-button     '
//         }hover:text-yellow-500  flex flex-col items-center `}
//         href={link.link}
//       >
//         {link.name != 'Book a Table' && (
//           <span className='text-2xl md:hidden'>
//             <i class={`${link.icon}`}></i>
//           </span>
//         )}

//         {link.name}
//       </a>
//     </li>
//   ));
// }
