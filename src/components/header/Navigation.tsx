/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { refreshGameParams } from '../game/sprint-game/sprint-game-actions'
import { useAppDispatch, useAppSelector } from '../redux/hooks/redux'
import {
  isGetOffer,
  modalToggle,
  showMessageIfAllWordStudiedOnPage,
  whereEnterGame,
} from '../redux/reducers/sprintGameSlice'
import { clearUserPassw, getUserName } from '../redux/reducers/userSlice'
import styles from './Navigation.module.css'

export default function Navigation() {
  // const ref1 = useRef<HTMLDivElement>(null)
  // const ref2 = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const name = useAppSelector(getUserName)
  const dispatch = useAppDispatch()
  // useEffect(() => {
  // const handleHover = () => {
  //   const dropDown = document.querySelector('#dropdown') as HTMLElement
  //   dropDown.style.display = 'flex'
  // }
  // const handleOut = () => {
  //   const dropDown = document.querySelector('#dropdown') as HTMLElement
  //   dropDown.style.display = 'none'
  // }
  // const handleClick = () => {
  //   const dropDown = document.querySelector('#dropdown') as HTMLElement
  //   dropDown.style.display = 'none'
  //   dispatch(refreshGameParams())
  //   dispatch(dispatch(isGetOffer(false)))
  // }
  // const element1 = ref1.current!
  // const element2 = ref2.current!
  // element1.addEventListener('mouseover', handleHover)
  // element1.addEventListener('mouseout', handleOut)
  // element2.addEventListener('click', handleClick)
  // })
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
      <ul
        onClick={() => {
          dispatch(refreshGameParams())
          dispatch(dispatch(isGetOffer(false)))
          showMessageIfAllWordStudiedOnPage(false)
        }}
        className={styles.menuList}
      >
        <NavLink
          className={({ isActive }) => `${styles.navLink} ${isActive ? `${styles.active}` : ''}`}
          to="/"
        >
          ??????????????
        </NavLink>
        <NavLink
          className={({ isActive }) => `${styles.navLink} ${isActive ? `${styles.active}` : ''}`}
          to="/dictionary/0/0"
        >
          ??????????????
        </NavLink>
        {/* <div className={styles.dropdown} ref={ref1}>
          <button className={styles.dropbtn} type="button">
            ????????
          </button>
          <div
            id="dropdown"
            className={`${styles.dropdownContent}`}
            onClick={() => {
              dispatch(modalToggle(true))
              dispatch(whereEnterGame(false))
              showMessageIfAllWordStudiedOnPage(false)
            }}
            ref={ref2}
          >
            <Link to="/audiochallenge">????????????????????</Link>
            <Link to="/sprintchallenge">????????????</Link>
          </div>
        </div> */}
        <NavLink
          className={({ isActive }) => `${styles.navLink} ${isActive ? `${styles.active}` : ''}`}
          to="/audiochallenge"
          onClick={() => {
            dispatch(modalToggle(true))
            dispatch(whereEnterGame(false))
            showMessageIfAllWordStudiedOnPage(false)
          }}
        >
          ????????????????????
        </NavLink>
        <NavLink
          className={({ isActive }) => `${styles.navLink} ${isActive ? `${styles.active}` : ''}`}
          to="/sprintchallenge"
          onClick={() => {
            dispatch(modalToggle(true))
            dispatch(whereEnterGame(false))
            showMessageIfAllWordStudiedOnPage(false)
          }}
        >
          ????????????
        </NavLink>
        {name && (
        <NavLink
          className={({ isActive }) => `${styles.navLink} ${isActive ? `${styles.active}` : ''}`}
          to="/stats"
        >
          ????????????????????
        </NavLink>
        )}
        <NavLink
          className={({ isActive }) => `${styles.navLink} ${isActive ? `${styles.active}` : ''}`}
          to="/about"
        >
          ?? ??????????????
        </NavLink>
      </ul>
    </nav>
  )
}
