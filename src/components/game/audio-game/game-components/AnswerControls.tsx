import React from 'react'
import styles from '../Audiogame.module.css'
import AnswerList from './AnswerList'
import NextCardBtn from './NextCardBtn'

function AnswerControls() {
  return (
    <div className={`${styles.controls}`}>
      <AnswerList />
      <NextCardBtn />
    </div>
  )
}

export default AnswerControls
