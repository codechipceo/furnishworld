import React from "react";

const SectionHeading = ({ title, subtitle }) => {
  return (
    <div className='text-center my-12'>
      <h2 className='text-2xl sm:text-4xl font-semibold text-gray-800 relative inline-block pb-2'>
        {title}
        <span className='block h-1 w-16 bg-primary-500 mx-auto mt-2 rounded'></span>
      </h2>
      {subtitle && (
        <p className='text-gray-500 mt-2 text-sm sm:text-base max-w-xl mx-auto'>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
