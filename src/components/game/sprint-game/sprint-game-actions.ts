/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/rules-of-hooks */
import { IWord } from '../../../types/models'
import { IStudiedWord } from '../../../types/sprint-game-models'
import { currentWord, forComparisonWord, studiedWord } from '../../redux/reducers/sprintGameSlice'
import { AppDispatchState } from '../../redux/store'

// eslint-disable-next-line import/prefer-default-export
export const getRandomWord = (gameData: IWord[]) => (dispatch: AppDispatchState) => {
  const randomObjIndex = Math.floor(Math.random() * gameData.length)
  const secondRandomObjIndex = Math.floor(Math.random() * gameData.length)
  dispatch(currentWord(gameData[randomObjIndex]))
  dispatch(forComparisonWord(gameData[secondRandomObjIndex]))
}
export const createStudiedWordAndPutItToArr = (currentWord: IWord | null | undefined, examination: boolean) => (dispatch: AppDispatchState) => {
  const examsWord: IStudiedWord = {
    ...currentWord,
    studied: examination,
  }
  dispatch(studiedWord(examsWord))
}
