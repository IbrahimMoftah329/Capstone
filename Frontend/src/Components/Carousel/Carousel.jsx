import React, { useRef, useState } from 'react';
import './Carousel.css'; // Import your CSS file
import next from '../../assets/arrow.jpg';
import back from '../../assets/arrow2.jpg';
import ReactCardFlip from 'react-card-flip';

const Carousel = () => {
  let tx = 0;
  const slider = useRef();
  const [isFlipped, setIsFlipped] = useState(Array(3).fill(false)); // Initialize all slides unflipped
  const [selectedSlide, setSelectedSlide] = useState(null); 

  const slideDescriptions = [
    "Cardmates offers personalized learning pathways to help students reach their full potential.",
    "Cardmates provides engaging and interactive learning experiences tailored to individual needs.", // Custom front description for slide 2
    "Cardmates offers a user-friendly platform for organizing and managing personalized learning experiences.", // Custom front description for slide 3
    "Cardmates leverages the power of AI to create highly personalized quizzes that challenge learners, ensuring they are neither bored nor overwhelmed. By tailoring quizzes to each individual's needs, Cardmates optimizes the learning experience and maximizes knowledge retention, ultimately empowering learners to achieve their full potential.", // Back description for slide 1
    "Cardmates empowers students to connect with like-minded peers by providing a platform to easily find and connect with students taking similar classes or studying under the same professors. Cardmates facilitates meaningful connections, fostering collaboration, study groups, and friendships among students who share common academic interests.", // Custom back description for slide 2
    "Our platform makes it easy for learners to navigate and find specific topics. Cardmates offers a user-friendly interface that is easy to navigate, even for learners with limited technical skills. Our tools can streamline the process of creating, administering, and analyzing quizzes, saving users valuable time and effort." // Custom back description for slide 3
  ];

const slideForwards = () => {
    if (tx > -100) {
      tx -= 25; // Adjust the movement amount if needed
    }
    slider.current.style.transform = `translateX(${tx}%)`;
    };

  const slideBackwards = () => {
    if (tx < 0) {
      tx += 25;
    }
    slider.current.style.transform = `translateX(${tx}%)`;
  };

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
      <img src={back} alt='Previous' className='back-button' onClick={slideBackwards} /> {/* Added alt text */}
      <img src={next} alt='Next' className='next-button' onClick={slideForwards} /> {/* Added alt text */}
      <div className='slider'>
        <ul ref={slider}>
          {/* Slide elements */}
          {['Personalized Learning', 'Engaging Learning Experience', 'Organization and Ease of Use'].map((slideTitle, index) => (
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
        <p>{slideDescriptions[index]}</p>  {/* Always show the description */}
        <br></br>
        <br></br>
      </div>
      {/* Back side content */}
      <div className='slide-back' onClick={() => handleFlip(index)}>
        {/* Detailed information, images, or additional content */}
        <p>{slideDescriptions[index + 3]}</p>
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