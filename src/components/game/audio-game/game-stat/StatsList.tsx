import React from 'react'
import { useAppSelector } from '../../../redux/hooks/redux'
import StatsCard from './StatsCard'

function StatsList() {
  const { learnedWords } = useAppSelector((state) => state.audioGameSlice)
  // console.log(learnedWords)
  return (
    <div>
      {learnedWords.map((el, i) => (
        <StatsCard id={i} key={el.id! + Date.now() + Math.random() + el.word} />
      ))}
    </div>
  )
}

export default StatsList
