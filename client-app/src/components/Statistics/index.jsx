import React from 'react';

function Statistics() {
  return (
    <section className=' wrapper '>
      <div className='grid grid-cols-6 md:gap-x-12 gap-y-4'>
        <div className='flex col-span-6 md:col-span-4 items-center md:items-start justify-between flex-col md:flex-row  md:text-left text-center'>
          <div>
            <strong className='stats-strong'>18</strong>
            <p>YEAR</p>
          </div>
          <div>
            <strong className='stats-strong'>18</strong>
            <p>DISH</p>
          </div>
          <div>
            <strong className='stats-strong'>18</strong>
            <p>STAFS</p>
          </div>
          <div>
            <strong className='stats-strong'>18</strong>
            <p> HAPPY CUSTOMERS</p>
          </div>
        </div>
        <div className='col-span-6 md:col-span-2 text-justify'>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            placeat ab consequatur soluta rem repudiandae sunt nulla quam
          </p>
        </div>
      </div>
      ;
    </section>
  );
}

export default Statistics;
