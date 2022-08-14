import React from 'react'
import styles from './Navigation.module.css'
import Navigation from './Navigation'

export default function Header() {
  return (
    <header className={styles.header}>
      <Navigation />
    </header>
  )
}
