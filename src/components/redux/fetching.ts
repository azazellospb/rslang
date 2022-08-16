import { AppDispatchState } from './store'
import { wordSlice } from './reducers/wordSlice'
import { IWord } from '../../types/models'

export const getWordsData = () => async (dispatch: AppDispatchState) => {
  try {
    const response = fetch('http://localhost:8088/words/')
    const data: IWord[] = await (await response).json()
    dispatch(wordSlice.actions.fetchWordSuccess(data))
  } catch (e) {
  }
}
