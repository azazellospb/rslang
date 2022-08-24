/* eslint-disable react/no-danger */
import React from 'react'
import styles from './WordCard.module.css'

export interface WordObject {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}

function WordCard(obj: WordObject) {
  const {
    word,
    image,
    textMeaning,
    textMeaningTranslate,
    textExample,
    textExampleTranslate,
    wordTranslate,
  } = obj
  return (
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
