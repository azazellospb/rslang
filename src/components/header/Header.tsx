import React from 'react'
import styles from './Header.module.css'
import Navigation from './Navigation'
import Logo from './Logo'
import LoginBlock from './Login'

export default function Header() {
  return (
    <header className={styles.header}>
      <Logo />
      <Navigation />
      <LoginBlock UserAuth={localStorage.getItem('userInfo')} />
    </header>
  )
}
