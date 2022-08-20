import React, { useState } from 'react'
import styles from './Auth.module.css'

const URL = 'http://localhost:8088'
/* eslint-disable react/destructuring-assignment */
export default function Signin(props: { switchForm: (arg0: boolean) => void }) {
  const [username, setName] = useState('')
  const [usermail, setMail] = useState('')
  const [userpassw, setPass] = useState('')
  const [userInf, setUserInf] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setName('')
    setMail('')
    setPass('')
    setUserInf('')
    let statusRespone = 0
    try {
      const response = await fetch(`${URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: username,
          email: usermail,
          password: userpassw,
        }),
      })
      statusRespone = response.status

      if (statusRespone === 200) {
        setUserInf('Успех! Можете войти в учетную запись!')
      }
      if (statusRespone === 422) setUserInf('Введенные данные неверны!')
      if (statusRespone === 417) setUserInf('Пользователь с таким \'email\' существует')
      console.log(statusRespone)
    } catch (e) {
      setUserInf('Введенные данные неверны!')
    }
  }
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  function handleSwitch(e: any) {
    e.preventDefault()

    props.switchForm(true)
  }

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Регистрация</h2>
      <form className={styles.signup} onSubmit={handleSubmit}>
        {/* <div className="form-group">
          <input type="file" accept="image/*" id="avatar" />
        </div> */}
        <div className="form-group">
          <input
            type="text"
            id="username"
            placeholder="Введите имя..."
            autoComplete="off"
            onChange={(event) => setName(event.target.value)}
            value={username}
            required
          />
        </div>
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
            Войти
          </a>
          <button type="submit" className={styles.btn}>
            Регистрация
          </button>
        </div>
      </form>
      <p>{userInf}</p>
    </section>
  )
}
