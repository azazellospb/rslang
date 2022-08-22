import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
// import { useDispatch } from 'react-redux'
import { setUserName } from '../redux/reducers/userSlice'
import styles from './Auth.module.css'
import Endpoints from '../../endpoints/endpoints'
import { useAppDispatch } from '../redux/hooks/redux'

/* eslint-disable react/destructuring-assignment */
export default function Signin(props: { switchForm: (arg0: boolean) => void }) {
  const [usermail, setMail] = useState('')
  const [userpassw, setPass] = useState('')
  const [userInf, setUserInf] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
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

      if (response.status === 200) {
        setUserInf('Вход выполнен успешно!')
        const userInfo = await response.json()
        // userInfo.name = userIn.name
        // take name and push to redux in User obj,
        // then in LoginBlock from User get name and if not null - render comp,
        // with help of useEffect check redux User state if () -> render event
        dispatch(setUserName(userInfo))
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        // move to user object name for proper communication with LoginBlock
      } else {
        setUserInf('Email или пароль неверны!')
      }
    } catch (e) {
      setUserInf('Email или пароль неверны!')
    }
    navigate('/')
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
