import Image from 'next/image';
import React from 'react';

function ServiceCard() {
  return (
    <div className='space-y-4 text-center '>
      <div className=' relative   '>
        <Image
          src={'/birthday.png'}
          height={50}
          width={50}
          alt=' Check order chef '
          className='mx-auto'
        />
      </div>
      <div className='m-auto'>
        <h4 className='mb-5'>Birth Day</h4>
        <p>
          Even the all-powerful Pointing has no control about the blind texts it
          is an almost unorthographic.
        </p>
      </div>
    </div>
  );
}

export default ServiceCard;
