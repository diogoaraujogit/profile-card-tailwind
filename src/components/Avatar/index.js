import React from 'react';

const Avatar = ({pic}) => {

  return (
    <div className='flex max-w-max mb-4 relative justify-center items-center text-white'>
      <img className='rounded-3xl w-28 h-28' alt='A' src={pic} />
      <div className='bg-white rounded-2xl w-10 h-10 absolute flex justify-center items-center -bottom-3 -right-3'>
        <div className='bg-red-500 rounded-xl w-8 h-8 flex justify-center items-center'>
          <svg className='h-4 w-4' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Avatar;