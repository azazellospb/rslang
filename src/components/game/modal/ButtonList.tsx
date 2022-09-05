import React from 'react'
import GoToAuthButton from '../../../ui/ifFromDictionary/goToAuthButton'
import IfFromDictionaryButton from '../../../ui/ifFromDictionary/IfFromDictionaryButton'
import { useAppSelector } from '../../redux/hooks/redux'
import CategoryButton from './CategoryButton'
import styles from './GameModal.module.css'

function ButtonList() {
  const isFromDictionary = useAppSelector((state) => state.sprintGameSlice.isFromDictionary)
  const name = useAppSelector((state) => state.userReducer.name)
  const categoryArr = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
  return (
    <div className={`${styles.buttonList} ${isFromDictionary ? styles.center : styles.between}`}>
      {isFromDictionary && !name && <GoToAuthButton />}
      {name && isFromDictionary && <IfFromDictionaryButton />}
      {(!name || name) && !isFromDictionary && categoryArr.map((num, i) => (
        <CategoryButton key={num} id={String(i)} num={num} />
      ))}
    </div>
  )
}
export default ButtonList
