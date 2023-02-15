import Image from 'next/image';
import React from 'react';

function About() {
  return (
    <section className='md:p-24 m-4 relative '>
      <div className='grid grid-cols-5 md:gap-4 space-y-8'>
        <div className='col-span-5 md:col-span-3 '>
          <div className='flex items-center justify-center space-x-4  '>
            {/* <div
              className=' bg-center bg-cover bg-no-repeat  md:mt-[-50px]  h-96 w-full '
              style={{ backgroundImage: `url(${'/about.jpg.webp'})` }}
            ></div> */}
            <div className=' relative  h-72 md:h-[450px]  md:mt-[-50px] w-full '>
              <Image
                src={'/about.jpg.webp'}
                fill
                alt=' Mr. Alex ,Main chef'
                className='object-cover object-top'
              />
            </div>

            <div className=' relative  h-72 md:h-[450px]   w-full '>
              <Image
                src={'/about-1.jpg.webp'}
                fill
                alt=' Mr. Alex ,Helper chef'
                className='object-cover object-top'
              />
            </div>
          </div>
        </div>
        <div className=' col-span-5 md:col-span-2 text-justify space-y-4 '>
          <h2 className='text-[40px] md:text-[50px] font-semibold'>
            TAKE-ORDER RESTAURANT
          </h2>
          <p className=' space-y-5'>Feliciano Restaurant</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
            asperiores sequi quas similique nisi maxime magni obcaecati maiores
            iste.
          </p>
          <p className='text-3xl font-bold'>+01842403974</p>
        </div>
      </div>
    </section>
  );
}

export default About;
