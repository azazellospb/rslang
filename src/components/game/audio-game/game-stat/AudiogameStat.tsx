import React from 'react'
import styles from './AudiogameStat.module.css'
import StatsList from './StatsList'
import StatsMenu from './StatsMenu'

function AudiogameStat() {
  return (
    <section className={styles.wrapper}>
      <StatsMenu />
      {/* <h3>Game message</h3> */}
      <StatsList />
    </section>
  )
}

export default AudiogameStat
