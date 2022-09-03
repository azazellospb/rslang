import React from 'react'
import IfFromDictionaryButton from '../../../ui/ifFromDictionary/IfFromDictionaryButton'
import { useAppSelector } from '../../redux/hooks/redux'
import CategoryButton from './CategoryButton'
import styles from './GameModal.module.css'

function ButtonList() {
  const isFromDictionary = useAppSelector((state) => state.sprintGameSlice.isFromDictionary)
  const categoryArr = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
  return (
    <div className={`${styles.buttonList} ${isFromDictionary ? styles.center : styles.between}`}>
      {isFromDictionary && <IfFromDictionaryButton />}
      {!isFromDictionary && categoryArr.map((num, i) => (
        <CategoryButton key={num} id={String(i)} num={num} />
      ))}
    </div>
  )
}
export default ButtonList
