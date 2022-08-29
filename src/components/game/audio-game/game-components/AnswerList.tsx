/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { MutableRefObject, useState } from 'react'
import { IWord } from '../../../../types/models'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/redux'
import Answer from './Answer'
import styles from '../Audiogame.module.css'
import { audioGameSlice } from '../../../redux/reducers/audioGameSlice'

function AnswerList() {
  const data = useAppSelector((state) => state.sprintGameSlice.gameData)
  const dispatch = useAppDispatch()
  let counterWord = useAppSelector((state) => state.audioGameSlice.counterWord)

  if (counterWord > 19) {
    counterWord = 19
  }

  const currtWord = data[counterWord]
  dispatch(audioGameSlice.actions.setCurrentWord(currtWord))

  let customAnswers: IWord[] = []
  function randomIndx(arr: IWord[]) {
    const rand = Math.floor(Math.random() * arr.length)
    return rand
  }
  function randomiser(arr: IWord[]) {
    customAnswers = arr
    customAnswers = [...arr, currtWord]

    while (customAnswers.length < 5) {
      const rIndex = randomIndx(data)
      const word = customAnswers.find((el) => el.id === data[rIndex].id)
      if (!word) {
        customAnswers.push(data[rIndex])
      }
    }
    return customAnswers.sort(() => 0.5 - Math.random())
  }
  customAnswers = randomiser(customAnswers)

  return (
    <div className={styles.answers}>
      {customAnswers.map((item, indx) => (
        <Answer
          keyNumber={indx + 1}
          currtWord={customAnswers[indx]}
          key={item.id + new Date().getTime() + indx.toString()}
        />
      ))}
    </div>
  )
}

export default AnswerList
