import Image from 'next/image';
import React from 'react';

function FooterImage({ image }) {
  return (
    <div className='relative h-20 md:h-24 w-full '>
      <Image
        src={`${image}`}
        fill
        alt=' Check order chef'
        className='object-cover object-center md:object-top'
      />
    </div>
  );
}

export default FooterImage;
