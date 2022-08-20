import React, { useState } from 'react'
import styles from './Auth.module.css'
import Endpoints from '../../endpoints/endpoints'

/* eslint-disable react/destructuring-assignment */
export default function Signin(props: { switchForm: (arg0: boolean) => void }) {
  const [usermail, setMail] = useState('')
  const [userpassw, setPass] = useState('')
  const [userInf, setUserInf] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setMail('')
    setPass('')
    setUserInf('')

    try {
      const response = await fetch(`${Endpoints.SIGNIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: usermail,
          password: userpassw,
        }),
      })
      // fetch(`${Endpoints.USERS}/`)
      const userIn = await response.json()
      localStorage.setItem('userInfo', JSON.stringify(userIn))

      if (response.status === 200) setUserInf('Вход выполнен успешно!')
    } catch (e) {
      // console.log(e.message)
      setUserInf('Email или пароль неверны!')
    }
  }

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  function handleSwitch(e: any) {
    e.preventDefault()

    props.switchForm(false)
  }

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Вход в аккаунт</h2>
      <form className={styles.signup} onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="usermail"
            placeholder="Email..."
            autoComplete="off"
            onChange={(event) => setMail(event.target.value)}
            value={usermail}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            placeholder="Пароль 8 - 12 знаков"
            value={userpassw}
            onChange={(event) => setPass(event.target.value)}
            required
          />
        </div>
        <div className={styles.btnContainer}>
          <a href="/" className={styles.btnSwitch} onClick={handleSwitch}>
            Регистрация
          </a>
          <button type="submit" className={styles.btn}>
            Войти
          </button>
        </div>
      </form>
      <p>{userInf}</p>
    </section>
  )
}
