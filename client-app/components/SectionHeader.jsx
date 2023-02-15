const SectionHeader = ({ upperText, lowerText }) => {
  return (
    <div className='text-center relative mb-12'>
      <p className='text-[100px] great-font '>{upperText}</p>
      <h2 className='absolute top-[45px] left-[19%] right-[19%] '>
        {lowerText}
      </h2>
    </div>
  );
};

export default SectionHeader;
