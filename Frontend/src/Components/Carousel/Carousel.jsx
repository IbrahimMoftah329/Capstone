import React, { useRef, useState } from 'react';
import './Carousel.css'; // Import your CSS file
import next from '../../assets/arrow.jpg';
import back from '../../assets/arrow2.jpg';
import ReactCardFlip from 'react-card-flip';

const Carousel = () => {
    const [clickCount, setClickCount] = useState(0); // Track number of clicks
    const slider = useRef();
    const txRef = useRef(0);
    const [isFlipped, setIsFlipped] = useState(Array(3).fill(false));
    const [selectedSlide, setSelectedSlide] = useState(null);
    const maxClicks = 1; // Maximum number of allowed clicks
    const slideDistance = 50; // Distance to slide each click

  const slideDescriptions = [
    "Cardmates offers personalized learning pathways to help students reach their full potential.", //front description card 1
    "Cardmates provides engaging and interactive learning experiences tailored to individual needs.", // Custom front description for slide 2
    "Cardmates offers a user-friendly platform for organizing and managing personalized learning experiences.", // Custom front description for slide 3
    "filler front card 4", //front description card 4
   "filler front card 5", //front description for card 5
    " Cardmates integrates AI to deliver personalized learning experiences, adapting to individual needs and optimizing learning outcomes.", // front description card 6
    "Cardmates empowers students to connect with like-minded peers by providing a platform to easily find and connect with students taking similar classes or studying under the same professors. Cardmates facilitates meaningful connections, fostering collaboration, study groups, and friendships among students who share common academic interests.", // Custom back description for slide 2
    "Our platform makes it easy for learners to navigate and find specific topics. Cardmates offers a user-friendly interface that is easy to navigate, even for learners with limited technical skills. Our tools can streamline the process of creating, administering, and analyzing quizzes, saving users valuable time and effort.", // Custom back description for slide 3
    "filler back description card 4",//Custom back description for slide 4
    "Filler back description for card 5 ", //back descripton for card 5
    "Cardmates leverages AI to automate quiz creation, generating relevant questions based on the learning material. This saves time for educators and ensures that quizzes are aligned with the curriculum." //back description card 6
  ];

  const slideForwards = () => {
    // Only allow sliding if we haven't reached max clicks
    if (clickCount < maxClicks) {
      txRef.current -= slideDistance;
      setClickCount(prev => prev + 1);
      slider.current.style.transform = `translateX(${txRef.current}%)`;
    }
  };
  
  const slideBackwards = () => {
    // Only allow sliding backwards if we've moved forward
    if (clickCount > 0) {
      txRef.current += slideDistance;
      setClickCount(prev => prev - 1);
      slider.current.style.transform = `translateX(${txRef.current}%)`;
    }
  };

   // Calculate if buttons should be disabled
   const isAtStart = clickCount === 0;
   const isAtEnd = clickCount === maxClicks;

    const handleFlip = (index) => {
    setIsFlipped((prevFlipped) => {
      const newFlippedState = [...prevFlipped];
      newFlippedState[index] = !newFlippedState[index];
      setSelectedSlide(index);
      return newFlippedState;
    });
  };


  return (
    <div className='carousel'>
      <img src={back} alt='Previous' className='back-button' onClick={slideBackwards} style={{opacity: isAtStart ? 0.5 : 1,
        cursor: isAtStart ? 'not-allowed' : 'pointer'
        }}  /> 
      <img src={next} alt='Next' className='next-button' onClick={slideForwards} style={{opacity: isAtEnd ? 0.5 : 1,
        cursor: isAtEnd ? 'not-allowed' : 'pointer'
        }}  /> 
        <div className='slider'>
        <ul ref={slider}>
          {/* Slide elements */}
          {['Personalized Learning', 'Engaging Learning Experience', 'Organization and Ease of Use', 'Filler Title Card 4', 'Filler Title Card 5', 'AI Integrated Learning'].map((slideTitle, index) => (
        <li key={index}>
            <ReactCardFlip isFlipped={isFlipped[index]} flipDirection="horizontal">
            {/* Front side content */}
            <div className='slide' onClick={() => handleFlip(index)}>
            <div className='info'>
                <h3>{slideTitle}</h3>
                <hr></hr>
                <br></br>
                <br></br>
            </div>
            {/* Short description or summary */}
            <p>{slideDescriptions[index]}</p>  
            <div className='more'>
            <br></br>
            <p>Click for more!</p>
            </div>
        </div>
        {/* Back side content */}
        <div className='slide-back' onClick={() => handleFlip(index)}>
            {/* Detailed information, images, or additional content */}
            <p>{slideDescriptions[index + 6-1]}</p>
        </div>
        </ReactCardFlip>
     </li>
        ))}
        </ul>
      </div>
    </div>
  );
};
export default Carousel;