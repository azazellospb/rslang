import React from 'react'
import BackToGameStatButton from '../../../ui/BackToGameStatButton'
import BookStatButton from '../../../ui/BookStatButton'
import ReloadStatButton from '../../../ui/ReloadStatButton'
import styles from './game-menu.module.css'

function GameMenu() {
  return (
    <div className={styles.gameMenuContainer}>
      <ReloadStatButton />
      <BookStatButton />
      <BackToGameStatButton />

    </div>

  )
}
export default GameMenu
