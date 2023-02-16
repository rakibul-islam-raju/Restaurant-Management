const SectionHeader = ({
  upperText,
  lowerText,
  textPosition = 'text-center',
  left = 'left-0',
  right = 'right-0',
  pB = 'mb-12',
  fontWeight,
}) => {
  return (
    <div className={`${textPosition} relative ${pB} `}>
      <p
        className={`text-[100px] great-font absolute top-[-45px] ${left} ${right} z-[-1] `}
      >
        {upperText}
      </p>
      <h2 className={`   ${fontWeight} `}>{lowerText}</h2>
    </div>
  );
};

export default SectionHeader;
