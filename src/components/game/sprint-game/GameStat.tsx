/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import styles from './sprint-game.module.css'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux'
import GameStatList from './GameStatList'
import GameMenu from '../game-menu/GameMenu'
import { IStats } from '../../../types/models'
import { setSprintGameStats } from '../../redux/fetching'
// import ButtonForMoreWords from '../modal/modalForDictionary/ButtonForMoreWords'
import OfferModal from '../modal/modalForDictionary/OfferModal'

export interface IProp {
  id: number,
}
function GameStat() {
  const dispatch = useAppDispatch()
  const studiedWords = useAppSelector((state) => state.sprintGameSlice.studiedArr)
  const allWordStudiedOnPage = useAppSelector((state) => state.sprintGameSlice.allWordStudiedOnPage)
  const message = (
    <div className={styles.messageText}>
      <h3>Упс....!</h3>
      У Вас нет результатов!
      Попробуйте пройти наше испытание ещё раз, что бы проверить ваши знания языка
    </div>
  )
  const date = new Date()
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
    learnedWords: studiedWords.length,
    optional: {
      newWords: {
        [dateKey]: Number(localStorage.getItem('newWords')) || 0,
      },
      sprintGame: {
        [dateKey]: {
          answerSet: 0,
          newWords: Number(localStorage.getItem('newWords')) || 0,
          rightAnswers: Number(localStorage.getItem('rightAnswers')) || 0,
          totalWords: Number(localStorage.getItem('totalWords')) || 0,
        },
      },
    },
  }
  if (answerSet >= 2) params.optional.sprintGame![dateKey].answerSet = answerSet
  if (localStorage.getItem('userInfo')) dispatch(setSprintGameStats(params, dateKey, 'sprintGame'))
  return (
    <section className={styles.gameStatContainer}>
      <GameMenu />
      {/* {Boolean(!studiedWords.length) && message}
      {Boolean(studiedWords.length) && <GameStatList />} */}
      {allWordStudiedOnPage && Boolean(!studiedWords.length) && <OfferModal />}
      {!allWordStudiedOnPage && Boolean(!studiedWords.length) && message}
      {!allWordStudiedOnPage && Boolean(studiedWords.length) && <GameStatList />}
    </section>
  )
}
export default GameStat
