import React from 'react'
import {
  Link,
} from 'react-router-dom'
import styles from './Navigation.module.css'

export default function Navigation() {
  return (
    <nav className={styles.navigation}>
      <ul className={styles.menuList}>
        <Link to="/dictionary"><li>Учебник</li></Link>
        <div className={styles.dropdown}>
          <button className={styles.dropbtn} type="button">Игры</button>
          <div className={styles.dropdownContent}>
            <Link to="/audiochallenge">Аудиовызов</Link>
            <Link to="/sprintchallenge">Спринт</Link>
          </div>
        </div>
        <Link to="/stats"><li>Статистика</li></Link>
        <Link to="/about"><li>О команде</li></Link>
      </ul>
    </nav>
  )
}
