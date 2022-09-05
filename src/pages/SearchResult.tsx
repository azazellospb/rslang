/* eslint-disable max-len */
import React from 'react'
import { Link } from 'react-router-dom'
import SearchedWord from '../components/dictionary/SearchedWord'

import styles from './SearchResult.module.css'

export default function Search() {
  return (
    <div className={styles.searchBlock}>
      <Link to="/dictionary/0/0">Вернуться в учебник</Link>
      <div className={styles.title}>Результаты поиска:</div>
      <SearchedWord />
    </div>
  )
}
