import React from 'react'
import styles from './Navigation.module.css'
import Navigation from './Navigation'
import Auth from '../auth/Auth'

export default function Header() {
  return (
    <header className={styles.header}>
      <Navigation />
      <Auth />
    </header>
  )
}
