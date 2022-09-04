/* eslint-disable max-len */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-danger */
import React, { useEffect, useRef, useState } from 'react'
import Endpoints from '../../endpoints/endpoints'
import { IWord } from '../../types/models'
import { useAppSelector } from '../redux/hooks/redux'
import { getWordsArray } from '../redux/reducers/wordSlice'
import styles from './WordCard.module.css'

export default function WordCardUnreg(
  props: {
    id: string;
  },
) {
  const { id } = props
  const ref1 = useRef<HTMLButtonElement>(null)
  const ref2 = useRef<HTMLButtonElement>(null)
  const pageData = useAppSelector(getWordsArray) as IWord[]
  const obj = { ...pageData.find((word) => word.id === id)! }
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
  const [side, setSide] = useState(false)
  useEffect(() => {
    const handleRotate = () => {
      setSide(!side)
      // eslint-disable-next-line no-console
      console.log('!')
    }
    const rotateToBack = ref1.current!
    const rotateToFront = ref2.current!
    rotateToBack.addEventListener('click', handleRotate)
    rotateToFront.addEventListener('click', handleRotate)
    return () => {
      rotateToBack.removeEventListener('click', handleRotate)
      rotateToFront.removeEventListener('click', handleRotate)
    }
  })
  // eslint-disable-next-line react/destructuring-assignment, prefer-object-spread
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
  return (
    <section className={styles.card}>
      <div className={`${side && styles.flip} ${styles.flipper}`}>
        <div className={`${styles.card__side}`}>
          <img className={styles.wordImg} src={`${Endpoints.ROOT}/${image}`} alt={word} />
          <div className={styles.cardContent}>
            <div className={styles.textPart}>
              <div className={styles.mainLine}>
                <div className={styles.word}>{word}</div>
                <input key={Math.random()} type="button" onClick={handleVoice} className={styles.audioBtn} />
              </div>
              <div className={styles.transcription}>{transcription}</div>
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
              <button type="button" ref={ref1} className={styles.rotateBtn}>Показать перевод</button>
            </div>
          </div>
        </div>
        <div className={`${styles.card__side} ${styles.card__side_back}`}>
          <img className={styles.wordImg} src={`${Endpoints.ROOT}/${image}`} alt={word} />
          <div className={styles.cardContent}>
            <div className={styles.textPart}>
              <div className={styles.mainLine}>
                <div className={styles.word}>{wordTranslate}</div>
                <input type="button" onClick={handleVoice} className={styles.audioBtn} />
              </div>
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
              <button type="button" ref={ref2} className={styles.rotateBtn}>Показать слово</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
