import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Logo.module.css'

export default function Header() {
  return (
    <div className={styles.logoBlock}>
      <Link to="/">
        <h2 className={styles.logoText}>
          RS Lang
        </h2>
      </Link>
    </div>
  )
}
