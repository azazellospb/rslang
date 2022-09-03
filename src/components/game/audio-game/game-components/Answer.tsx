/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { IParams, IUnlearnedWord, IWord } from '../../../../types/models'
import { postPutWordsToServerFromGame } from '../../../redux/fetching'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/redux'
import { getAggregatedWords } from '../../../redux/reducers/aggregatedSlice'
import { audioGameSlice } from '../../../redux/reducers/audioGameSlice'
import createLearnedWordAndPutItToArr from '../audiogame-actions'
import styles from '../Audiogame.module.css'

function Answer({ keyNumber, currtWord }: IAnswerBtn) {
  const { currentWord, changeStyle } = useAppSelector((state) => state.audioGameSlice)
  const dispatch = useAppDispatch()
  const [styleBtn, setStyle] = useState('')
  const aggregatedHard = useAppSelector(getAggregatedWords)
  const wordAggreg = currentWord as IUnlearnedWord
  const wordParams = aggregatedHard.find((word) => word.wordId === (currentWord?.id || wordAggreg._id))
  const isAggregated = !!aggregatedHard.find((word) => word.wordId === (currentWord?.id || wordAggreg._id))
  function handleClick(
    e: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>,
  ) {
    const date = new Date()
    const month = (date.getMonth() + 1).toString().length !== 1 ? (date.getMonth() + 1).toString() : `0${(date.getMonth() + 1).toString()}`
    const dateKey = `d${date.getDate().toString()}${month}${date.getFullYear().toString()}`
    const examination = currtWord.word === currentWord?.word
    if (!localStorage.getItem('rightOrwrong')) {
      localStorage.setItem('rightOrwrong', examination.toString())
    } else {
      localStorage.setItem('rightOrwrong', `${localStorage.getItem('rightOrwrong')},${examination.toString()}`)
    }
    if (!localStorage.getItem('totalWords')) {
      localStorage.setItem('totalWords', '1')
    } else {
      const totalWordsData = localStorage.getItem('totalWords')!
      localStorage.setItem('totalWords', (Number(totalWordsData) + 1).toString())
    }
    if (examination) {
      if (!localStorage.getItem('rightAnswers')) {
        localStorage.setItem('rightAnswers', '1')
      } else {
        const rightAnswersData = localStorage.getItem('rightAnswers')!
        localStorage.setItem('rightAnswers', (Number(rightAnswersData) + 1).toString())
      }
    }
    if (isAggregated) {
      const word = currentWord as IUnlearnedWord
      const isHard = (wordParams?.difficulty === 'hard')
      let toLearn = (wordParams?.optional?.toLearn || 0)
      const params: IParams = {
        method: 'PUT',
        // eslint-disable-next-line no-nested-ternary
        difficulty: !isHard ? word?.userWord?.difficulty : examination ? ((toLearn === 2) ? 'easy' : wordParams?.difficulty) : wordParams?.difficulty,
        wordId: word._id || currentWord!.id,
        optional: {
          // eslint-disable-next-line no-nested-ternary
          toLearn: !isHard ? 0 : examination ? (!((toLearn + 1) === 3) ? toLearn += 1 : toLearn = 0) : ((toLearn - 1 > 0) ? toLearn -= 1 : toLearn = 0),
          learned: ((toLearn === 2) && isHard) || (examination && !isHard),
          rightCounter: examination ? Number(wordParams?.optional?.rightCounter) + 1 : Number(wordParams?.optional?.rightCounter) || 0,
          wrongCounter: !examination ? Number(wordParams?.optional?.wrongCounter) + 1 : Number(wordParams?.optional?.wrongCounter) || 0,
          dates: {},
        },
      }
      // eslint-disable-next-line no-console
      console.log(params)
      // eslint-disable-next-line no-nested-ternary, no-unneeded-ternary
      if (examination && (!isHard ? true : (isHard && toLearn === 2) ? true : false)) params.optional!.dates![dateKey] = true
      dispatch(postPutWordsToServerFromGame(params))
    } else {
      if (!localStorage.getItem('newWords')) {
        localStorage.setItem('newWords', '1')
      } else {
        const newWordsData = localStorage.getItem('newWords')!
        localStorage.setItem('newWords', (Number(newWordsData) + 1).toString())
      }
      const word = currentWord as IUnlearnedWord
      const params: IParams = {
        method: 'POST',
        difficulty: 'easy',
        wordId: word._id || currentWord!.id,
        optional: {
          toLearn: 0,
          learned: examination,
          rightCounter: examination ? 1 : 0,
          wrongCounter: !examination ? 1 : 0,
          dates: {},
        },
      }
      if (examination) params.optional!.dates![dateKey] = true
      dispatch(postPutWordsToServerFromGame(params))
    }
    if (currtWord.word === currentWord?.word) {
      dispatch(audioGameSlice.actions.setStyles(true))
      setStyle(`${styles.answerRight}`)
      dispatch(createLearnedWordAndPutItToArr(currtWord, true))
      // localStorage.setItem('newWords', currtWord.word)
    } else {
      dispatch(audioGameSlice.actions.setStyles(true))
      setStyle(`${styles.answerWrong}`)
      dispatch(createLearnedWordAndPutItToArr(currtWord, false))
    }
  }

  return (
    <button
      type="button"
      className={!changeStyle ? `${styles.answersItem}` : `${styles.answersItem} ${styleBtn}`}
      onClick={(e: React.MouseEvent<HTMLElement>) => handleClick(e)}
      disabled={changeStyle}
    >
      <span>{`${keyNumber}. `}</span>
      <span>{currtWord.wordTranslate}</span>
    </button>
  )
}

export default Answer

interface IAnswerBtn {
  keyNumber: object | number | string
  currtWord: IWord | IUnlearnedWord
}
