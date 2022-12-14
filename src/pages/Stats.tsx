/* eslint-disable no-restricted-syntax */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-unsafe-optional-chaining */

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../components/redux/hooks/redux'
import { getLearnedWithDates, getTodayLearned, getUserStats } from '../components/redux/fetching'
import {
  getAllLearned,
  getLearnedWords,
  userStats,
} from '../components/redux/reducers/userSlice'
import styles from './Stats.module.css'

export default function Stats() {
  const date = new Date()
  const month = (date.getMonth() + 1).toString().length !== 1 ? (date.getMonth() + 1).toString() : `0${(date.getMonth() + 1).toString()}`
  const dateKey = `d${date.getDate().toString()}${month}${date.getFullYear().toString()}`
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getUserStats())
    dispatch(getLearnedWithDates())
    dispatch(getTodayLearned(dateKey))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, dateKey])
  const todayLearned = useSelector(getLearnedWords)
  const learnedArr = useSelector(getAllLearned)
  const stats = useSelector(userStats)
  try {
    const dateArr = new Map()
    for (let i = 7; i >= 0; i -= 1) {
      const dateVar = ((d) => new Date(d.setDate(d.getDate() - i)))(new Date())
      const monthVar = (dateVar.getMonth() + 1).toString().length !== 1 ? (dateVar.getMonth() + 1).toString() : `0${(dateVar.getMonth() + 1).toString()}`
      const dateKeyVar = `d${dateVar.getDate().toString()}${monthVar}${dateVar.getFullYear().toString()}`
      const wordsPerDay = learnedArr
        .filter((x) => x.userWord?.optional?.dates?.[dateKeyVar] !== undefined).length
      if (wordsPerDay !== 0) dateArr.set(dateKeyVar, wordsPerDay)
    }
    const { newWords } = stats.optional
    let userNewDates = Object.keys(newWords)
    userNewDates = userNewDates.map((item) => {
      const preDate = item.substring(1, item.length - 4).split('').reverse()
      preDate.splice(2, 0, '.')
      return preDate.reverse().join('')
    })
    const userNewWords = Object.values(newWords)
    const newWordsMax = Math.max(...userNewWords)
    let userDates = Array.from(dateArr.keys())
    userDates = userDates.map((item) => {
      const preDate = item.substring(1, item.length - 4).split('').reverse()
      preDate.splice(2, 0, '.')
      return preDate.reverse().join('')
    })
    let userResults = Array.from(dateArr.values())
    userResults = userResults.map((x, i) => userResults[i] + (userResults[i - 1] || 0))
    const hasAudioData = !!stats.optional?.audioGame?.[dateKey]
    const hasSprintData = !!stats.optional?.sprintGame?.[dateKey]
    let audioNewWords = 0
    let audioRightAnswers = 0
    let audioTotalWords = 0
    let audioRightRate = 0
    let audioRightSet = 0
    let sprintNewWords = 0
    let sprintRightAnswers = 0
    let sprintTotalWords = 0
    let sprintRightRate = 0
    let sprintRightSet = 0
    if (hasAudioData) {
      audioNewWords = stats.optional.audioGame?.[dateKey].newWords as number
      audioRightAnswers = stats.optional.audioGame?.[dateKey].rightAnswers as number
      audioTotalWords = stats.optional.audioGame?.[dateKey].totalWords as number
      audioRightRate = +(((audioRightAnswers / audioTotalWords) || 1) * 100).toFixed(1)
      audioRightSet = stats.optional.audioGame?.[dateKey].answerSet as number
    }
    if (hasSprintData) {
      sprintNewWords = stats.optional.sprintGame?.[dateKey].newWords as number
      sprintRightAnswers = stats.optional.sprintGame?.[dateKey].rightAnswers as number
      sprintTotalWords = stats.optional.sprintGame?.[dateKey].totalWords || 0 as number
      sprintRightRate = +(((sprintRightAnswers / sprintTotalWords) || 1) * 100).toFixed(1)
      sprintRightSet = stats.optional.sprintGame?.[dateKey].answerSet as number
    }
    const totalRR = (+(((audioRightAnswers + sprintRightAnswers)
      / (audioTotalWords + sprintTotalWords)) * 100) || 0)
      .toFixed(1)
    return (
      <div className="container">
        <table className={styles.dayTable}>
          <thead className={styles.legend}>
            <tr>
              <th colSpan={4}>?????????????????????????? ????????????????????</th>
            </tr>
            <tr>
              <th>&nbsp;</th>
              <th className={styles.columnWidth}>{'???????? "????????????????????"'}</th>
              <th className={styles.columnWidth}>{'???????? "????????????"'}</th>
              <th className={styles.columnWidth}>?????????? ???????????????????? ???? ????????????</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className={styles.legend} scope="row">???????????????????? ?????????? ???????? ???? ????????:</th>
              <td>{audioNewWords || '?????? ????????????'}</td>
              <td>{sprintNewWords || '?????? ????????????'}</td>
              <td>{((sprintNewWords || 0) + (audioNewWords || 0))}</td>
            </tr>
            <tr>
              <th className={styles.legend} scope="row">?????????????? ???????????????????? ??????????????:</th>
              <td>{audioRightRate || '?????? ????????????'}</td>
              <td>{sprintRightRate || '?????? ????????????'}</td>
              <td>{totalRR}</td>
            </tr>
            <tr>
              <th className={styles.legend} scope="row">?????????? ?????????????? ?????????? ???????????????????? ??????????????:</th>
              <td>{audioRightSet || '?????? ????????????'}</td>
              <td>{sprintRightSet || '?????? ????????????'}</td>
              <td>{sprintRightSet > audioRightSet ? sprintRightSet : audioRightSet}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th className={styles.legend} scope="row">???????????????????? ?????????????????? ???????? ???? ????????:</th>
              <td colSpan={3}>{todayLearned}</td>
            </tr>
          </tfoot>
        </table>
        <div className={styles.chartWrapper}>
          <h4 className={styles.legend}>???????????????????????? ????????????????????</h4>
          <div className={styles.chartBlock}>
            <div className={styles.chartLegend}>
              <h4 className={styles.title}>?????????????????? ?????????? ?????????????????????? ????????????</h4>
            </div>
            <div className={styles.chart}>
              {userResults.map((results, index) => (
                <div key={`${Math.random()}`} className={styles.chartUnit}>
                  <div className={styles.legend}>{results}</div>
                  <div className={styles.bar} style={{ height: `${(results * 8) / userResults[userResults.length - 1]}vw` }} key={`${Math.random()}${results}`} id={results} />
                  <div className={styles.date} key={`${Math.random()}`} id={userDates[index]}>{userDates[index].split()}</div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.chartBlock}>
            <div className={styles.chartLegend}>
              <h4 className={styles.title}>???????????????????? ?????????? ???????? ???? ???????????? ???????? ????????????????</h4>
            </div>
            <div className={styles.chart}>
              {userNewWords.map((results, index) => (
                <div key={`${Math.random()}`} className={styles.chartUnit}>
                  <div className={styles.legend}>{results}</div>
                  <div className={styles.bar} style={{ height: `${(results * 8) / newWordsMax}vw` }} key={`${Math.random()}${results}`} id={userNewWords[index].toString()} />
                  <div className={styles.date} key={`${Math.random()}`} id={userNewDates[index]}>{userNewDates[index]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  } catch (_err) {
    // eslint-disable-next-line no-console
    return (
      <div className={styles.chartWrapper}>
        ???????? ???????????? ?????? ???????????????????? ???????????????????? ????????????????????????. ?????????????????? ?? ???????? ????????.
      </div>
    )
  }
}
