import React from 'react'
import { IDescription } from '../../../types/sprint-game-models'
import CrossButton from '../../../ui/CrossButton'
import ButtonList from './ButtonList'
import styles from './GameModal.module.css'

interface IPropModal {
  obj: IDescription
}
function FirstModalForGame(props : IPropModal) {
  const { obj } = props
  return (
    <section className={styles.mainModal}>
      <CrossButton />
      <div className={styles.littleModal}>
        <div className={styles.gameInfoBlock}>
          <h3 className={styles.modalTitle}>
            { obj.title }
          </h3>
          <span className="game-promo">
            {obj.description}
          </span>
        </div>
        <ButtonList />
      </div>
    </section>
  )
}
export default FirstModalForGame
