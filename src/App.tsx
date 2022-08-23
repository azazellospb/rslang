/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import {
  Routes,
  Route,
} from 'react-router-dom'
import Layout from './components/Layout'
import getWordsData from './components/redux/fetching'
import { useAppDispatch } from './components/redux/hooks/redux'
import About from './pages/About'
import AudioChallenge from './pages/AudioChallenge'
import Dictionary from './pages/Dictionary'
import Home from './pages/Home'
import Page404 from './pages/Page404'
import SprintChallenge from './pages/SprintChallenge'
import Stats from './pages/Stats'
import Auth from './pages/Auth'
import { setUserName } from './components/redux/reducers/userSlice'

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getWordsData())
  }, [dispatch])
  useEffect(() => {
    console.log('=====>')
    const data = JSON.parse(localStorage.getItem('userInfo') as string)?.name
    if (data) {
      console.log('+++', data)
      dispatch(setUserName(data))
    }
  })
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dictionary" element={<Dictionary />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/audiochallenge" element={<AudioChallenge />} />
        <Route path="/sprintchallenge" element={<SprintChallenge />} />
        <Route path="*" element={<Page404 />} />
        <Route path="/auth" element={<Auth />} />
      </Route>
    </Routes>
  )
}

export default App
