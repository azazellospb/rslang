/* eslint-disable object-curly-newline */
/* eslint-disable  @typescript-eslint/semi */
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks/redux'
import styles from './Auth.module.css'
import Endpoints from '../../endpoints/endpoints'
import { clearUserPassw, setUserMail, setUserName, setUserPassw } from '../redux/reducers/userSlice'

/* eslint-disable react/destructuring-assignment */
export default function Signin(props: { switchForm: (arg0: boolean) => void }) {
  const [username, setName] = useState('')
  const [usermail, setMail] = useState('')
  const [userpassw, setPass] = useState('')
  const [userInf, setUserInf] = useState('')
  const [statusRespone, setStatusRespone] = useState(0)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { email, password } = useAppSelector((state) => state.userReducer)
  const userInfo = { email: '', password: '', name: '' }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    setName('')
    setMail('')
    setPass('')
    setUserInf('')
    try {
      const response = await fetch(`${Endpoints.USERS}`, {
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
      const data = await response.json()
      userInfo.email = usermail
      userInfo.password = userpassw
      userInfo.name = username
      localStorage.setItem('userName', userInfo.name)

      if (response.status === 200) {
        setStatusRespone(response.status)
        dispatch(setUserMail(userInfo))
        dispatch(setUserPassw(userInfo))
      } else {
        setUserInf(data.error.errors[0].message)
      }
    } catch (e) {
      setUserInf('Введенные данные неверны!')
    }
  }
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  function handleSwitch(e: any) {
    e.preventDefault()
    props.switchForm(true)
  }

  async function handleLoginUser(e: React.FormEvent) {
    e.preventDefault()

    const data = await fetch(`${Endpoints.SIGNIN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    const userData = await data.json()
    localStorage.setItem('userInfo', JSON.stringify(userData))
    userInfo.name = localStorage.getItem('userName') as string
    dispatch(setUserName(userInfo.name))
    dispatch(clearUserPassw())
    navigate('/')
    localStorage.removeItem('userName')
  }
  return (
    /* eslint-disable react/jsx-no-useless-fragment */
    /* eslint-disable jsx-a11y/label-has-associated-control */
    <>
      {statusRespone !== 200 ? (
        <section className={styles.wrapper}>
          <h2 className={styles.title}>Регистрация</h2>
          <form className={styles.signup} onSubmit={handleSubmit}>
            {/* <div className="form-group">
          <input type="file" accept="image/*" id="avatar" />
        </div> */}
            <div className="form-group">
              <label htmlFor="username">Name</label>
              <input
                type="text"
                id="username"
                autoComplete="off"
                onChange={(event) => setName(event.target.value)}
                value={username}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="usermail">Email</label>
              <input
                type="text"
                id="usermail"
                autoComplete="off"
                onChange={(event) => setMail(event.target.value)}
                value={usermail}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
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
                Зарегистрироваться
              </button>
            </div>
          </form>
          <p>{userInf}</p>
        </section>
      ) : (
        <div className={styles.wrapper_msg}>
          <p>Вы зарегистрированы.</p>
          <p>Можете войти в приложение.</p>
          <p>
            <a href="/" onClick={handleLoginUser} className={styles.confirm_btn}>
              Войти
            </a>
          </p>
        </div>
      )}
    </>
  )
}
