import React, { useState } from 'react'

function Signup() {
  const [value, setValue] = useState('')
  // const userMail = useState();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log('------form submitted-------')
  }

  return (
    <div className="signup-wrapper">
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
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </div>
        <div className="form-group">
          <input type="text" id="usermail" placeholder="Email..." />
        </div>
        <div className="form-group">
          <input type="password" id="password" placeholder="Пароль 8 - 12 знаков" />
        </div>
        {/* <div className="form-group"> */}
        <button type="submit" className="btn registration">
          Зарегистрироваться
        </button>
        {/* </div> */}
      </form>
    </div>
  )
}

export default Signup
