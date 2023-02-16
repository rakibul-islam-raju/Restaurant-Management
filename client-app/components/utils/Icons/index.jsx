import React from 'react';

function Icons({ bg, color }) {
  return (
    <div className='text-2xl space-x-2  '>
      <a className='' href=''>
        <i
          class={`bx bxl-twitter  ${
            (bg && 'icon-bg') || (color && 'text-golden')
          }`}
        ></i>
      </a>
      <a href=''>
        <i
          class={`bx bxl-facebook  ${
            (bg && 'icon-bg') || (color && 'text-golden')
          }`}
        ></i>
      </a>
      <a href=''>
        <i
          class={`bx bxl-whatsapp  ${
            (bg && 'icon-bg') || (color && 'text-golden')
          }`}
        ></i>
      </a>
      <a href=''>
        <i
          class={`bx bxl-youtube  ${
            (bg && 'icon-bg') || (color && 'text-golden')
          }`}
        ></i>
      </a>
    </div>
  );
}

export default Icons;
