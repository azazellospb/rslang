import React from 'react'
import BookIcon from './BookIcon'
import styles from '../../game-stat/AudiogameStat.module.css'

function BackToBook() {
  return (
    <div className={styles.toBookBtn}>
      {/* BackToBook */}
      <BookIcon />
    </div>
  )
}

export default BackToBook
