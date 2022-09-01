import React from 'react'
import { NavLink } from 'react-router-dom'
import AggregatedWords from '../components/dictionary/AggregatedWords'
// import AggregatedWords from '../components/dictionary/AggregatedWords'

import styles from './Dictionary.module.css'

export default function Userwords() {
  return (
    <div className={styles.dictWrapper}>
      <h2>Difficulty words</h2>
      <NavLink to="/dictionary/0/0">Back to dictionary</NavLink>
      <AggregatedWords />
    </div>
  )
}
