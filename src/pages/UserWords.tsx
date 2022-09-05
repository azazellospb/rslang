import React from 'react'
import { NavLink } from 'react-router-dom'
import AggregatedWords from '../components/dictionary/AggregatedWords'
import styles from './Dictionary.module.css'

export default function Userwords() {
  return (
    <div className={styles.dictWrapper}>
      <div className={styles.diffTopLine}>
        <div>
          <NavLink className={styles.returnLink} to="/dictionary/0/0">Вернуться в учебник</NavLink>
        </div>
        <div className={styles.catTitle}>Сложные слова</div>
      </div>
      <AggregatedWords />
    </div>
  )
}
