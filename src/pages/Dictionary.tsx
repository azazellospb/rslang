/* eslint-disable max-len */
import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import WordsBunch from '../components/dictionary/WordsBunch'
import { useAppSelector } from '../components/redux/hooks/redux'
import { getUserName } from '../components/redux/reducers/userSlice'
import styles from './Dictionary.module.css'

export default function Dictionary() {
  const name = useAppSelector(getUserName)
  const currentPathname = useLocation().pathname.split('/')
  return (
    <div className={`${styles.dictWrapper} container`}>
      <ul className={styles.groupsList}>
        <NavLink className={`${styles.categoryButton} ${+currentPathname[2] === 0 && styles.activeCategoryButton}`} to="/dictionary/0/0">
          <li>
            Уровень
            <span className={styles.categoryTitle}> A1</span>
          </li>
        </NavLink>
        <NavLink className={`${styles.categoryButton} ${+currentPathname[2] === 1 && styles.activeCategoryButton}`} to="/dictionary/1/0">
          <li>
            Уровень
            <span className={styles.categoryTitle}>A2</span>
          </li>
        </NavLink>
        <NavLink className={`${styles.categoryButton} ${+currentPathname[2] === 2 && styles.activeCategoryButton}`} to="/dictionary/2/0">
          <li>
            Уровень
            <span className={styles.categoryTitle}>B1</span>
          </li>
        </NavLink>
        <NavLink className={`${styles.categoryButton} ${+currentPathname[2] === 3 && styles.activeCategoryButton}`} to="/dictionary/3/0">
          <li>
            Уровень
            <span className={styles.categoryTitle}>B2</span>
          </li>
        </NavLink>
        <NavLink className={`${styles.categoryButton} ${+currentPathname[2] === 4 && styles.activeCategoryButton}`} to="/dictionary/4/0">
          <li>
            Уровень
            <span className={styles.categoryTitle}> C1</span>
          </li>
        </NavLink>
        <NavLink className={`${styles.categoryButton} ${+currentPathname[2] === 5 && styles.activeCategoryButton}`} to="/dictionary/5/0">
          <li>
            Уровень
            <span className={styles.categoryTitle}> C2</span>
          </li>
        </NavLink>
        {name && <NavLink className={`${styles.categoryButton} ${currentPathname[2] === 'difficult' && styles.activeCategoryButton}`} to="/dictionary/difficult"><li>Сложные слова</li></NavLink>}
      </ul>
      <div className={styles.gamesLine}>
        <span>Сыграть в игру</span>
        <Link className={`${styles.toGame} ${styles.toAudioChallenge}`} to="/audiochallenge">Аудиовызов</Link>
        &#124;
        <Link className={` ${styles.toGame} ${styles.toSprintChallenge}`} to="/sprintchallenge">Спринт</Link>
      </div>
      <WordsBunch />
      <div className={styles.gamesLineEnd}>
        <span>Сыграть в игру</span>
        <Link className={`${styles.toGame} ${styles.toAudioChallenge}`} to="/audiochallenge">Аудиовызов</Link>
        &#124;
        <Link className={` ${styles.toGame} ${styles.toSprintChallenge}`} to="/sprintchallenge">Спринт</Link>
      </div>
    </div>
  )
}
