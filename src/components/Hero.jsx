const HeroCard = ({
  backgroundImage,
  heading,
  subheading,
  buttonText,
  onButtonClick,
}) => {
    const combinedBackground = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`;
  return (
    <div
      className='relative w-full h-[90vh] bg-cover bg-center flex items-center px-6 md:px-16 bg-blend-overlay'
      style={{ backgroundImage: combinedBackground }}
    >
      {/* Overlay */}

      {/* Content */}
      <div className='relative max-w-2xl text-white z-10'>
        <h1 className='text-4xl md:text-7xl font-bold mb-4 '>
          {heading}
        </h1>
        <p className='text-lg md:text-xl mb-6'>{subheading}</p>
        <button
          onClick={onButtonClick}
          className='bg-primary-500 hover:bg-primary-700 cursor-pointer text-white px-6 py-3 text-base font-medium transition'
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default HeroCard;
