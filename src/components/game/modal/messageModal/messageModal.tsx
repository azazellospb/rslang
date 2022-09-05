import React from 'react'
import styles from './messageModal.module.css'

function MessageModal() {
  return (
    <div className={styles.messageModal}>
      <h3 className={styles.messageTitle}>Упс....!</h3>
      <div className={styles.messageInfoBlock}>
        Не сделано ни одного хода!
        Попробуйте пройти наше испытание ещё раз, что бы проверить ваши знания языка
      </div>
    </div>
  )
}
export default MessageModal
