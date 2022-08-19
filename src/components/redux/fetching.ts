/* eslint-disable import/no-cycle */
/* eslint-disable max-len */
/* eslint-disable no-console */
import { AppDispatchState } from './store'
import { wordSlice } from './reducers/wordSlice'
import { IWord } from '../../types/models'
import { IFetchParam } from '../../types/sprint-game-models'

// eslint-disable-next-line consistent-return
const getWordsData = () => async (dispatch: AppDispatchState) => {
  try {
    // TODO: сделать лоадер
    const response: Response = await fetch('http://localhost:8088/words/')
    const data: IWord[] = await response.json()
    dispatch(wordSlice.actions.fetchWordSuccess(data))
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
    // TODO: сделать лоадер
    const response: Response = await fetch(`${url}/?group=${textbookSection}&page=${page}`)
    const data: IWord[] = await response.json()
    console.log(data)
    dispatch(wordSlice.actions.fetchWordSuccess(data))
  } catch (err) {
    console.log(err)
    // TODO: ОБОАБОТАТЬ ОШИБКУ
  }
}
