/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react'
import { getUnlearnedWordsForGamesAfterCurrentPage } from '../../../redux/fetching'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/redux'
import { isGetOffer } from '../../../redux/reducers/sprintGameSlice'
import { refreshGameParams } from '../../sprint-game/sprint-game-actions'
import styles from './offerModal.module.css'

function OfferModalButton() {
  const dispatch = useAppDispatch()
  const currentGroupPage = useAppSelector((state) => state.sprintGameSlice.currentGroupPage)
  const OfferModalButtonHandle = () => {
    dispatch(refreshGameParams())
    dispatch(isGetOffer(true))
    dispatch(getUnlearnedWordsForGamesAfterCurrentPage(currentGroupPage!))
  }

  return (
    <button
      className={styles.offerModalButton}
      type="button"
      onClick={OfferModalButtonHandle}
    >
      <span>
        Продолжить
      </span>
    </button>
  )
}
export default OfferModalButton
