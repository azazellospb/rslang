import React from 'react'
import { NavLink } from 'react-router-dom'
import WordsBunch from '../components/WordsBunch'
import styles from './Dictionary.module.css'

export default function Dictionary() {
  return (
    <div className={styles.dictWrapper}>
      <h2>Dictionary page</h2>
      <ul>
        <NavLink to="/dictionary/0/0"><li>Section A1</li></NavLink>
        <NavLink to="/dictionary/1/0"><li>Section A2</li></NavLink>
        <NavLink to="/dictionary/2/0"><li>Section B1</li></NavLink>
        <NavLink to="/dictionary/3/0"><li>Section B2</li></NavLink>
        <NavLink to="/dictionary/4/0"><li>Section C1</li></NavLink>
        <NavLink to="/dictionary/5/0"><li>Section C2</li></NavLink>
        {/* <NavLink to="/dictionary/6/0"><li>Section A1</li></NavLink> */}
        <li>Difficult words</li>
      </ul>
      <WordsBunch />
      {/* <div className={styles.wordBlock}>
        {data.map((item) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <WordCard {...item} />
        ))}
      </div> */}
    </div>
  )
}
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
