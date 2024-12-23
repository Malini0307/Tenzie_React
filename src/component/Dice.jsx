import React from 'react'
import './Dice.css'

const Dice = (props) => {
  const dotPositions = {
    1: ['center'],
    2: ['top-left', 'bottom-right'],
    3: ['top-left', 'center', 'bottom-right'],
    4: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
    5: ['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'],
    6: ['top-left', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-right'],
  };
  
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" :"white"
  }
  return (
    <main>
        <button 
            className='dice'
            style={styles} 
            onClick={props.toggleHold}
            aria-pressed={props.isHeld}
            aria-label={`Dice with value ${props.value}, ${props.isHeld ? "held" : "not held"}`}
        >
           {dotPositions[props.value].map((pos, index) => (
        <div key={index} className={`dot ${pos}`}></div>
      ))}
        </button>

    </main>
  )
}

export default Dice