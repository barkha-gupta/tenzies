import { useEffect, useState } from 'react';
import './App.css';
import Dice from './dice';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

function App() {
  const [num, setNum] = useState(allDice());
  //now num is an array => mappping over array
  const [won , setWon] = useState(false)
  useEffect(() => {

    const allHeld = num.every(die => die.isHold);
    const allNum = num.every(die => die.randomNum === num[0].randomNum)
    if (allHeld && allNum) {
      setWon(true)
      console.log("You won!!")
    }
  }, [num])

  function allDice()
  {
    let arr=[];
    for(let i=0;i<10;i++)
    {
      arr.push({
        randomNum: Math.ceil(Math.random() * 6),
        isHold: false,
        id: nanoid()
    }) ;
    }
    return arr;
  }

  function rollDice()
  {
    setNum(old => old.map( die => {
      return die.isHold ?
        die :
        {
          randomNum: Math.ceil(Math.random() * 6),
          isHold: false,
          id: nanoid()
        }
        
    }))
  }

  function onHold(id) {
    // console.log(id)
    setNum(old => old.map(die => {
      return die.id === id ?
      { ...die, isHold : !die.isHold} :
      die
    }))
}

function newGame()
{
  setWon(false);
  setNum(allDice())
}

  return (
    <div className="App">
      {won && <div className='confetti'><Confetti /></div>}
      <main>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='dice-container'>
          {num.map((num) => <Dice key={num.id} num={num.randomNum} hold={num.isHold} onHold={()=> onHold(num.id)} />)}
        </div>
        <div className='btn'>
          {won ? <button className='roll-btn' onClick={newGame}>New Game</button> :
          <button className='roll-btn' onClick={rollDice}>ROLL</button>}
      </div>
      {}
      </main>
    </div>
  );
}

export default App;
