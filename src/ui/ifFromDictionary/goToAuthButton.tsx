/* eslint-disable max-len */
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './IfFromDictionaryButton.module.css'

function GoToAuthButton() {
  return (
    <Link
      className={styles.goToAuth}
      to="/auth"
    >
      Регистрация
    </Link>

  )
}
export default GoToAuthButton
