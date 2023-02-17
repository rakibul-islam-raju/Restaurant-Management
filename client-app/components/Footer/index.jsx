import FooterImage from 'components/utils/FooterImage';
import Icons from 'components/utils/Icons';
import Image from 'next/image';
import React from 'react';

function Footer() {
  return (
    <footer class='bg-footer  '>
      <div class='grid grid-cols-1 gap-x-8 gap-y-10  md:grid-cols-4  text-white   container p-4 py-20  '>
        <div className='space-y-6  '>
          <h6 className='text-white'>Take Order</h6>

          <div className='space-y-4'>
            <small>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum,
              alias atque. Corrupti quo
            </small>
            <Icons bg={true} />
          </div>
        </div>

        <div className=' space-y-6'>
          <h6 className='text-white'>Open Hours</h6>

          <div className='space-y-3'>
            <div className='flex-center '>
              <small>Saturday</small>
              <small>9:00 - 24:00</small>
            </div>
            <div className='flex-center '>
              <small>Saturday</small>
              <small>9:00 - 24:00</small>
            </div>
            <div className='flex-center '>
              <small>Saturday</small>
              <small>9:00 - 24:00</small>
            </div>
            <div className='flex-center '>
              <small>Saturday</small>
              <small>9:00 - 24:00</small>
            </div>
            <div className='flex-center '>
              <small>Saturday</small>
              <small>9:00 - 24:00</small>
            </div>
            <div className='flex-center '>
              <small>Saturday</small>
              <small>9:00 - 24:00</small>
            </div>
            <div className='flex-center '>
              <small>Saturday</small>
              <small>9:00 - 24:00</small>
            </div>
          </div>
        </div>
        <div className=' space-y-6'>
          <h6 className='text-white'>Instagram</h6>
          <div className='space-y-1 '>
            <div className='flex flex-col md:flex-row gap-1  '>
              <FooterImage image={'/insta-1.jpg.webp'} />
              <FooterImage image={'/insta-2.jpg.webp'} />
              <FooterImage image={'/insta-3.jpg.webp'} />
            </div>
            <div className='flex flex-row gap-1'>
              <FooterImage image={'/insta-2.jpg.webp'} />
              <FooterImage image={'/insta-3.jpg.webp'} />
              <FooterImage image={'/insta-4.jpg.webp'} />
            </div>
          </div>
        </div>
        <div className=' space-y-6'>
          <h6 className='text-white'>Newsletter</h6>

          <div className='  '>
            <small>Lorem ipsum dolor, sit amet consectetur adipisicing</small>

            <div class='form-group pt-4 space-y-3'>
              <input
                type='text'
                name='mail'
                placeholder='Enter email address'
                className=' w-full p-4 py-3 text-black text-center rounded-sm text-base  bg-slate-200 focus:outline-none'
                required
              ></input>

              <input
                type='submit'
                value='Subscribe'
                class='px-8 py-3  text-center rounded-sm text-base w-full bg-golden'
              />
            </div>
          </div>
        </div>

        <small className='text-center col-span-1 md:col-span-4  md:pt-6 pb-6 md:pb-0 '>
          Copyright © All rights reserved by
          <span className='pt-1'>
            <i class='bx bxs-heart '> </i>{' '}
          </span>
          Take Order
        </small>
      </div>
    </footer>
  );
}

export default Footer;
