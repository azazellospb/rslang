/* eslint-disable max-len */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-danger */
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Endpoints from '../../endpoints/endpoints'
import { IUnlearnedWord } from '../../types/models'
import { toggleDifficulty, toggleLearnState } from '../redux/fetching'
import { useAppDispatch, useAppSelector } from '../redux/hooks/redux'
import {
  dictPageWords,
  getHardWords,
} from '../redux/reducers/aggregatedSlice'
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
  const ref3 = useRef<HTMLButtonElement>(null)
  const ref4 = useRef<HTMLButtonElement>(null)
  const ref5 = useRef<HTMLButtonElement>(null)
  const ref6 = useRef<HTMLButtonElement>(null)
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
    transcription,
    audio,
    audioMeaning,
    audioExample,
  } = obj
  // eslint-disable-next-line react/destructuring-assignment, prefer-object-spread
  const isAggregated = obj?.userWord !== undefined
  const audioFile = [audio, audioMeaning, audioExample]
  const audioTracks: HTMLAudioElement[] = []
  for (let i = 0; i < audioFile.length; i += 1) {
    audioTracks[i] = new Audio(`${Endpoints.ROOT}/${audioFile[i]}`)
    audioTracks[i].load()
  }
  function handleVoice() {
    audioTracks[0].play()
    audioTracks[0].onended = () => { audioTracks[1].play() }
    audioTracks[1].onended = () => { audioTracks[2].play() }
  }
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
  const isHard = obj?.userWord?.difficulty === 'hard'
  // eslint-disable-next-line react/destructuring-assignment
  const isLearned = obj?.userWord?.optional?.learned
  const [side, setSide] = useState(false)
  useEffect(() => {
    const handleRotate = () => {
      setSide(!side)
      // eslint-disable-next-line no-console
      console.log('!')
    }
    const rotateToBack = ref3.current!
    const rotateToFront = ref4.current!
    rotateToBack.addEventListener('click', handleRotate)
    rotateToFront.addEventListener('click', handleRotate)
    return () => {
      rotateToBack.removeEventListener('click', handleRotate)
      rotateToFront.removeEventListener('click', handleRotate)
    }
  })
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
    const toggleHardBtn2 = ref5.current!
    const toggleLearnedBtn2 = ref6.current!
    if (!isLearned) {
      toggleHardBtn.addEventListener('click', toggleDifficultyEffect)
      toggleHardBtn2.addEventListener('click', toggleDifficultyEffect)
    }
    toggleLearnedBtn.addEventListener('click', toggleLearnedEffect)
    toggleLearnedBtn2.addEventListener('click', toggleLearnedEffect)
    return () => {
      if (!isLearned) {
        toggleHardBtn.removeEventListener('click', toggleDifficultyEffect)
        toggleHardBtn2.removeEventListener('click', toggleDifficultyEffect)
      }
      toggleLearnedBtn.removeEventListener('click', toggleLearnedEffect)
      toggleLearnedBtn2.removeEventListener('click', toggleLearnedEffect)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  })
  return (
    <section className={styles.card}>
      <div className={`${side && styles.flip} ${styles.flipper}`}>
        <div className={`${styles.card__side} ${isHard && styles.hardWord} ${isLearned && styles.learnedWord}`}>
          {isLearned && <div className={`${styles.label} ${styles.learned}`}>Изучено</div>}
          {!isLearned && isHard && <div className={`${styles.label} ${styles.hard}`}>Сложное</div>}
          <img className={styles.wordImg} src={`${Endpoints.ROOT}/${image}`} alt={word} />
          <div className={styles.cardContent}>
            <div className={styles.textPart}>
              <div className={styles.mainLine}>
                <div className={styles.word}>{word}</div>
                <input key={Math.random()} type="button" onClick={handleVoice} className={styles.audioBtn} />
              </div>
              <div className={styles.transcription}>{transcription}</div>
              {hide && (
              <h4>
                Statistics:&nbsp;&nbsp;
                <span className={`${styles.right} ${styles.popupInfo}`} data-title="правильных ответов">{rightCount || '0'}</span>
                <span>{`${' / '}`}</span>
                <span className={`${styles.wrong} ${styles.popupInfo}`} data-title="неправильных ответов">{wrongCount || '0'}</span>
              </h4>
              )}
              <span
                className={styles.wordDescription}
                dangerouslySetInnerHTML={{ __html: textMeaning }}
              />
              <br />
              <span>
                <strong>Example:</strong>
                <br />
                <span
                  className={styles.wordExample}
                  dangerouslySetInnerHTML={{ __html: textExample }}
                />
              </span>
            </div>
            <div className={styles.buttonBlock}>
              <button type="button" ref={ref3} className={styles.rotateBtn}>Показать перевод</button>
              <button className={`${isLearned && styles.hideBtn} ${!isHard && styles.statusBtn} ${isHard && styles.toEasyBtn}`} type="button" ref={ref5}>{!isHard ? ('В сложные') : ('Убрать из сложных')}</button>
              <button className={`${isHard && styles.hideBtn} ${!isLearned && styles.statusBtn} ${isLearned && styles.toUnLearnedBtn}`} type="button" ref={ref6}>{(!isLearned && !isHard) ? ('В изученные') : ('Повторить')}</button>
            </div>
          </div>
        </div>
        <div className={`${styles.card__side} ${styles.card__side_back} ${(isLearned && styles.learnedWord)} ${(isHard && styles.hardWord)}`}>
          {isLearned && <div className={`${styles.label} ${styles.learned}`}>Изучено</div>}
          {!isLearned && isHard && <div className={`${styles.label} ${styles.hard}`}>Сложное</div>}
          <img className={styles.wordImg} src={`${Endpoints.ROOT}/${image}`} alt={word} />
          <div className={styles.cardContent}>
            <div className={styles.textPart}>
              <div className={styles.mainLine}>
                <div className={styles.word}>{wordTranslate}</div>
                <input type="button" onClick={handleVoice} className={styles.audioBtn} />
              </div>
              {hide && (
                <h4>
                  Statistics:&nbsp;&nbsp;
                  <span className={`${styles.right} ${styles.popupInfo}`} data-title="правильных ответов">{rightCount || '0'}</span>
                  <span>{`${' / '}`}</span>
                  <span className={`${styles.wrong} ${styles.popupInfo}`} data-title="неправильных ответов">{wrongCount || '0'}</span>
                </h4>
              )}
              <span className={styles.wordDescription}>
                {textMeaningTranslate}
              </span>
              <br />
              <div className={styles.wordExample}>
                <strong>Пример:</strong>
                <br />
                {textExampleTranslate}
              </div>
            </div>
            <div className={styles.buttonBlock}>
              <button ref={ref4} type="button" className={styles.rotateBtn}>Показать слово</button>
              <button className={`${isLearned && styles.hideBtn} ${!isHard && styles.statusBtn} ${isHard && styles.toEasyBtn}`} type="button" ref={ref1}>{!isHard ? ('В сложные') : ('Убрать из сложных')}</button>
              <button className={`${isHard && styles.hideBtn} ${!isLearned && styles.statusBtn} ${isLearned && styles.toUnLearnedBtn}`} type="button" ref={ref2}>{(!isLearned && !isHard) ? ('В изученные') : ('Повторить')}</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
