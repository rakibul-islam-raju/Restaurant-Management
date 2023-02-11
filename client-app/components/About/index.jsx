import React from 'react';

function About() {
  return (
    <section className='md:p-24 m-4'>
      <div className='grid grid-cols-5 md:gap-4 space-y-8'>
        <div className='col-span-5 md:col-span-3 '>
          <div className='flex items-center justify-center space-x-4  '>
            <div
              className=' bg-center bg-cover bg-no-repeat  md:mt-[-50px]  h-96 w-full '
              style={{ backgroundImage: `url(${'/about-1.jpg.webp'})` }}
            ></div>
            <div
              className='bg-center  bg-cover h-96 w-full'
              style={{ backgroundImage: `url(${'/about-1.jpg.webp'})` }}
            ></div>
          </div>
        </div>
        <div className=' col-span-5 md:col-span-2 text-justify space-y-4 '>
          <p className='text-3xl font-bold space-y-5'>Feliciano Restaurant</p>
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
