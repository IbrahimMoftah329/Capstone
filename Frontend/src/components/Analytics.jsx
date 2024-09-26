import React from 'react';
import Laptop from '../pics/ai.png';

const Analytics = () => {
  return (
    <div className='w-full bg-[#124883] py-16 px-4'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
        <img className='w-[500px] mx-auto my-4' src={Laptop} alt='/' />
        <div className='flex flex-col justify-center'>
          <p className='text-[#D7DCDA] font-bold '>About Us</p>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Learn Faster With Cardmates</h1>
          <p>
          Our learning platform offers a customizable quizzing 
          experience that allows you to tailor your study sessions 
          to your specific learning style and goals. We leverage cutting-edge AI technology to 
          enhance your learning experience. Our AI algorithms automatically extract keywords from your flashcards
           and generate a variety of question types tailored to your specific needs. 
          </p>
          <button className='bg-black text-[#D7DCDA] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3'>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;