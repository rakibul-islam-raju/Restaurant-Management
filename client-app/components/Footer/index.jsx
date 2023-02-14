import Image from 'next/image';
import React from 'react';

function Footer() {
  return (
    <footer class='bg-slate-800 md:py-16  pb-[67px]  '>
      <div class='grid grid-cols-1 gap-x-8 p-4  md:grid-cols-4 leading-loose text-white text-lg md:max-w-6xl mx-auto '>
        <div>
          <div className='mb-4 space-y-6'>
            <p className='font-bold text-xl '>Take Order</p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum,
              alias atque. Corrupti quo itaque quas adipisci molestias modi
              architecto incidunt,
            </p>
          </div>
          <div className='text-2xl space-x-2  '>
            <a href=''>
              <i class='bx bxl-twitter  '></i>
            </a>
            <a href=''>
              <i class='bx bxl-twitter  '></i>
            </a>
            <a href=''>
              <i class='bx bxl-twitter  '></i>
            </a>
          </div>
        </div>

        <div className='mb-4 space-y-6'>
          <p className='font-bold text-xl '>Take Order</p>

          <div className=' '>
            <div className='flex-center '>
              <p>Saturday</p>
              <p>9:00 - 24:00</p>
            </div>
            <div className='flex-center '>
              <p>Saturday</p>
              <p>9:00 - 24:00</p>
            </div>
            <div className='flex-center '>
              <p>Saturday</p>
              <p>9:00 - 24:00</p>
            </div>
            <div className='flex-center '>
              <p>Saturday</p>
              <p>9:00 - 24:00</p>
            </div>
            <div className='flex-center '>
              <p>Saturday</p>
              <p>9:00 - 24:00</p>
            </div>
            <div className='flex-center '>
              <p>Saturday</p>
              <p>9:00 - 24:00</p>
            </div>
            <div className='flex-center '>
              <p>Saturday</p>
              <p>9:00 - 24:00</p>
            </div>
          </div>
        </div>

        <div className='mb-4 space-y-6'>
          <p className='font-bold text-xl '>Take Order</p>
          <div className='space-y-1'>
            <div className='flex flex-col md:flex-row gap-1  '>
              <div className='relative h-20 md:h-28 w-full '>
                <Image
                  src={'/insta-1.jpg.webp'}
                  fill
                  alt=' Check order chef'
                  className='object-cover object-center md:object-top'
                />
              </div>
              <div className='relative h-20 md:h-28  w-full '>
                <Image
                  src={'/insta-2.jpg.webp'}
                  fill
                  alt=' Check order chef'
                  className='object-cover object-center md:object-top'
                />
              </div>
              <div className='relative h-20 md:h-28  w-full '>
                <Image
                  src={'/insta-3.jpg.webp'}
                  fill
                  alt=' Check order chef'
                  className='object-cover object-center md:object-top'
                />
              </div>
            </div>
            <div className='flex flex-row gap-1'>
              <div className='relative h-20 md:h-28 w-full '>
                <Image
                  src={'/insta-4.jpg.webp'}
                  fill
                  alt=' Check order chef'
                  className='object-cover object-top'
                />
              </div>
              <div className='relative h-20 md:h-28 w-full '>
                <Image
                  src={'/insta-5.jpg.webp'}
                  fill
                  alt=' Check order chef'
                  className='object-cover object-top'
                />
              </div>
              <div className='relative h-20 md:h-28 w-full '>
                <Image
                  src={'/insta-6.jpg.webp'}
                  fill
                  alt=' Check order chef'
                  className='object-cover object-top'
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className='mb-4 space-y-6'>
            <p className='font-bold text-xl '>Take Order</p>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing</p>
          </div>
          <div className='  '>
            {/* <form>
              <label
                for='default-search'
                class='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
              >
                Search
              </label>
              <div class='relative'>
                <input
                  type='search'
                  id='default-search'
                  class='block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Search Mockups, Logos...'
                  required
                />
                <button
                  type='submit'
                  class='text-white right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                  Search
                </button>
              </div>
            </form> */}
            <div class='form-group  space-y-2'>
              <input
                type='text'
                name='mail'
                placeholder='Enter email address'
                className=' w-full p-4 py-3 text-black text-center rounded-sm text-lg  bg-slate-200 focus:outline-none'
                required
              ></input>

              <input
                type='submit'
                value='Subscribe'
                class='px-8 py-3  text-center rounded-sm text-lg w-full bg-golden'
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
