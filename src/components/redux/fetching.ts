/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-cycle */
/* eslint-disable max-len */
/* eslint-disable no-console */
import { AppDispatchState } from './store'
import { fetchUserWords, fetchWordSuccess } from './reducers/wordSlice'
import { ICustomWord, IParams, IWord } from '../../types/models'
import { IFetchParam } from '../../types/sprint-game-models'
import {
  fetchWordForSprintGameError,
  fetchWordForSprintGameLoader,
  fetchWordForSprintGameSuccess,
} from './reducers/sprintGameSlice'
import { fetchAggregatedWords } from './reducers/aggregatedSlice'

const getWordsData = (
  page = 0,
  group = 0,
  data: IWord[] = [],
  id = '',
) => async (dispatch: AppDispatchState) => {
  try {
    // TODO: сделать лоадер
    if (!id.length) {
      if (data.filter((x) => (x.page === page) && (x.group === group)).length === 0) {
        const response: Response = await fetch(`http://localhost:8088/words?group=${group}&page=${page}`)
        const dataBE: IWord[] = await response.json()
        dispatch(fetchWordSuccess([...data, ...dataBE]))
      }
    } else {
      const response: Response = await fetch(`http://localhost:8088/words/${id}`)
      const word: IWord = await response.json()
      dispatch(fetchUserWords(word))
    }
  } catch (e) {
    console.log(e)
    // TODO: ОБОАБОТАТЬ ОШИБКУ
  }
}
export default getWordsData

export const getWordsDataForSprintGame = (paramForFetch: IFetchParam) => async (dispatch: AppDispatchState) => {
  const { textbookSection, page } = paramForFetch
  const url = 'http://localhost:8088/words'
  try {
    dispatch(fetchWordForSprintGameLoader())
    const response: Response = await fetch(`${url}/?group=${textbookSection}&page=${page}`)
    const data: IWord[] = await response.json()
    console.log(data)
    dispatch(fetchWordForSprintGameSuccess(data))
  } catch (e: string | unknown) {
    dispatch(fetchWordForSprintGameError('Something went wrong...'))
  }
}
export const postPutWordsToServerFromGame = (params: IParams) => async (dispatch: AppDispatchState) => {
  // const url = 'http://localhost:8088/users/'
  const userInfo = localStorage.getItem('userInfo') as string
  const { token, userId } = JSON.parse(userInfo)
  const obj = {
    difficulty: params.difficulty,
    optional: params.optional,
  }
  try {
    await fetch(
      `http://localhost:8088/users/${userId}/words/${params.wordId}`,
      {
        method: params.method,
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(obj),
      },
    )
  } catch (e: string | unknown) {
    dispatch(fetchWordForSprintGameError('Something went wrong...'))
  }
}

export const aggregateWords = () => async (dispatch: AppDispatchState) => {
  try {
    // const filterCond = '"$or":[{"userWord.difficulty":"hard"}, {"userWord.difficulty":"easy"}]'
    const userInfo = localStorage.getItem('userInfo') as string
    const { token, userId } = JSON.parse(userInfo)
    const request = await fetch(
      `http://localhost:8088/users/${userId}/words`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    const data: ICustomWord[] = await request.json()

    dispatch(fetchAggregatedWords(data))
  } catch (e) {
    console.log(e)
    // TODO: ОБОАБОТАТЬ ОШИБКУ
  }
}
// Здесь можно посмотреть пример POST PUT логики для записи слова
export const toggleDifficulty = (
  isDifficult: boolean,
  wordId: IWord['id'],
  aggregatedWords: ICustomWord[],
) => async (dispatch: AppDispatchState) => {
  try {
    const difficultyState = isDifficult ? { difficulty: 'easy' } : { difficulty: 'hard' }
    const userInfo = localStorage.getItem('userInfo') as string
    const { token, userId } = JSON.parse(userInfo)
    const isAggregated = !!aggregatedWords.find((item) => item.wordId === wordId)
    let userWordProp = {}
    const requestBody = { optional: {} }
    if (isAggregated) {
      userWordProp = aggregatedWords.find((item) => item.wordId === wordId)!
      const oldState = { ...userWordProp }
      userWordProp = Object.assign(oldState, difficultyState)
    } else {
      userWordProp = Object.assign(requestBody, difficultyState)
    }
    const method = isAggregated ? 'PUT' : 'POST'
    await fetch(
      `http://localhost:8088/users/${userId}/words/${wordId}`,
      {
        method,
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(difficultyState),
      },
    )
    dispatch(aggregateWords())
  } catch (e) {
    console.log(e)
  }
}
export const toggleLearnState = (
  isLearned: boolean | undefined,
  wordId: IWord['id'] | undefined,
  aggregatedWords: ICustomWord[],
) => async (dispatch: AppDispatchState) => {
  try {
    const learnState = isLearned ? { learned: false, rightCounter: 0 } : { learned: true, rightCounter: 2 }
    const userInfo = localStorage.getItem('userInfo') as string
    const { token, userId } = JSON.parse(userInfo)
    const isAggregated = !!aggregatedWords.find((item) => item.wordId === wordId)
    const requestBody = { difficulty: 'easy', optional: {} }
    if (isAggregated) {
      const wordOptions = { ...aggregatedWords.find((item) => item.wordId === wordId)?.optional }
      const optionalObj = Object.assign(wordOptions!, learnState)
      const { difficulty } = aggregatedWords.find((item) => item.wordId === wordId)!
      requestBody.difficulty = difficulty!
      requestBody.optional = optionalObj
    } else {
      requestBody.optional = learnState
    }
    const method = isAggregated ? 'PUT' : 'POST'
    await fetch(
      `http://localhost:8088/users/${userId}/words/${wordId}`,
      {
        method,
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      },
    )
    console.log(dispatch)
    // dispatch(aggregateWords())
  } catch (e) {
    console.log(e)
  }
}
