import React from 'react';

function Input({ forId, labelText, type, placeholder }) {
  return (
    <div className='pb-6'>
      <label
        for='base-input'
        class='block mb-2 text-lg leading-loose font-semibold'
      >
        {labelText}
      </label>
      <input
        type={`${type}`}
        id={`${forId}`}
        placeholder={`${placeholder}`}
        class='px-4 py-2.5  border border-gray-300 text-gray-900 text-base  focus:border-black block w-full     '
      ></input>
    </div>
  );
}

export default Input;
