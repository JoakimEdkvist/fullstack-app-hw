import { useState } from 'react'
import './styles/App.css'
import {
  BrowserRouter as Router,
  NavLink,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import Gallery from './components/Gallery'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Compete from './components/Compete'
import Statistics from './components/Statistics'
import History from './components/History'

function App() {
  return (
    <div className="App">
      <NavBar />
      <main>
        <Routes>
          // mer specifika paths högre upp
          <Route path="/gallery" element={<Gallery />}></Route>
          <Route path="/competing" element={<Compete />}></Route>
          <Route path="/statistics" element={<Statistics />}></Route>
          <Route path="/history" element={<History />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/*" element={<Home />}></Route>
        </Routes>
      </main>
    </div>
  )
}

export default App
