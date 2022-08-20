import React from 'react'
import ButtonList from './ButtonList'
import styles from './GameModal.module.css'

function FirstModalForGame() {
  return (
    <section className={styles.mainModal}>
      <div className={styles.littleModal}>
        <div className={styles.gameInfoBlock}>
          <h3 className={styles.modalTitle}>
            {/* // TODO: условие если чтото то рендерим блок с TEKSTOM #1 или TEKSTOM #1 */}
            Спринт
          </h3>
          <span className="game-promo">
            Tренирует навык быстрого перевода с английского языка на русский.
            Вам нужно выбрать соответствует ли перевод предложенному слову.
          </span>
        </div>
        {/* // TODO: условие если чтото то рендерим блок с кнопками или просто кнопку */}
        <ButtonList />
      </div>
    </section>
  )
}
export default FirstModalForGame
