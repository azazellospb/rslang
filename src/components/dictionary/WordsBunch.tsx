import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import { IUnlearnedWord, IWord } from '../../types/models'
import getWordsData, { getDictPageWords } from '../redux/fetching'
import { useAppDispatch, useAppSelector } from '../redux/hooks/redux'
import { dictPageWords, userSearchWord } from '../redux/reducers/aggregatedSlice'
import SearchBlock from '../search/searchBlock'
import { getWordsArray } from '../redux/reducers/wordSlice'
import WordCard from './WordCard'
import WordCardUnreg from './WordCardUnreg'
import styles from './WordsBunch.module.css'

export default function WordsBunch() {
  const { group = 0, page = 0 } = useParams()
  const isActiveStyle = {
    color: '#0058C9',
  }

  const dispatch = useAppDispatch()
  const isLogged = !!localStorage.userInfo
  const currentCategory = +useLocation().pathname.split('/')[2]
  const [, setState] = useState(true)
  useEffect(() => {
    if (isLogged) dispatch(getDictPageWords(+page, +group))
    else dispatch(getWordsData(+page, +group))
    dispatch(userSearchWord([]))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, group, page])
  const pageData1 = useAppSelector(dictPageWords) as IUnlearnedWord[]
  const pageData2 = useAppSelector(getWordsArray) as IWord[]
  const isAllLearned = !!(pageData1
    .filter((word) => word.userWord?.optional?.learned !== true).length === 0)
  const isAllHard = !!(pageData1
    .filter((word) => word.userWord?.difficulty !== 'hard').length === 0)
  const current = Number(page!)
  return (
    <div className={styles.userDictionary}>
      <div className={`${(isAllLearned || isAllHard) && styles.positioning} ${styles.bunchHeader}`}>
        <div>
          <div className={`${isAllLearned && isLogged && styles.showLearned} ${styles.statusTag}`}>Эти слова изучены</div>
          <div className={`${isAllHard && isLogged && styles.showHard} ${styles.statusTag}`}>Эти слова сложные</div>
        </div>
        {(currentCategory === 0) && <div className={styles.catTitle}>Beginner (A1)</div>}
        {(currentCategory === 1) && <div className={styles.catTitle}>Elementary (A2)</div>}
        {(currentCategory === 2) && <div className={styles.catTitle}>Intermediate (B1)</div>}
        {(currentCategory === 3)
          && (<div className={styles.catTitle}>Upper-intermediate (B2)</div>)}
        {(currentCategory === 4) && <div className={styles.catTitle}>Advanced (C1)</div>}
        {(currentCategory === 5) && <div className={styles.catTitle}>Proficiency (C2)</div>}
        {isLogged ? <SearchBlock callback={setState} /> : <div className={styles.block} />}
      </div>
      <div className={styles.pagination}>
        {current !== 0 ? <NavLink style={({ isActive }) => (isActive ? isActiveStyle : {})} to="0">{(current >= 3) ? 'В начало' : 1}</NavLink> : null}
        {current > 2 ? <NavLink style={({ isActive }) => (isActive ? isActiveStyle : {})} to={(current - 2).toString() || ''}>{current - 1}</NavLink> : null}
        {current > 1 ? <NavLink style={({ isActive }) => (isActive ? isActiveStyle : {})} to={(current - 1).toString() || ''}>{current - 0}</NavLink> : null}
        <NavLink style={({ isActive }) => (isActive ? isActiveStyle : {})} to={(+page!).toString() || ''}>{current + 1}</NavLink>
        {current < 29 ? <NavLink style={({ isActive }) => (isActive ? isActiveStyle : {})} to={(current + 1).toString() || ''}>{(current + 2)}</NavLink> : null}
        {current < 28 ? <NavLink style={({ isActive }) => (isActive ? isActiveStyle : {})} to={(current + 2).toString() || ''}>{(current + 3)}</NavLink> : null}
        {current < 27 ? <NavLink style={({ isActive }) => (isActive ? isActiveStyle : {})} to="29">{(current <= 26) ? 'В конец' : 30}</NavLink> : null}
      </div>
      <div className={`${styles.wordBlock} ${styles.toCenter}`}>
        {isLogged && pageData1.map((item) => (
        // eslint-disable-next-line react/jsx-props-no-spreading, no-console, no-underscore-dangle
          <WordCard key={Math.random()} callback={() => console.log('')} id={item._id} reg="dict" />
        ))}
        {!isLogged && pageData2.map((item) => (
        // eslint-disable-next-line react/jsx-props-no-spreading, no-console, no-underscore-dangle
          <WordCardUnreg key={Math.random()} id={item.id} />
        ))}
      </div>
      <div className={`${styles.pagination} ${styles.paginationBottom}`}>
        {current !== 0 ? <NavLink style={({ isActive }) => (isActive ? isActiveStyle : {})} to="0">{(current >= 3) ? 'В начало' : 1}</NavLink> : null}
        {current > 2 ? <NavLink style={({ isActive }) => (isActive ? isActiveStyle : {})} to={(current - 2).toString() || ''}>{current - 1}</NavLink> : null}
        {current > 1 ? <NavLink style={({ isActive }) => (isActive ? isActiveStyle : {})} to={(current - 1).toString() || ''}>{current - 0}</NavLink> : null}
        <NavLink style={({ isActive }) => (isActive ? isActiveStyle : {})} to={(+page!).toString() || ''}>{current + 1}</NavLink>
        {current < 29 ? <NavLink style={({ isActive }) => (isActive ? isActiveStyle : {})} to={(current + 1).toString() || ''}>{(current + 2)}</NavLink> : null}
        {current < 28 ? <NavLink style={({ isActive }) => (isActive ? isActiveStyle : {})} to={(current + 2).toString() || ''}>{(current + 3)}</NavLink> : null}
        {current < 27 ? <NavLink style={({ isActive }) => (isActive ? isActiveStyle : {})} to="29">{(current <= 26) ? 'В конец' : 30}</NavLink> : null}
      </div>
    </div>
  )
}
