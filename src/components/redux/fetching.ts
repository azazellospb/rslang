/* eslint-disable import/no-cycle */
/* eslint-disable max-len */
/* eslint-disable no-console */

import { AppDispatchState } from './store'
import { fetchWordSuccess } from './reducers/wordSlice'
import { IWord } from '../../types/models'
import { IFetchParam } from '../../types/sprint-game-models'
import {
  fetchWordForSprintGameError,
  fetchWordForSprintGameLoader,
  fetchWordForSprintGameSuccess,
} from './reducers/sprintGameSlice'

// eslint-disable-next-line consistent-return
const getWordsData = () => async (dispatch: AppDispatchState) => {
  try {
    // TODO: сделать лоадер
    const response: Response = await fetch('http://localhost:8088/words/')
    const data: IWord[] = await response.json()
    dispatch(fetchWordSuccess(data))
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
