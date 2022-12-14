/* eslint-disable @typescript-eslint/semi */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Login.module.css'
import { clearUserMail, clearUserName, getUserName } from '../redux/reducers/userSlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks/redux'
import UserLogo from './UserLogo'
// import { refreshGameParams } from '../game/sprint-game/sprint-game-actions'

export default function LoginBlock() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const name = useAppSelector(getUserName)
  // const ref1 = useRef<HTMLButtonElement>(null)
  // const ref2 = useRef<HTMLDivElement>(null)
  const clearStorage = () => {
    localStorage.removeItem('userInfo')
    dispatch(clearUserName())
    dispatch(clearUserMail())
    navigate('/')
    document.location.reload()
  }
  // useEffect(() => {
  //   if (name) {
  //   const handleHover = () => {
  //     const dropDown = document.querySelector('#statsDrop') as HTMLElement
  //     dropDown.style.display = 'flex'
  //   }
  //   const handleOut = () => {
  //     const dropDown = document.querySelector('#statsDrop') as HTMLElement
  //     dropDown.style.display = 'none'
  //   }
  //   const handleClick = () => {
  //     const dropDown = document.querySelector('#statsDrop') as HTMLElement
  //     dropDown.style.display = 'none'
  //   }
  //   const element1 = ref1.current!
  //   const element2 = ref2.current!
  //   element1.addEventListener('mouseover', handleHover)
  //   element1.addEventListener('mouseout', handleOut)
  //   element2.addEventListener('click', handleClick)
  //   }
  // })

  if (name) {
    return (
      <div className={styles.login}>
        <UserLogo />
        {/* <img
          src={defaultPhoto}
          alt="user avatar"
          height="20"
          width="20"
          data-view-component="true"
        /> */}
        <span className={`${styles.userName}`}>{name}</span>
        {/* <button className={styles.name} type="button" ref={ref1}>
          <div id="statsDrop" className={`${styles.dropdownContent}`} ref={ref2}>
            <Link to="/stats">c??????????????????</Link>
            <Link to="/" onClick={clearStorage}>
              ??????????
            </Link>
          </div>
        </button> */}
        <button className={styles.logoutBtn} type="button" onClick={clearStorage}>
          {/* <Link to="/" /> */}
          {/* <LogoutIcon /> */}
        </button>
      </div>
    )
  }
  return (
    <div className={styles.login}>
      <Link to="/auth" style={{ lineHeight: '10px' }}>
        <span className={`${styles.loginBtn}`}> </span>
      </Link>
    </div>
  )
}
