import React, { useState } from 'react'

const URL = 'http://localhost:8088'

function Signup() {
  const [username, setName] = useState('')
  const [usermail, setMail] = useState('')
  const [userpassw, setPass] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setName('')
    setMail('')
    setPass('')

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

    if (response.status === 417) {
      // eslint-disable-next-line no-alert
      alert('User with this e-mail exists')
    }

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
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(userReg))
  }

  return (
    <section className="signup-wrapper">
      <h3 className="signup">Регистрация</h3>
      <form className="signup" onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="file" accept="image/*" id="avatar" />
        </div>
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
      <p>Сюда надо вставить</p>
    </section>
  )
}

export default Signup
// interface IUser {
//   name: string
//   email: string
//   password: string
// }
// interface ISigninUser {
//   errors: string[]
//   status: string
// }
