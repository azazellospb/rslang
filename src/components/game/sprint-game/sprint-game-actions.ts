/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/rules-of-hooks */
import { IWord } from '../../../types/models'
import { IFetchParam, IStudiedWord } from '../../../types/sprint-game-models'
import { getWordsDataForSprintGame } from '../../redux/fetching'
import {
  currentWord, forComparisonWord, gameScore, studiedWord,
} from '../../redux/reducers/sprintGameSlice'
import { AppDispatchState } from '../../redux/store'

// eslint-disable-next-line import/prefer-default-export
export const getRandomWord = (gameData: IWord[], counter:number) => (dispatch: AppDispatchState) => {
  const randomObjIndex = Math.floor(Math.random() * gameData.length)
  const secondRandomObjIndex = counter % 2 === 0 ? randomObjIndex : Math.floor(Math.random() * gameData.length)
  dispatch(currentWord(gameData[randomObjIndex]))
  dispatch(forComparisonWord(gameData[secondRandomObjIndex]))
}
export const createStudiedWordAndPutItToArr = (currentWord: IWord | null | undefined, examination: boolean) => (dispatch: AppDispatchState) => {
  const examsWord: IStudiedWord = {
    ...currentWord,
    learned: examination,
  }
  examination && dispatch(gameScore(10))
  dispatch(studiedWord(examsWord))
}

export const choiceCategory = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => (dispatch: AppDispatchState) => {
  const paramForFetch: IFetchParam = {
    textbookSection: (e.target as HTMLButtonElement).id,
    page: Math.floor(Math.random() * 30),
  }
  dispatch(getWordsDataForSprintGame(paramForFetch))
}
