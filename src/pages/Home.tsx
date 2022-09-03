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
          Достигайте лучших возможных результатов в месте с
          {' '}
          <Link className={styles.homeLink} to="/About">командой RSLang.</Link>
        </h2>
        <h3 className={styles.secondPageSubtitle}>Мы поможем вам достичь вашей цели!</h3>
        <article className={styles.homePageAbout}>
          <h4 className={styles.articleTitle}>Мотивация.</h4>
          На нашем сайте можно изучить 3600 английских слов, которые в свою очередь разделены на 6 разделов,
          что поможет изучать слова постепенно от уровня к уровню.
          Наше приложение поможет как начать изучение английского языка с нуля, так и выявить пробелы в знаниях
          с помощью тестов на более высоких уровнях.
        </article>
        <article className={styles.homePageAbout}>
          <h2 className={styles.articleTitle}>Средства.</h2>
          Для лучшего понимания и изучения слов можете использовать учебник, в котором с помощь интерактивных и
          удобных карточек, можно вникнуть в смысл изучаемых слов. Это возможно благодаря семантическому объяснению на
          русском и английском языке.
        </article>
        <article className={styles.homePageAbout}>
          <h4 className={styles.articleTitle}>Развлечение.</h4>
          <span>
            А если изучать слова учебника будет скучно - воспользуйтесь играми созданными
            специально для этих целей. Выбирайте игры в меню навигации и будут доступны все 3600 слов в зависимости от их сложности. А если выбирать
            игры из учебника - станут доступны слова той страницы на которой находишься. Если же
            все слова на странице учебника изучены - игра предложит тебе изучить слова с других страниц выбранного уровня сложности.{' '}
            <Link className={styles.homeLink} to="/sprintchallenge">СПРИНТ</Link> - для быстрого запоминания и изучения слов, в вашем распоряжении 60 секундю.{' '}
            <Link className={styles.homeLink} to="/audiochallenge">АУДИОВЫЗОВ</Link> - здесь можно проверить на сколько хорошо воспринимается английская речь на слух.
            Для получения наибольшей функциональности пройдите <Link className={styles.homeLink} to="/auth">регистрацию</Link>.
            Получите возможность отслеживать прогресс изучения на странице статистики для вашей учетной записи, где можно получить подробную информацию как за день, так и более
            длительный периодо.
          </span>
        </article>
      </div>
    </div>
  )
}
