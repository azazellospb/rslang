/* eslint-disable no-console */
import React from 'react'
import styles from './GameModal.module.css'

interface IProp {
  id: string,
  num: number
}
interface IFetchParam {
  textbookSection: string,
  page:number
}

function CategoryButton({ id, num }:IProp) {
  const choiceCategory = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const paramForFetch: IFetchParam = {
      textbookSection: id,
      page: Math.floor(Math.random() * 30),
    }
    console.log(id, e, paramForFetch)
  }
  return (
    <button
      id={String(id)}
      type="button"
      className={styles.categoryButton}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => choiceCategory(e)}
    >
      {num}
    </button>
  )
}
export default CategoryButton
