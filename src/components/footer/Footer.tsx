import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import AltLogo from './AltLogo'
import './footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container container">
        <div className="footer-item footer-logo">
          <a
            href="https://rs.school/js/"
            // className="footer-logo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AltLogo />
          </a>
        </div>
        <nav className="footer-item menu">
          <ul className="footer-menu nav-menu">
            <NavLink className="nav-menu-item" to="/">Главная</NavLink>
            <NavLink className="nav-menu-item" to="/dictionary/0/0">Учебник</NavLink>
            <NavLink className="nav-menu-item" to="/sprintchallenge">Игры</NavLink>
            <NavLink className="nav-menu-item" to="/stats">Статистика</NavLink>
            <NavLink className="nav-menu-item" to="/about">О команде</NavLink>
            {/* activeClassName="active-nav-link" */}
          </ul>
        </nav>
        <div className="footer-item">
          <h4 className="footer-title-dev list-dev-item">Разработчики:</h4>
          <ul className="footer-list-dev">
            <li className="list-dev-item">
              <a href="https://github.com/azazellospb" target="_blank" rel="noopener noreferrer">
                Антон Иванов
              </a>
            </li>
            <li className="list-dev-item">
              <a href="https://github.com/matvey84" target="_blank" rel="noopener noreferrer">
                Денис Матвеев
              </a>
            </li>
            <li className="list-dev-item">
              <a href="https://github.com/maks-1987" target="_blank" rel="noopener noreferrer">
                Максим Дуднев
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-item footer-date-team">
          <p className="footer-date">© 2022 RS Lang</p>
          <Link className="footer-about-link" to="/about">
            Developed by Dream Team
          </Link>
        </div>
      </div>
    </footer>
  )
}
