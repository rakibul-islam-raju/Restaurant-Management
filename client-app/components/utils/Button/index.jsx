import React from 'react';

function Buttton({ width }) {
  return (
    <button
      type='button'
      className={`py-3 px-3 ${width}  text-white bg-golden rounded-sm hover:text-golden hover:bg-white outline hover:outline-1 hover:duration-300`}
    >
      Order Now
    </button>
  );
}

export default Buttton;
