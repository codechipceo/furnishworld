import React from "react";

const PolicyCard = ({ icon, title, subtitle }) => {
  return (
    <div className='flex flex-col items-center  text-center'>
      <div className='text-2xl mb-2'>{icon}</div>
      <div className='text-sm font-semibold text-gray-600'>{title}</div>
      <div className='text-sm text-gray-500'>{subtitle}</div>
    </div>
  );
};

export default PolicyCard;
