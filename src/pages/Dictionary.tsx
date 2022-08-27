import React from 'react'
import { NavLink } from 'react-router-dom'
import WordsBunch from '../components/dictionary/WordsBunch'
import { useAppSelector } from '../components/redux/hooks/redux'
import { getUserName } from '../components/redux/reducers/userSlice'
import styles from './Dictionary.module.css'

export default function Dictionary() {
  const name = useAppSelector(getUserName)
  const isActiveStyle = {
    borderBottom: '2px solid black',
  }
  return (
    <div className={styles.dictWrapper}>
      <h2>Dictionary page</h2>
      <ul className={styles.groupsList}>
        <NavLink style={({ isActive }) => (isActive ? isActiveStyle : {})} to="/dictionary/0/0"><li>Section A1</li></NavLink>
        <NavLink style={({ isActive }) => (isActive ? isActiveStyle : {})} to="/dictionary/1/0"><li>Section A2</li></NavLink>
        <NavLink style={({ isActive }) => (isActive ? isActiveStyle : {})} to="/dictionary/2/0"><li>Section B1</li></NavLink>
        <NavLink style={({ isActive }) => (isActive ? isActiveStyle : {})} to="/dictionary/3/0"><li>Section B2</li></NavLink>
        <NavLink style={({ isActive }) => (isActive ? isActiveStyle : {})} to="/dictionary/4/0"><li>Section C1</li></NavLink>
        <NavLink style={({ isActive }) => (isActive ? isActiveStyle : {})} to="/dictionary/5/0"><li>Section C2</li></NavLink>
        {name && <NavLink style={({ isActive }) => (isActive ? isActiveStyle : {})} to="/dictionary/difficult"><li>Difficult words</li></NavLink>}
      </ul>
      <WordsBunch />
    </div>
  )
}
