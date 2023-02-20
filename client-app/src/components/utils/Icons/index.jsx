import Link from 'next/link';
import React from 'react';

function Icons({ bg, color }) {
  return (
    <div className='text-2xl space-x-2  '>
      <Link className='' href=''>
        <i
          class={`bx bxl-twitter  ${
            (bg && 'icon-bg') || (color && 'text-golden')
          }`}
        ></i>
      </Link>
      <Link href=''>
        <i
          class={`bx bxl-facebook  ${
            (bg && 'icon-bg') || (color && 'text-golden')
          }`}
        ></i>
      </Link>
      <Link href=''>
        <i
          class={`bx bxl-whatsapp  ${
            (bg && 'icon-bg') || (color && 'text-golden')
          }`}
        ></i>
      </Link>
      <Link href=''>
        <i
          class={`bx bxl-youtube  ${
            (bg && 'icon-bg') || (color && 'text-golden')
          }`}
        ></i>
      </Link>
    </div>
  );
}

export default Icons;
