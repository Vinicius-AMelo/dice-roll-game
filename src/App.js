import { useState, useEffect } from 'react'
import Confetti from "react-confetti"
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
      alert('Parabéns, você venceu')
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
      {tenzie && <Confetti />}
      <div className="main--dice">
        <div className="tenzie">
          <h1>Tenzies</h1>
          <p>Role os dados até que todos fiquem iguais. Clique em cada dado para congelá-lo no número atual.</p>
          {dices}
          {tenzie ? <button onClick={reset}>Reset Game !</button> : <button onClick={rollDices}>Roll!</button>
          }
        </div>
      </div>
    </div>
  );
}


