import Icons from 'components/utils/Icons';
import Image from 'next/image';
import React from 'react';

function ChefCard() {
  return (
    <div>
      <div className=' relative  h-72 md:h-96  '>
        <Image
          src={'/chef-4.jpg.webp'}
          fill
          alt=' Check order chef'
          className='object-cover object-top rounded-lg '
        />
      </div>
      <div className='text-left text-lg pt-5 pb-3 flex  justify-between md:flex-col  space-y-3 '>
        <div>
          <h5>Noman Reign</h5>
          <p className='text-sm'>Noman Reign Lorem .</p>
        </div>
        <div className='self-end md:self-auto'>
          <Icons color={true} />
        </div>
      </div>
    </div>
  );
}

export default ChefCard;
