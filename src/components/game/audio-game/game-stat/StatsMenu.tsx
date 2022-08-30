import React from 'react'
import BackToBook from '../game-ui/book-btn/BackToBook'
import ReloadGame from '../game-ui/reload-btn/ReloadGame'
import styles from './StatsMenu.module.css'

function StatsMenu() {
  return (
    <div className={styles.wrapper}>
      <ReloadGame />
      <BackToBook />
      {/* <BackToGame /> */}
    </div>
  )
}

export default StatsMenu
