/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import {
  Routes,
  Route,
} from 'react-router-dom'
import Layout from './components/Layout'
import getWordsData, { aggregateWords } from './components/redux/fetching'
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
import Userwords from './pages/UserWords'

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getWordsData())
  }, [dispatch])
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userInfo') as string)?.name
    if (data) {
      dispatch(setUserName(data))
      dispatch(aggregateWords())
    }
  })
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dictionary/">
          <Route index element={<Dictionary />} />
          <Route path="difficult" element={<Userwords />} />
          <Route path=":group" element={<Dictionary />}>
            <Route path=":page" element={<Dictionary />} />
          </Route>
        </Route>
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
