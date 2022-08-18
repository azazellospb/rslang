import React, { useState } from 'react'
import styles from './Auth.module.css'

const URL = 'http://localhost:8088'

function Signup() {
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

    const resp = await fetch(`${URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: usermail,
        password: userpassw,
      }),
    })

    const userReg = await resp.json()
    localStorage.setItem('userInfo', JSON.stringify(userReg))

    if (response.status === 417) {
      setUserInf('User with this e-mail exists')
    } else {
      setUserInf(
        `Пользователь с 
        id: ${userReg.userId}\n
        успешно зарегистрирован!`,
      )
    }
  }

  return (
    <section className={styles.wrapper}>
      <h3 className={styles.title}>Регистрация</h3>
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
        <div className="form-group">
          <button type="submit" className="btn registration">
            Регистрация
          </button>
        </div>
      </form>
      <p>{userInf}</p>
    </section>
  )
}

export default Signup
