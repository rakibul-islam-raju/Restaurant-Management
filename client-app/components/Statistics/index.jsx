import React from 'react';

function Statistics() {
  return (
    <section className='md:px-24 m-4 py-10'>
      <div className='grid grid-cols-6 md:gap-x-8 gap-y-4'>
        <div className='flex col-span-6 md:col-span-4 items-center md:items-start justify-between flex-col md:flex-row text-center md:text-left'>
          <div>
            <p className='text-3xl font-bold'>18</p>
            <p>YEAR</p>
          </div>
          <div>
            <p className='text-3xl font-bold'>10</p>
            <p>DISH</p>
          </div>
          <div>
            <p className='text-3xl font-bold'>50</p>
            <p>STAFS</p>
          </div>
          <div>
            <p className='text-3xl font-bold'>50</p>
            <p> HAPPY CUSTOMERS</p>
          </div>
        </div>
        <div className='col-span-6 md:col-span-2 text-justify'>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            placeat ab consequatur soluta rem repudiandae sunt nulla quam
            accusantium similique vitae perferendis nisi earum temporibus, harum
            corporis eius nobis blanditiis, accusamus voluptatibus unde ullam
            aut.
          </p>
        </div>
      </div>
      ;
    </section>
  );
}

export default Statistics;
