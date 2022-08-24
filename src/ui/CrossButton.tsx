import React from 'react'
import { Link } from 'react-router-dom'
import styles from './crossButton.module.css'

function CrossButton() {
  return (
    <Link to="/">
      <button
        type="button"
        className={styles.crossButtonContainer}
      >
        <svg className={styles.cross} focusable="false" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      </button>
    </Link>
  )
}
export default CrossButton
