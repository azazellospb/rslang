import React from 'react'
import { IStats } from '../../../../types/models'
import { setSprintGameStats } from '../../../redux/fetching'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/redux'
import StatsCard from './StatsCard'
import styles from './StatsMenu.module.css'

function StatsList() {
  const { learnedWords } = useAppSelector((state) => state.audioGameSlice)
  const date = new Date()
  const dispatch = useAppDispatch()
  const month = (date.getMonth() + 1).toString().length !== 1 ? (date.getMonth() + 1).toString() : `0${(date.getMonth() + 1).toString()}`
  const dateKey = `d${date.getDate().toString()}${month}${date.getFullYear().toString()}`
  let answersArr = [['']]
  let answerSet = 0
  if (localStorage.getItem('rightOrwrong')) {
    // eslint-disable-next-line no-console
    answersArr = localStorage.getItem('rightOrwrong')!.split(',').map((v) => v || 'false').join(',').split('false')
      .map((v) => v.split(','))
    answerSet = answersArr[answersArr
      .reduce((p, c, i, a) => (a[p].length > c.length ? p : i), 0)].length
  }
  const params: IStats = {
    method: 'PUT',
    learnedWords: learnedWords.length,
    optional: {
      newWords: {
        [dateKey]: Number(localStorage.getItem('newWords')) || 0,
      },
      audioGame: {
        [dateKey]: {
          answerSet: 0,
          newWords: Number(localStorage.getItem('newWords')) || 0,
          rightAnswers: Number(localStorage.getItem('rightAnswers')) || 0,
          totalWords: Number(localStorage.getItem('totalWords')) || 0,
        },
      },
    },
  }
  if (answerSet >= 2) params.optional.audioGame![dateKey].answerSet = answerSet
  if (localStorage.getItem('userInfo')) dispatch(setSprintGameStats(params, dateKey, 'audioGame'))
  return (
    <div className={styles.statsList}>
      {learnedWords.map((el, i) => (
        <StatsCard id={i} key={Math.random()} />
      ))}
    </div>
  )
}

export default StatsList
