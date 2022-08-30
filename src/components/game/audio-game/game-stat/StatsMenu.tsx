import React from 'react'
import { Link } from 'react-router-dom'
import BackToBook from '../game-ui/book-btn/BackToBook'
import ReloadGame from '../game-ui/reload-btn/ReloadGame'
import styles from './StatsMenu.module.css'

function StatsMenu() {
  return (
    <div className={styles.wrapper}>
      <ReloadGame />
      <Link to="/dictionary/0/0">
        <BackToBook />
      </Link>
      {/* <BackToGame /> */}
    </div>
  )
}

export default StatsMenu
