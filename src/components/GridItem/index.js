import React from 'react';

const GridItem = ({ title, body, className }) => {
  return (
    <div className={`mb-4 ${className}`}>
      <h3 className='text-gray-400 font-semibold'>{title}</h3>
      <div className='font-bold text-lg'>{body}</div>
    </div>
  );
}

export default GridItem;