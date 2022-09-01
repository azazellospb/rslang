/* eslint-disable no-template-curly-in-string */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { getDictPageWords } from '../redux/fetching'
import { useAppDispatch, useAppSelector } from '../redux/hooks/redux'
import { dictPageWords } from '../redux/reducers/aggregatedSlice'
import WordCard from './WordCard'
import styles from './WordsBunch.module.css'

export default function WordsBunch() {
  const { group = 0, page = 0 } = useParams()
  const isActiveStyle = {
    borderBottom: '2px solid black',
  }
  // eslint-disable-next-line no-console

  const dispatch = useAppDispatch()
  const pageData = useAppSelector(dictPageWords)
  // eslint-disable-next-line no-console
  console.log('page')
  useEffect(() => {
    dispatch(getDictPageWords(+page, +group))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group, page])

  const current = Number(page!)

  return (
    <div>
      <div className={styles.pagination}>
        {current !== 0 ? <NavLink style={({ isActive }) => (isActive ? isActiveStyle : {})} to="0">{(current >= 3) ? 'В начало' : 1}</NavLink> : null}
        {current > 2 ? <NavLink style={({ isActive }) => (isActive ? isActiveStyle : {})} to={(current - 2).toString() || ''}>{current - 1}</NavLink> : null}
        {current > 1 ? <NavLink style={({ isActive }) => (isActive ? isActiveStyle : {})} to={(current - 1).toString() || ''}>{current - 0}</NavLink> : null}
        <NavLink style={({ isActive }) => (isActive ? isActiveStyle : {})} to={(+page!).toString() || ''}>{current + 1}</NavLink>
        {current < 29 ? <NavLink style={({ isActive }) => (isActive ? isActiveStyle : {})} to={(current + 1).toString() || ''}>{(current + 2)}</NavLink> : null}
        {current < 28 ? <NavLink style={({ isActive }) => (isActive ? isActiveStyle : {})} to={(current + 2).toString() || ''}>{(current + 3)}</NavLink> : null}
        {current < 27 ? <NavLink style={({ isActive }) => (isActive ? isActiveStyle : {})} to="29">{(current <= 26) ? 'В конец' : 30}</NavLink> : null}
      </div>
      <div className={styles.wordBlock}>
        {pageData.map((item) => (
          // eslint-disable-next-line react/jsx-props-no-spreading, no-console, no-underscore-dangle
          <WordCard key={item._id + new Date().getTime()} callback={() => console.log('')} id={item._id} reg="dict" />
        ))}
      </div>
    </div>
  )
}
