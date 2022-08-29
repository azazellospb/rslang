/* eslint-disable no-trailing-spaces */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/rules-of-hooks */
import { ICustomWord, IParams, IWord } from '../../../types/models'
import { IFetchParam, IStudiedWord } from '../../../types/sprint-game-models'
import { aggregateWords, getWordsDataForSprintGame, postPutWordsToServerFromGame } from '../../redux/fetching'
import {
  currentWord, forComparisonWord, gameScore, studiedWord,
} from '../../redux/reducers/sprintGameSlice'
import { AppDispatchState } from '../../redux/store'

// eslint-disable-next-line import/prefer-default-export
export const getRandomWord = (gameData: IWord[], counter:number) => (dispatch: AppDispatchState) => {
  const randomObjIndex = Math.floor(Math.random() * gameData.length)
  const secondRandomObjIndex = counter % 2 === 0 ? randomObjIndex : Math.floor(Math.random() * gameData.length)
  const userInfo = JSON.parse(localStorage.getItem('userInfo')!)
  dispatch(currentWord(gameData[randomObjIndex]))
  dispatch(forComparisonWord(gameData[secondRandomObjIndex]))
  userInfo && dispatch(aggregateWords())
}
export const createStudiedWordAndPutItToArr = (currentWord: IWord | null | undefined, examination: boolean) => (dispatch: AppDispatchState) => {
  const examsWord: IStudiedWord = {
    ...currentWord,
    learned: examination,
  }
  examination && dispatch(gameScore(10))
  dispatch(studiedWord(examsWord))
}

export const createObjectForPostOrPutItToUserAggregatedWords = (currentWord: IWord | null | undefined, examination: boolean, aggregatedWordArr: ICustomWord[]) => (dispatch: AppDispatchState) => {
  const isAggregated = aggregatedWordArr.some((item) => item.wordId === currentWord?.id)
  const isWord = aggregatedWordArr.find((item) => item.wordId === currentWord?.id)
  
  if (isAggregated) {
    const params: IParams = {
      method: 'PUT',
      difficulty: 'easy',
      wordId: currentWord?.id,
      optional: {
        learned: examination,
        rightCounter: examination ? Number(isWord?.optional?.rightCounter) + 1 : Number(isWord?.optional?.rightCounter),
        wrongCounter: !examination ? Number(isWord?.optional?.wrongCounter) + 1 : Number(isWord?.optional?.wrongCounter),
      },
    }
    console.log(params.optional)
    dispatch(postPutWordsToServerFromGame(params))
  } else {
    const params: IParams = {
      method: 'POST',
      difficulty: 'easy',
      wordId: currentWord?.id,
      optional: {
        learned: examination,
        rightCounter: examination ? 1 : undefined,
        wrongCounter: !examination ? 1 : undefined,
      },
    }
    console.log(params.optional)
    dispatch(postPutWordsToServerFromGame(params))
  }
}

export const choiceCategory = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => (dispatch: AppDispatchState) => {
  const paramForFetch: IFetchParam = {
    textbookSection: (e.target as HTMLButtonElement).id,
    page: Math.floor(Math.random() * 30),
  }
  dispatch(getWordsDataForSprintGame(paramForFetch))
}

// export const filteredGameData = (gameData: IWord[], aggregatedData: ICustomWord[]) => (dispatch: AppDispatchState) => {
//   const aggregatedLearnedDataWords = aggregatedData.filter((item, i) => item.optional?.learned === true)
//   const notLearnedWords = gameData.filter((word) => word.id !== aggregatedLearnedDataWords.find((item) => item.wordId === word.id)?.wordId)
//   dispatch(fetchWordForSprintGameSuccess(notLearnedWords))
//   // dispatch(allLearnedOnPage(true))
//   // !notLearnedWords.length && dispatch(allLearnedOnPage(true))
//   // !notLearnedWords.length && dispatch(timerWork(0))
// }
