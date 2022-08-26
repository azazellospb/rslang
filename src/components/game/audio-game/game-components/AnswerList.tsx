/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { MutableRefObject } from 'react'
import { IWord } from '../../../../types/models'
import { useAppSelector } from '../../../redux/hooks/redux'
import Answer from './Answer'
import styles from '../Audiogame.module.css'

function AnswerList({ currtWord, customAnswers }: IAnswerProps) {
  // const data = useAppSelector((state) => state.sprintGameSlice.gameData)
  // const answers = [...data.slice(0, 4), currtWord]
  // console.log('=> ', customAnswers)
  // const handle = () => alert('!')
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
