import React from 'react';

const Select = ({ forId, labelText }) => {
  return (
    <div>
      <label for={forId} class='block mb-2 text-lg leading-loose font-semibold'>
        {labelText}
      </label>
      <select
        id={forId}
        class='px-4 py-2.5  border border-gray-300 text-gray-900 text-base  focus:border-black block w-full '
      >
        <option>Select</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
      </select>
    </div>
  );
};

export default Select;
