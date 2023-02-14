const SectionHeader = ({ upperText, lowerText }) => {
  return (
    <div className='text-center mb-7 md:mb-16 '>
      <h1 className='text-golden '>{upperText}</h1>
      <h2 className=''>{lowerText}</h2>
    </div>
  );
};

export default SectionHeader;
