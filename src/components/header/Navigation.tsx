import React, { useRef, useEffect } from 'react'
import {
  Link, NavLink,
} from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/hooks/redux'
import { clearUserPassw } from '../redux/reducers/userSlice'
import styles from './Navigation.module.css'

export default function Navigation() {
  const ref1 = useRef<HTMLDivElement>(null)
  const ref2 = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const dispatch = useAppDispatch()
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
  const navbar = navRef.current
  let { password } = useAppSelector((state) => state.userReducer)
  function getPassword() {
    if (password !== '') {
      dispatch(clearUserPassw())
      localStorage.removeItem('userName')
      password = ''
    }
  }
  navbar?.addEventListener('click', getPassword)
  return (
    <nav className={styles.navigation} ref={navRef}>
      <ul className={styles.menuList}>
        <NavLink to="/"><li>На главную</li></NavLink>
        <NavLink to="/dictionary"><li>учебник</li></NavLink>
        <div className={styles.dropdown} ref={ref1}>
          <button className={styles.dropbtn} type="button">игры</button>
          <div id="dropdown" className={`${styles.dropdownContent}`} ref={ref2}>
            <Link to="/audiochallenge">аудиовызов</Link>
            <Link to="/sprintchallenge">спринт</Link>
          </div>
        </div>
        <NavLink to="/about"><li>о команде</li></NavLink>
      </ul>
    </nav>
  )
}
