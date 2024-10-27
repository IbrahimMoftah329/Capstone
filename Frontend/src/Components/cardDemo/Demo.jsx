import React, { useState } from 'react'
import ReactCardFlip from 'react-card-flip'
import './Demo.css'

const Demo = () => {
  const [isFlipped,setIsFlipped] = useState(false);
  function flipCard(){
    setIsFlipped(!isFlipped)
  }
  return (
    <div>
      <ReactCardFlip flipDirection='horizontal' isFlipped={isFlipped}>
        <div className='front' onClick={flipCard}>
          <h1>Front</h1>
        </div>
        <div className='front back' onClick={flipCard}>
        <h1>Back</h1>
        </div>
      </ReactCardFlip>
    </div>
  )
}

export default Demo