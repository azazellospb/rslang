import React from 'react'
import Audiogame from './Audiogame'
import AnswerControls from './game-components/AnswerControls'
import { useAppSelector } from '../../redux/hooks/redux'
import AudiogameStat from './game-stat/AudiogameStat'
// import { audioGameSlice } from '../../redux/reducers/audioGameSlice'
// import AudiogameStat from './AudiogameStat'

function AudiogameMain() {
  // const dispatch = useAppDispatch()
  const { gameOver } = useAppSelector((state) => state.gameSlice)
  // const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
  return (
    // <>
    //   <Audiogame />
    //   <AnswerControls />
    // </>
    <div>
      {gameOver ? (
        <AudiogameStat />
      ) : (
        <>
          <Audiogame />
          <AnswerControls />
        </>
      )}
    </div>
    // <>
    //   {Boolean(gameOwer) && <AudiogameStat />}
    //   {Boolean(!gameOwer) && <Audiogame />}
    //   {Boolean(!gameOwer) && <AnswerControls />}
    // </>
  )
}

export default AudiogameMain
