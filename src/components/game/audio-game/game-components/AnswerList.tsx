/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { MutableRefObject, useEffect } from 'react'
import { IWord } from '../../../../types/models'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/redux'
import Answer from './Answer'
import styles from '../Audiogame.module.css'
import { createArrForAnswerButton } from './audioGameActions'

function AnswerList(/* { currtWord, customAnswers }: IAnswerProps */) {
  const dispatch = useAppDispatch()
  const currentWord = useAppSelector((state) => state.audioGameSlice.currentWord)
  const arrForGameButtons = useAppSelector((state) => state.audioGameSlice.wordForButtons)
  const gameData = useAppSelector((state) => state.sprintGameSlice.gameData)
  useEffect(() => {
    dispatch(createArrForAnswerButton(currentWord, gameData))
  }, [currentWord])

  return (
    <div className={styles.answers}>
      {arrForGameButtons.map((item, indx) => (
        <Answer keyNumber={indx + 1} index={indx} key={item?.id} />
      ))}
    </div>
  )
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export default AnswerList
// interface IAnswerProps {
// [x: string]: any
// words: IWord[]
// currtWord: IWord
// customAnswers: IWord[]
// onClick: () => void
// ref?: MutableRefObject
// }
