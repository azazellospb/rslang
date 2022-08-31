import React from 'react'
// import { useAppDispatch } from '../../../redux/hooks/redux'
// import { gameSlice } from '../../../redux/reducers/gameSlice'

function ProposeGame() {
  // const dispatch = useAppDispatch()

  function handleProposeGame() {
    // dispatch(gameSlice.actions.fetchGameOver(false))
    console.log('propose game')
  }
  return (
    <div>
      <h3>На предыдущих страницах все слова выучены!</h3>
      <h3>Желаете сыграть в игру с другими словами из этого раздела?</h3>
      <button type="button" onClick={handleProposeGame}>
        Играть
      </button>
    </div>
  )
}

export default ProposeGame
