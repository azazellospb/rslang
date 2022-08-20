import React from 'react'
import styles from './sprint-game.module.css'
import Timer from './timer'

function SprintGameMainBlock() {
  return (
    <section className={styles.sprintGameFieldWherePlaying}>
      <Timer />
      <div className="select-word">
        здесь слова
      </div>
    </section>
  )
}
export default SprintGameMainBlock
