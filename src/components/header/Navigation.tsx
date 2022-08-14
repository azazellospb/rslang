import React from 'react'
import {
  Link,
} from 'react-router-dom'
import styles from './Navigation.module.css'

export default function Navigation() {
  return (
    <nav className={styles.navigation}>
      <ul>
        <li><Link to="/dictionary">Словарь</Link></li>
        <li><Link to="/audiochallenge">Аудиовызов</Link></li>
        <li><Link to="/sprintchallenge">Спринт</Link></li>
        <li><Link to="/stats">Статистика</Link></li>
        <li><Link to="/about">О команде</Link></li>
      </ul>
    </nav>
  )
}
