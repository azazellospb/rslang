import React from 'react'
import {
  Routes,
  Route,
} from 'react-router-dom'
import Layout from './components/Layout'
import About from './pages/About'
import AudioChallenge from './pages/AudioChallenge'
import Dictionary from './pages/Dictionary'
import Home from './pages/Home'
import Page404 from './pages/Page404'
import SprintChallenge from './pages/SprintChallenge'
import Stats from './pages/Stats'

function App() {
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
      </Route>
    </Routes>
  )
}

export default App
