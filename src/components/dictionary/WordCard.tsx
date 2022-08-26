/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-danger */
import React, { useEffect, useRef } from 'react'
import { IAggregOrUserWord } from '../../types/models'
import { toggleDifficulty, toggleLearnState } from '../redux/fetching'
import { useAppDispatch, useAppSelector } from '../redux/hooks/redux'
import { getAggregatedWords } from '../redux/reducers/aggregatedSlice'
import { getUserName } from '../redux/reducers/userSlice'
import styles from './WordCard.module.css'

function WordCard(obj: IAggregOrUserWord) {
  const ref1 = useRef<HTMLButtonElement>(null)
  const ref2 = useRef<HTMLButtonElement>(null)
  const {
    word,
    image,
    textMeaning,
    textMeaningTranslate,
    textExample,
    textExampleTranslate,
    wordTranslate,
  } = obj
  // eslint-disable-next-line react/destructuring-assignment
  const id = (obj.id || obj._id) as string
  const name = useAppSelector(getUserName)
  const userWords = useAppSelector(getAggregatedWords)
  if (name) {
    const isHard = !!userWords.find((item) => (item.difficulty === 'hard') && (item.wordId === id))
    const isLearned = !!userWords.find(
      (item) => ((item.optional?.learned === true) && (item.wordId === id))
      || ((item.optional?.rightCounter === (isHard ? 3 : 2)) && (item.wordId === id)),
    )
    const dispatch = useAppDispatch()
    useEffect(() => {
      const toggleDifficultyEffect = () => {
        dispatch(toggleDifficulty(isHard, id, userWords))
      }
      const toggleLearnedEffect = () => {
        dispatch(toggleLearnState(isLearned, id, userWords))
      }
      const toggleHardBtn = ref1.current!
      const toggleLearnedBtn = ref2.current!
      if (!isLearned) toggleHardBtn.addEventListener('click', toggleDifficultyEffect)
      toggleLearnedBtn.addEventListener('click', toggleLearnedEffect)
      return () => {
        if (!isLearned) toggleHardBtn.removeEventListener('click', toggleDifficultyEffect)
        toggleLearnedBtn.removeEventListener('click', toggleLearnedEffect)
      }
    })
    return (
      <section className={styles.card}>
        <div className={`${styles.card__side} ${styles.card__side_front} ${isHard && styles.hardWord} ${isLearned && styles.learnedWord}`}>
          <img className={styles.wordImg} src={`http://localhost:8088/${image}`} alt={word} />
          <div className={styles.cardContent}>
            <h3>{word}</h3>
            {!isLearned && isHard && <h5>#hardword</h5>}
            {isLearned && <h5>#learned</h5>}
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
          <h3>{word}</h3>
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
export default WordCard
