import React from 'react'
// import { useAppSelector } from '../../../redux/hooks/redux'
import styles from '../Audiogame.module.css'
import AnswerList from './AnswerList'
import NextCardBtn from './NextCardBtn'

function AnswerControls() {
  //   const data = useAppSelector((state) => state.sprintGameSlice.gameData)

  return (
    <div className={styles.controls}>
      <AnswerList />
      <NextCardBtn />
    </div>
  )
}

export default AnswerControls
