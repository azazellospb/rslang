import React from 'react'
import styles from './sprint-game.module.css'

function ButtonBlock() {
  return (
    <section className={styles.sprintButtonBlock}>
      <button
        type="button"
        className={styles.falseButton}
      >
        Не верно!
      </button>
      <button
        type="button"
        className={styles.truthButton}
      >
        Верно!
      </button>
    </section>
  )
}
export default ButtonBlock
