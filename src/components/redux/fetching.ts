/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-cycle */
/* eslint-disable max-len */
/* eslint-disable no-console */
import { useSelector } from 'react-redux'
import { AppDispatchState } from './store'
import { fetchWordSuccess } from './reducers/wordSlice'
import { IWord, IAggregatedWords, IUserWord } from '../../types/models'
import { IFetchParam } from '../../types/sprint-game-models'
import {
  fetchWordForSprintGameError,
  fetchWordForSprintGameLoader,
  fetchWordForSprintGameSuccess,
} from './reducers/sprintGameSlice'
import { fetchAggregatedWords, getAggregatedWords } from './reducers/aggregatedSlice'

const getWordsData = (
  page = 0,
  group = 0,
  data: IWord[] = [],
  id = null,
) => async (dispatch: AppDispatchState) => {
  try {
    // TODO: сделать лоадер
    if (!id) {
      if (data.filter((x) => (x.page === page) && (x.group === group)).length === 0) {
        const response: Response = await fetch(`http://localhost:8088/words?group=${group}&page=${page}`)
        const dataBE: IWord[] = await response.json()
        dispatch(fetchWordSuccess([...data, ...dataBE]))
      }
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
    dispatch(fetchWordForSprintGameSuccess(data))
  } catch (e: string | unknown) {
    dispatch(fetchWordForSprintGameError('Something went wrong...'))
  }
}

export const aggregateWords = (
  group = '',
  page = '',
) => async (dispatch: AppDispatchState) => {
  try {
    const filterCond = '"$or":[{"userWord.difficulty":"hard"}, {"userWord.optional.learned":true}]'
    const userInfo = localStorage.getItem('userInfo') as string
    const { token, userId } = JSON.parse(userInfo)
    // TODO: сделать лоадер
    const request = await fetch(
      `http://localhost:8088/users/${userId}/aggregatedWords?group=${group}&page=${page}&filter={${filterCond}}`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    const data: IAggregatedWords[] = await request.json()
    const result = data[0].paginatedResults

    dispatch(fetchAggregatedWords(result))
  } catch (e) {
    console.log(e)
    // TODO: ОБОАБОТАТЬ ОШИБКУ
  }
}
// Здесь можно посмотреть пример POST PUT логики для записи слова
export const toggleDifficulty = (
  isDifficult: boolean,
  wordId: IWord['id'],
) => async (dispatch: AppDispatchState) => {
  try {
    const requestBody = isDifficult ? { difficulty: 'easy' } : { difficulty: 'hard' }
    const userInfo = localStorage.getItem('userInfo') as string
    const userToken = JSON.parse(userInfo).token
    const isAggregated = !!useSelector(getAggregatedWords).filter((item) => item._id === wordId).length
    const otherAggregatedWords = useSelector(getAggregatedWords).filter((item) => item._id !== wordId)
    const method = isAggregated ? 'PUT' : 'POST'
    const response = await fetch(
      `http://localhost:8088/users/${userToken}/words/${wordId}`,
      {
        method,
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(requestBody),
      },
    )
    const updatedWord = await response.json() as IUserWord
    dispatch(fetchAggregatedWords([...otherAggregatedWords, updatedWord]))
  } catch (e) {
    console.log(e)
  }
}
