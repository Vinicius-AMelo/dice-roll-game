import { useState, useEffect } from 'react'
import Dice from './components/dice'

export default function App() {

  const [dice, setDice] = useState(allNewDices)
  const [tenzie, setTenzie] = useState(false)

  function allNewDices() {
    const diceArr = []
    for (let i = 0; i < 10; i++) {
      const newDice = {
        id: i,
        value: Math.ceil(Math.random() * 6),
        held: false
      }
      diceArr.push(newDice)
    }
    return diceArr
  }

  const dices = dice.map(dice => {
    return <Dice
      key={dice.id}
      hold={() => holdDice(dice.id)}
      {...dice}
    />

  })

  function holdDice(id) {
    setDice(oldDice => oldDice.map(diceMap => {
      return id === diceMap.id ?
        { ...diceMap, held: !diceMap.held } : diceMap


    }))
  }

  function rollDices() {
    setDice(oldDice => oldDice.map(diceMap => {
      return !diceMap.held ? {...diceMap, value: Math.ceil(Math.random() * 6)} : diceMap
    }))
  }



  function reset(){
    setDice(allNewDices)
    setTenzie(false)
  }

  useEffect(() => {
    if(tenzie){
      alert('AMASSOU, AMAR E ASSOU')
    }
  }, [tenzie])

// END GAME

useEffect(() => {
  const firstValue = dice[0].value
  const allHeld = dice.every(diceEvry => diceEvry.held)
  const allSameNbmr = dice.every(diceEvry => diceEvry.value === firstValue)
if(allHeld && allSameNbmr){
  setTenzie(true)
}

}, [dice])


// END GAME
  return (
    <div className="main--app">
      <div className="main--dice">
        <div className="tenzie">
          <h1>Tenzies</h1>
          <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          {dices}
          {!tenzie ? <button onClick={rollDices}>Roll!</button> :<button onClick={reset}>Reset Game !</button>}
        </div>
      </div>
    </div>
  );
}


