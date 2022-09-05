/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable max-len */
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Home.module.css'

export default function Home() {
  return (
    <div className={styles.homePage}>
      <div className={styles.homePageContainer}>
        <h1 className={styles.homePageTitle}>О приложении</h1>
        <h2 className={styles.homePageSubtitle}>
          Достигайте большего вместе с
          {' '}
          <Link className={styles.homeLink} to="/About">командой RSLang.</Link>
        </h2>
        <h3 className={styles.secondPageSubtitle}>Мы поможем вам достичь ваших целей!</h3>
        <article className={styles.homePageAbout}>
          <h4 className={styles.articleTitle}>Актуально</h4>
          Хотите обогатить свой словарный запас английских слов? Тогда наше приложение для Вас!
          <br />
          Наш учебник включает в себя 3600 слов, необходимых для общения на английском языке. Слова разбиты на 6 разделов от Elementary (A1) до Proficiency (C2). Изучайте их, играя в наши игры.
        </article>
        <article className={styles.homePageAbout}>
          <h2 className={styles.articleTitle}>Продумано</h2>
          Для лучшего понимания и изучения слов можете использовать учебник, в котором с помощью интерактивных и
          удобных карточек можно вникнуть в смысл изучаемых слов. Каждая карточка слова сопровождается всей необходимой информацией для быстрого запоминания.
        </article>
        <article className={styles.homePageAbout}>
          <h4 className={styles.articleTitle}>И просто весело</h4>
          <span>
            Играя в наши игры Вы без труда выучите сотни английских слов: <br />
            Игра <Link className={styles.homeLink} to="/sprintchallenge">Спринт</Link> - узнайте сколько слов вы назовёте правильно, пока не истечёт время.<br />
            Игра <Link className={styles.homeLink} to="/audiochallenge">Аудиовызов</Link>{' - подготовит Вас к восприятию английской речи "на слух".'}<br /><br />
            Для доступа к полному функционалу приложения пройдите <Link className={styles.homeLink} to="/auth">регистрацию</Link>.
          </span>
        </article>
      </div>
    </div>
  )
}
