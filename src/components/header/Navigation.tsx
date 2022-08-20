import React, { useRef, useEffect } from 'react'
import {
  Link,
} from 'react-router-dom'
import styles from './Navigation.module.css'

export default function Navigation() {
  const ref1 = useRef<HTMLDivElement>(null)
  const ref2 = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handleHover = () => {
      const dropDown = document.querySelector('#dropdown') as HTMLElement
      dropDown.style.display = 'flex'
    }
    const handleOut = () => {
      const dropDown = document.querySelector('#dropdown') as HTMLElement
      dropDown.style.display = 'none'
    }
    const handleClick = () => {
      const dropDown = document.querySelector('#dropdown') as HTMLElement
      dropDown.style.display = 'none'
    }
    const element1 = ref1.current!
    const element2 = ref2.current!
    element1.addEventListener('mouseover', handleHover)
    element1.addEventListener('mouseout', handleOut)
    element2.addEventListener('click', handleClick)
  })
  return (
    <nav className={styles.navigation}>
      <ul className={styles.menuList}>
        <Link to="/"><li>На главную</li></Link>
        <Link to="/dictionary"><li>учебник</li></Link>
        <div className={styles.dropdown} ref={ref1}>
          <button className={styles.dropbtn} type="button">игры</button>
          <div id="dropdown" className={`${styles.dropdownContent}`} ref={ref2}>
            <Link to="/audiochallenge">аудиовызов</Link>
            <Link to="/sprintchallenge">спринт</Link>
          </div>
        </div>
        <Link to="/about"><li>о команде</li></Link>
      </ul>
    </nav>
  )
}
