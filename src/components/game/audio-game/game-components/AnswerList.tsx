/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import React, { MutableRefObject, useState } from 'react'
import { IWord } from '../../../../types/models'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/redux'
import Answer from './Answer'
import styles from '../Audiogame.module.css'
import NextCardBtn from './NextCardBtn'
import { audioGameSlice } from '../../../redux/reducers/audioGameSlice'

function AnswerList({ currtWord, customAnswers }: IAnswerProps) {
// function AnswerList() {
  const data = useAppSelector((state) => state.sprintGameSlice.gameData)
  const dispatch = useAppDispatch()
  // const { changeStyle } = useAppSelector((state) => state.audioGameSlice)
  const [wordIndex, setwordIndex] = useState(0)
  const [progress, setProgress] = useState(1)
  // const currtWord = data[wordIndex]
  dispatch(audioGameSlice.actions.setCurrentWord(currtWord))

  // let customAnswers: IWord[] = []
  const fakeAnswers: IWord[] = data.filter((el) => el.id !== currtWord.id)

  // function randomItem(arr: IWord[]) {
  //   const rand = Math.floor(Math.random() * arr.length)
  //   const rValue = arr[rand]
  //   return rValue
  // }
  // function randomiser(arr: IWord[]) {
  //   arr = []
  //   const word = [...arr, currtWord]
  //   for (let i = 0; i < 4; i += 1) {
  //     word.unshift(randomItem(fakeAnswers))
  //   }
  //   return word.sort(() => 0.5 - Math.random())
  // }
  // customAnswers = randomiser(customAnswers)

  return (
    <div className={styles.answers}>
      {customAnswers.map((item, indx) => (
        <Answer
          keyNumber={indx + 1}
          currtWord={customAnswers[indx]}
          key={item.id + new Date().getTime() + indx.toString()}
          copyKey={item.id + new Date().getTime() + indx.toString()}
        />
      ))}
      {/* <NextCardBtn /> */}
    </div>
  )
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export default AnswerList
interface IAnswerProps {
  // [x: string]: any
  // words: IWord[]
  currtWord: IWord
  customAnswers: IWord[]
  // onClick: () => void
  // ref?: MutableRefObject
}
