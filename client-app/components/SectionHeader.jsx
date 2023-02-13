const SectionHeader = ({ upperText, lowerText }) => {
  return (
    <div className='text-center mb-7 md:mb-16 '>
      <h1 className='text-golden text-2xl sm:text-5xl italic'>{upperText}</h1>
      <h1 className='text-2xl sm:text-5xl text-slate-900 font-semibold'>
        {lowerText}
      </h1>
    </div>
  );
};

export default SectionHeader;
