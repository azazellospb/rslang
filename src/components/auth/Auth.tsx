import React from 'react'
import styles from './Auth.module.css'
import Signup from './Signup'

function Auth() {
  return (
    <div className={styles.container}>
      <Signup />
    </div>
  )
}

export default Auth
