import React from 'react'
import CategoryButton from './CategoryButton'
import styles from './GameModal.module.css'

function ButtonList() {
  const categoryArr = [1, 2, 3, 4, 5, 6]
  return (
    <div className={styles.buttonList}>
      {categoryArr.map((num, i) => (
        <CategoryButton key={num} id={String(i)} num={num} />
      ))}
    </div>
  )
}
export default ButtonList
