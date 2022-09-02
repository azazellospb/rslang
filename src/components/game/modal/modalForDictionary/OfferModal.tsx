import React from 'react'
import { useAppSelector } from '../../../redux/hooks/redux'
import OfferModalButton from './ButtonForMoreWords'
import styles from './offerModal.module.css'

function OfferModal() {
  const page = useAppSelector((state) => state.sprintGameSlice.currentGroupPage?.page)
  return (
    <div className={styles.littleModal}>
      <div className={styles.gameInfoBlock}>
        <h3 className={styles.modalTitle}>
          Поздравляем!
        </h3>
        <span className="game-promo">
          Вы изучили все слова
          {' '}
          {`${page === 0 ? `на странице ${page + 1}` : `с 1 страницы по ${page! + 1}`}`}
          {' '}
          если вы хотите продолжить игру со словами с других страниц, нажмите кнопк,
          либо вернитесь в учебник и продолжайте обучение постепено!
        </span>
      </div>
      <OfferModalButton />
    </div>
  )
}
export default OfferModal
