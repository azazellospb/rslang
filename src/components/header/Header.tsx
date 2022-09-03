import React from 'react'
import styles from './Header.module.css'
import Navigation from './Navigation'
import Logo from './Logo'
import LoginBlock from './Login'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`${styles.headerContainer} container`}>
        <Logo />
        <Navigation />
        <LoginBlock />
      </div>
    </header>
  )
}
