/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { IUnlearnedWord, IWord } from '../../../../types/models'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/redux'
import Answer from './Answer'
import styles from '../Audiogame.module.css'
import { audioGameSlice } from '../../../redux/reducers/audioGameSlice'
import { getBeforePageWords, getOtherUnlearned } from '../../../redux/reducers/aggregatedSlice'
import { aggregateWords } from '../../../redux/fetching'

function AnswerList() {
  const startDada = useAppSelector(getBeforePageWords)
  const proposeDada = useAppSelector(getOtherUnlearned)
  const dispatch = useAppDispatch()
  const { isFromDictionary } = useAppSelector((state) => state.sprintGameSlice)
  let data: IWord[] | IUnlearnedWord[]
  if (startDada.length) {
    data = startDada
  } else if (proposeDada.length) {
    data = proposeDada
  } else {
    data = useAppSelector((state) => state.sprintGameSlice.gameData)
  }
  if (!isFromDictionary) data = useAppSelector((state) => state.sprintGameSlice.gameData)

  const dataAnswers = useAppSelector((state) => state.wordSlice.data)
  const counterWord = useAppSelector((state) => state.audioGameSlice.counterWord)

  const currtWord = data[counterWord]
  dispatch(audioGameSlice.actions.setCurrentWord(currtWord))
  dispatch(aggregateWords())
  let customAnswers: IWord[] | (IWord[] & IUnlearnedWord[]) = []
  function randomIndx(arr: IWord[]) {
    const rand = Math.floor(Math.random() * arr.length)
    return rand
  }
  function randomiser(arr: IWord[] | (IWord[] & IUnlearnedWord[])) {
    customAnswers = arr
    customAnswers = [...arr, currtWord] as IWord[] | (IWord[] & IUnlearnedWord[])

    while (customAnswers.length < 5) {
      const rIndex = randomIndx(dataAnswers)
      const word = customAnswers.find((el) => el.id === dataAnswers[rIndex].id)
      if (!word) {
        customAnswers.push(dataAnswers[rIndex])
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
          key={item.id! + new Date().getTime() + indx.toString()}
        />
      ))}
    </div>
  )
}

export default AnswerList

// export interface IUnlearn {
//   _id?: string
// }
