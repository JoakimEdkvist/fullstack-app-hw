import { useState } from 'react'
import { BrowserRouter as Router, NavLink } from 'react-router-dom'
import '../styles/NavBar.css'
import bg from '../assets/images/hamster-logo.png'

const NavBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  function handleBurgerClick() {
    setIsOpen(!isOpen)
  }
  return (
    <div className="Navbar">
      <nav>
        <section className="logo">
          <img src={bg} alt="logo" />
          <p>hamster wars</p>
        </section>

        {isOpen ? (
          <ul className="regular-menu">
            <li>
              <NavLink to="/"> Start </NavLink>
            </li>
            <li>
              <NavLink to="/competing"> Tävla </NavLink>
            </li>
            <li>
              <NavLink to="/gallery"> Galleri </NavLink>
            </li>
            <li>
              <NavLink to="/statistics"> Statistik </NavLink>
            </li>
            <li>
              <NavLink to="/history"> Historik </NavLink>
            </li>
          </ul>
        ) : null}
        {isOpen ? (
          <ul className="burger-menu">
            <li>
              <NavLink to="/"> Start </NavLink>
            </li>
            <li>
              <NavLink to="/competing"> Tävla </NavLink>
            </li>
            <li>
              <NavLink to="/gallery"> Galleri </NavLink>
            </li>
            <li>
              <NavLink to="/statistics"> Statistik </NavLink>
            </li>
            <li>
              <NavLink to="/history"> Historik </NavLink>
            </li>
          </ul>
        ) : null}
        <div onClick={handleBurgerClick} className="burger">
          <span className={`bar line1 ${isOpen ? 'first' : null}`}></span>
          <span className={`bar line2 ${isOpen ? 'hide' : null}`}></span>
          <span className={`bar line3 ${isOpen ? 'third' : null}`}></span>
        </div>
      </nav>
    </div>
  )
}

export default NavBar
