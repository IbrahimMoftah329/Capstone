import React from 'react';
import spade from '../pics/spade.jpg'

const Cards = () => {
  return (
    <div className='w-full py-[10rem] px-4 bg-white'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
          <div className='w-full shadow-xl flex flex-col p-2 my-4 rounded-lg hover:scale-105 duration-300'>
              <img className='w-20 mx-auto mt-[-3rem] bg-white' src={spade} alt="/" />
              <h2 className='text-2xl font-bold text-center py-8'>AI Learning Tool</h2>
\              <div className='text-center font-medium'>
                  <p className='py-2 border-b mx-8 mt-8'>Chat Gpt 4.0</p>
                  <p className='py-2 border-b mx-8'>Increased Efficiency</p>
                  <p className='py-2 border-b mx-8'>Enhanced Experience</p>
              </div>
              <button className='bg-[#D7DCDA] text-[#124883] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'>Login</button>
          </div>
          <div className='w-full shadow-xl bg-gray-100 flex flex-col p-4 md:my-0 my-8 rounded-lg hover:scale-105 duration-300'>
              <img className='w-20 mx-auto mt-[-3rem] bg-transparent' src={spade} alt="/" />
              <h2 className='text-2xl font-bold text-center py-8'>Organization and Structure</h2>
              <div className='text-center font-medium'>
                  <p className='py-2 border-b mx-8 mt-8'>Optional Subgroups</p>
                  <p className='py-2 border-b mx-8'>Symbol Coded</p>
                  <p className='py-2 border-b mx-8'>Easy to Navigate</p>
              </div>
              <button className='bg-[#124883] text-[#ffffff] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'>Sign Up</button>
          </div>
          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
              <img className='w-20 mx-auto mt-[-3rem] bg-white' src={spade} alt="/" />
              <h2 className='text-2xl font-bold text-center py-8'>Resource Sharing</h2>
              <div className='text-center font-medium'>
                  <p className='py-2 border-b mx-8 mt-8'>Access Your School's Courses</p>
                  <p className='py-2 border-b mx-8'>Public/Private Publishing</p>
                  <p className='py-2 border-b mx-8'>Plethora of Quizzes and Resources</p>
              </div>
              <button className='bg-[#D7DCDA] text-[#124883] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'>Search</button>
          </div>
      </div>
    </div>
  );
};

export default Cards;