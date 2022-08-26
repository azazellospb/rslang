import React from 'react'
import { useAppSelector } from '../../../redux/hooks/redux'
import styles from '../Audiogame.module.css'

function ProgressBar() {
  const progress = useAppSelector((state) => state.audioGameSlice.progress)
  return (
    <div className={styles.counter}>{`${progress} / 20`}</div>
  )
}
export default ProgressBar
