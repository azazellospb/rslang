/* eslint-disable no-template-curly-in-string */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import getWordsData from '../redux/fetching'
import { useAppDispatch } from '../redux/hooks/redux'
import { getWordsArray } from '../redux/reducers/wordSlice'
// import WordCard from './WordCard'
import styles from './WordsBunch.module.css'

export default function WordsBunch() {
  const { group = 0, page = 0 } = useParams()
  // eslint-disable-next-line no-console
  const dispatch = useAppDispatch()
  const data = useSelector(getWordsArray)
  const pageData = useSelector(getWordsArray)
    .filter((x) => (x.page === +page) && (x.group === +group))
  useEffect(() => {
    dispatch(getWordsData(+page, +group, data))
  }, [dispatch, group, page, data])

  const current = Number(page!)

  return (
    <div className={styles.wordBlock}>
      {current !== 0 ? <NavLink to="0"><li>В начало</li></NavLink> : null}
      {current > 2 ? <NavLink to={(current - 2).toString() || ''}><li>{'<<'}</li></NavLink> : null}
      {current > 1 ? <NavLink to={(current - 1).toString() || ''}><li>{'<'}</li></NavLink> : null}
      <NavLink to={(+page!).toString() || ''}><li>{current + 1}</li></NavLink>
      {current < 29 ? <NavLink to={(current + 1).toString() || ''}><li>{'>'}</li></NavLink> : null}
      {current < 28 ? <NavLink to={(current + 2).toString() || ''}><li>{'>>'}</li></NavLink> : null}
      {current !== 29 ? <NavLink to="29"><li>В конец</li></NavLink> : null}
      {/* {pageData.map((item) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <WordCard {...item} />
      ))} */}
    </div>
  )
}
