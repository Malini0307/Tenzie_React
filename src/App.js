
import './App.css';
import Dice from './component/Dice';
import {useState,useEffect,useRef} from 'react';
import {nanoid} from 'nanoid'
import Confetti from "react-confetti"

function App() {

  const [num,setNum] = useState(() => allNewDice())   //Set New dice
  const [rollCount,setRollCount] = useState(0)  //Roll counter
  const [time,setTime] = useState(0)  //TIme in seconds
  const [isActive,setIsActive] = useState(false)  //Timer state
  const timerRef = useRef(null)
  const buttonRef = useRef(null)

  
  const gameWon = num.every(die => die.isHeld) &&
        num.every(die => die.value === num[0].value)


//if the game mets the condition then the new game button automatically focused
  useEffect(() => {
    if(gameWon){
      buttonRef.current.focus()
      clearInterval(timerRef.current)   //To stop timer
    }
  },[gameWon])


  useEffect(() =>{
    if(isActive){
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1)
      },1000)
    }

    return () => clearInterval(timerRef.current)
  },[isActive])

  function allNewDice(){
    return new Array(10)
    .fill(0)
    .map(() => ({
          value: Math.ceil(Math.random() * 6), 
          isHeld: false,
          id:nanoid()
        }))
  }

  // To keep hold a dice state
  function toggleHold(id) {
    setNum((oldDice) =>
      oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  
  //To held the selected dice that have same id
  function rollDice(){
    if (!isActive) setIsActive(true); // Start the timer on the first roll
    const diceElements = document.querySelectorAll(".dice")
    if(!gameWon){
      //Add the "spinning" class to all dice
      diceElements.forEach((dice) => dice.classList.add('spinning'))

      //Remove the "spinning" class after animation ends
      setTimeout(() => {
        diceElements.forEach((dice)=> dice.classList.remove('spinning'))
      },1000)

      setRollCount(prevCount => prevCount + 1) //Increment roll count
      setNum((oldDice) =>
        oldDice.map((die) =>
          die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6),
          }
        ))
    }
    else{
      setNum(allNewDice())
      setRollCount(0)
      setTime(0)
      setIsActive(false)
    }
  }


  let diceElements = num.map(dieObj => 
    <Dice 
        key={dieObj.id} 
        value={dieObj.value} 
        isHeld={dieObj.isHeld}
        toggleHold={() => toggleHold(dieObj.id)}
    />
  ) 

  return (
    <main>
      {gameWon && <Confetti width={window.innerWidth} height={window.innerHeight}/>}

      <div aria-live='polite' className='sr-only'>
        {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>

      <h1 className='title'>Tenzies</h1>
      <p className='instructions'>
        Roll until all dice are the same. Click each die to freeze
        it at its current value between rolls.
      </p>

      <div className='num-container'>
          {diceElements}
      </div>

      <button ref={buttonRef} onClick={rollDice} className='roll-btn'>{gameWon ? "New Game" : "Roll"}</button>

      <div className="stats">
        <p className='timer'>Time: {time}s</p> {/* Display the timer */}
        <p className='counter'>Rolls: {rollCount}</p> {/* Display the roll counter */}
      </div>

    </main>
  );
}

export default App;
