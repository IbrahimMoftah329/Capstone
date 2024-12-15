import React, { useRef, useState, useEffect } from 'react';
import './Carousel.css';
import next from '../../assets/arrow.jpg';
import back from '../../assets/arrow2.jpg';
import ReactCardFlip from 'react-card-flip';

const Carousel = () => {
    const [clickCount, setClickCount] = useState(0);
    const slider = useRef();
    const txRef = useRef(0);
    const [isFlipped, setIsFlipped] = useState(Array(6).fill(false));
    const [selectedSlide, setSelectedSlide] = useState(null);
    const maxClicks = 1;
    const slideDistance = 50;

    // Add card suits state
    const suits = ['♠', '♥', '♦', '♣'];
    const [cardSuits, setCardSuits] = useState([]);

    // Generate random suits on component mount
    useEffect(() => {
        const randomSuits = Array(6).fill(null).map(() => 
            suits[Math.floor(Math.random() * suits.length)]
        );
        setCardSuits(randomSuits);
    }, []);

    const slideDescriptions = [
        "Cardmates offers personalized learning pathways to help students reach their full potential.",
        "Cardmates provides engaging and interactive learning experiences tailored to individual needs.",
        "Cardmates offers a user-friendly platform for organizing and managing personalized learning experiences.",
        "CardMate enables game features like the Shuffle feature to help users remember terms",
        "CardMate provides personalized organization with user libraries",
        "Cardmates integrates AI to deliver personalized learning experiences, adapting to individual needs and optimizing learning outcomes.",
        "Cardmates empowers students to connect with like-minded peers by providing a platform to easily find and connect with students taking similar classes or studying under the same professors. Cardmates facilitates meaningful connections, fostering collaboration, study groups, and friendships among students who share common academic interests.",
        "Our platform makes it easy for learners to navigate and find specific topics. Cardmates offers a user-friendly interface that is easy to navigate, even for learners with limited technical skills. Our tools can streamline the process of creating, administering, and analyzing quizzes, saving users valuable time and effort.",
"CardMate Shuffle transforms studying into an engaging memory game! Match questions with answers while enjoying beautiful card designs with suit symbols. Track your best times on the podium leaderboard and challenge yourself to earn gold, silver, and bronze medals for each deck. Perfect for mastering content while having fun!", // Back card description
        "Create your own digital library organized by subjects and decks, perfect for any field of study! Easily manage your content with a clean and intuitive design, allowing you to sort, edit, and build your flashcard collection. With personalized user profiles, your study materials are always secure and accessible when you need them.", // Back card description,
        "Cardmates leverages AI to automate quiz creation, generating relevant questions based on the learning material. This saves time for educators and ensures that quizzes are aligned with the curriculum."
    ];

    const slideForwards = () => {
        if (clickCount < maxClicks) {
            txRef.current -= slideDistance;
            setClickCount(prev => prev + 1);
            slider.current.style.transform = `translateX(${txRef.current}%)`;
        }
    };
  
    const slideBackwards = () => {
        if (clickCount > 0) {
            txRef.current += slideDistance;
            setClickCount(prev => prev - 1);
            slider.current.style.transform = `translateX(${txRef.current}%)`;
        }
    };

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
            <img 
                src={back} 
                alt='Previous' 
                className='back-button' 
                onClick={slideBackwards} 
                style={{
                    opacity: isAtStart ? 0.5 : 1,
                    cursor: isAtStart ? 'not-allowed' : 'pointer'
                }}
            />
            <img 
                src={next} 
                alt='Next' 
                className='next-button' 
                onClick={slideForwards} 
                style={{
                    opacity: isAtEnd ? 0.5 : 1,
                    cursor: isAtEnd ? 'not-allowed' : 'pointer'
                }}
            />
            <div className='slider'>
                <ul ref={slider}>
                    {['Personalized Learning', 'Engaging Learning Experience', 'Organization and Ease of Use', 'Filler Title Card 4', 'Filler Title Card 5', 'AI Integrated Learning'].map((slideTitle, index) => (
                        <li key={index}>

              <ReactCardFlip isFlipped={isFlipped[index]} flipDirection="horizontal">
                  {/* Front side content */}
                  <div 
                      className={`slide ${(cardSuits[index] === '♥' || cardSuits[index] === '♦') ? 'red-suit' : ''}`} 
                      onClick={() => handleFlip(index)}
                  >
                      {/* Top left corner */}
                      <div className="card-corners">
                          <span className="rank">{index + 1}</span>
                          <span className="suit">{cardSuits[index]}</span>
                      </div>

                      {/* Main content */}
                      <div className="card-content">
                          <div className='info'>
                              <h3>{slideTitle}</h3>
                          </div>
                          <p>{slideDescriptions[index]}</p>
                          <div className='more'>
                              <p>Click for more!</p>
                          </div>
                      </div>

                      {/* Bottom corners */}
                      <div className="card-corners-bottom-right">
                          <span className="rank">{index + 1}</span>
                          <span className="suit">{cardSuits[index]}</span>
                      </div>
                  </div>

                  {/* Back side content */}
                  <div 
                      className={`slide-back ${(cardSuits[index] === '♥' || cardSuits[index] === '♦') ? 'red-suit' : ''}`}
                      onClick={() => handleFlip(index)}
                  >
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