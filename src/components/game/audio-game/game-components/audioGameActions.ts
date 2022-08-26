/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { IWord } from '../../../../types/models'
import { getWordForButtons, setCurrentWord } from '../../../redux/reducers/audioGameSlice'
import { AppDispatchState } from '../../../redux/store'

export const getRandomAudioWord = (gameData: IWord[]) => (dispatch: AppDispatchState) => {
  const currentWordIndex = Math.floor(Math.random() * gameData.length)
  dispatch(setCurrentWord(gameData[currentWordIndex]))
}
export const createArrForAnswerButton = (currentWord: IWord | null, gameData: IWord[]) => (dispatch: AppDispatchState) => {
  const arrForGameButtons = [currentWord]
  const filteredArr: IWord[] = gameData.filter((el) => el.id !== currentWord?.id)
  while (arrForGameButtons.length !== 5) {
    const currentWordIndex = Math.floor(Math.random() * filteredArr.length)
    arrForGameButtons.some((word) => word?.id === filteredArr[currentWordIndex].id)
      ? null
      : arrForGameButtons.push(filteredArr[currentWordIndex])
  }
  dispatch(getWordForButtons(arrForGameButtons))
}
