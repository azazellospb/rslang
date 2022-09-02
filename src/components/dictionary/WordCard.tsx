/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-danger */
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { IUnlearnedWord } from '../../types/models'
import { toggleDifficulty, toggleLearnState } from '../redux/fetching'
import { useAppDispatch, useAppSelector } from '../redux/hooks/redux'
import {
  dictPageWords,
  getHardWords,
} from '../redux/reducers/aggregatedSlice'
import { getUserName } from '../redux/reducers/userSlice'
import styles from './WordCard.module.css'

export default function WordCard(
  props: {
    id: string;
    reg: string;
    callback: (act: boolean) => void
  },
) {
  const { id, reg, callback } = props
  const ref1 = useRef<HTMLButtonElement>(null)
  const ref2 = useRef<HTMLButtonElement>(null)
  const dispatch = useAppDispatch()
  let pageData: IUnlearnedWord[] = []
  if (reg === 'dict') pageData = useAppSelector(dictPageWords) as IUnlearnedWord[]
  else pageData = useSelector(getHardWords) as IUnlearnedWord[]
  const obj = { ...pageData.find((word) => word._id === id)! }
  const {
    word,
    image,
    textMeaning,
    textMeaningTranslate,
    textExample,
    textExampleTranslate,
    wordTranslate,
  } = obj
  // eslint-disable-next-line react/destructuring-assignment, prefer-object-spread
  const name = useAppSelector(getUserName)
  const isAggregated = obj?.userWord !== undefined
  if (!isAggregated) {
    obj.userWord = {
      difficulty: 'easy',
      optional: {
        learned: false,
        rightCounter: 0,
        wrongCounter: 0,
      },
    }
  }
  const rightCount = obj?.userWord!.optional?.rightCounter
  const wrongCount = obj?.userWord!.optional?.wrongCounter
  const hide = !!(rightCount || wrongCount)
  // eslint-disable-next-line no-console
  console.log('card')
  if (name) {
    const isHard = obj?.userWord?.difficulty === 'hard'
    // eslint-disable-next-line react/destructuring-assignment
    const isLearned = obj?.userWord?.optional?.learned
    useEffect(() => {
      const toggleDifficultyEffect = () => {
        callback(true)
        dispatch(toggleDifficulty(isAggregated, obj))
      }
      const toggleLearnedEffect = () => {
        callback(true)
        dispatch(toggleLearnState(isAggregated, obj))
      }
      const toggleHardBtn = ref1.current!
      const toggleLearnedBtn = ref2.current!
      if (!isLearned) toggleHardBtn.addEventListener('click', toggleDifficultyEffect)
      toggleLearnedBtn.addEventListener('click', toggleLearnedEffect)
      return () => {
        if (!isLearned) toggleHardBtn.removeEventListener('click', toggleDifficultyEffect)
        toggleLearnedBtn.removeEventListener('click', toggleLearnedEffect)
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    })
    return (
      <section className={styles.card}>
        <div className={`${styles.card__side} ${styles.card__side_front} ${isHard && styles.hardWord} ${isLearned && styles.learnedWord}`}>
          <img className={styles.wordImg} src={`http://localhost:8088/${image}`} alt={word} />
          <div className={styles.cardContent}>
            <h3>{word}</h3>
            {!isLearned && isHard && <h5>#hardword</h5>}
            {isLearned && <h5>#learned</h5>}
            {hide && (
            <h4>
              Statistics:&nbsp;&nbsp;
              <span className={`${styles.right} ${styles.popupInfo}`} data-title="правильных ответов">{rightCount || '0'}</span>
              <span>{`${' / '}`}</span>
              <span className={`${styles.wrong} ${styles.popupInfo}`} data-title="неправильных ответов">{wrongCount || '0'}</span>
            </h4>
            )}
            <span>
              <strong>Word meaning:</strong>
              <br />
              <span dangerouslySetInnerHTML={{ __html: textMeaning }} />
            </span>
            <br />
            <span>
              <strong>Example:</strong>
              <br />
              <span dangerouslySetInnerHTML={{ __html: textExample }} />
            </span>
          </div>
        </div>
        <div className={`${styles.card__side} ${styles.card__side_back}`}>
          <img className={styles.wordImg} src={`http://localhost:8088/${image}`} alt={word} />
          <div className={styles.cardContent}>
            <h3>{wordTranslate}</h3>
            {!isLearned && isHard && <h5>#hardword</h5>}
            {isLearned && <h5>#learned</h5>}
            {hide && (
              <h4>
                Statistics:&nbsp;&nbsp;
                <span className={`${styles.right} ${styles.popupInfo}`} data-title="правильных ответов">{rightCount || '0'}</span>
                <span>{`${' / '}`}</span>
                <span className={`${styles.wrong} ${styles.popupInfo}`} data-title="неправильных ответов">{wrongCount || '0'}</span>
              </h4>
            )}
            <span>
              <strong>Значение слова:</strong>
              <br />
              {textMeaningTranslate}
            </span>
            <br />
            <span>
              <strong>Пример:</strong>
              <br />
              {textExampleTranslate}
            </span>
            <br />
            {!isLearned && (<button type="button" ref={ref1}>{!isHard ? ('Добавить в сложные') : ('Убрать из сложных')}</button>)}
            <button type="button" ref={ref2}>{!isLearned ? ('Выучено') : ('Повторить')}</button>
          </div>
        </div>
      </section>
    )
  } return (
    <section className={styles.card}>
      <div className={`${styles.card__side} ${styles.card__side_front}`}>
        <img className={styles.wordImg} src={`http://localhost:8088/${image}`} alt={word} />
        <div className={styles.cardContent}>
          <h3>{wordTranslate}</h3>
          <span>
            <strong>Word meaning:</strong>
            <br />
            <p dangerouslySetInnerHTML={{ __html: textMeaning }} />
          </span>
          <br />
          <span>
            <strong>Example:</strong>
            <br />
            <p dangerouslySetInnerHTML={{ __html: textExample }} />
          </span>
        </div>
      </div>
      <div className={`${styles.card__side} ${styles.card__side_back}`}>
        <img className={styles.wordImg} src={`http://localhost:8088/${image}`} alt={word} />
        <div className={styles.cardContent}>
          <h3>{wordTranslate}</h3>
          <span>
            <strong>Значение слова:</strong>
            <br />
            {textMeaningTranslate}
          </span>
          <br />
          <span>
            <strong>Пример:</strong>
            <br />
            {textExampleTranslate}
          </span>
        </div>
      </div>
    </section>
  )
}
