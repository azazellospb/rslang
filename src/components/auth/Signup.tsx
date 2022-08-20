import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks/redux'
import styles from './Auth.module.css'
import Endpoints from '../../endpoints/endpoints'
import { userSlice } from '../redux/reducers/UserSlice'
import { IUserLogin } from '../../types/models'
// import { userSlice } from '../redux/reducers/UserSlice'

/* eslint-disable react/destructuring-assignment */
export default function Signin(props: { switchForm: (arg0: boolean) => void }) {
  const [username, setName] = useState('')
  const [usermail, setMail] = useState('')
  const [userpassw, setPass] = useState('')
  const [userInf, setUserInf] = useState('')
  const [statusRespone, setStatusRespone] = useState(0)

  const dispatch = useAppDispatch()
  const { fetchLoginUser } = userSlice.actions
  const { user } = useAppSelector((state) => state.userLoginReducer)

  // const { fetchLoginUser } = userSlice.actions
  // console.log(fetchLoginUser('new'))
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    console.log('state: ', user)
    // console.log('state: ', password)
    console.log(fetchLoginUser)
    console.log(dispatch)
    setName('')
    setMail('')
    setPass('')
    setUserInf('')
    // let statusRespone = 0
    try {
      // dispatch(fetchLoginUser())
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
      const data: IUserLogin = await response.json()
      console.log('data: ', data)

      if (response.status === 200) {
        setUserInf('Успешная регистрация!')
        setStatusRespone(response.status)
        console.log(setStatusRespone)
        dispatch(fetchLoginUser(data))
      }
      if (response.status === 422) setUserInf('Введенные данные неверны!')
      if (response.status === 417) setUserInf("Пользователь с таким 'email' существует")

      // TODO: Cохранить mail & passw в Redux
    } catch (e) {
      setUserInf('Введенные данные неверны!')
    }
    // return statusRespone
  }
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  function handleSwitch(e: any) {
    e.preventDefault()

    props.switchForm(true)
  }

  async function handleLoginUser(e: { preventDefault: () => void }) {
    e.preventDefault()

    // const response =
    // await fetch(`${Endpoints.SIGNIN}`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     email: usermail,
    //     password: userpassw,
    //   }),
    // })
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
      {statusRespone === 200 && (
        <a href="/" onClick={handleLoginUser}>
          Можете войти в учетную запись!
        </a>
      )}
    </section>
  )
}
