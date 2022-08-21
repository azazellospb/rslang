import { IWord } from '../../../types/models'
import { currentWord, forComparisonWord } from '../../redux/reducers/sprintGameSlice'
import { AppDispatchState } from '../../redux/store'

// eslint-disable-next-line import/prefer-default-export
export const getRandomWord = (gameData: IWord[]) => (dispatch: AppDispatchState) => {
  const randomObjIndex = Math.floor(Math.random() * gameData.length)
  const secondRandomObjIndex = Math.floor(Math.random() * gameData.length)
  dispatch(currentWord(gameData[randomObjIndex]))
  dispatch(forComparisonWord(gameData[secondRandomObjIndex]))
}
