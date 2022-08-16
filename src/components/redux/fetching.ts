/* eslint-disable no-console */
import { AppDispatchState } from './store'
import { wordSlice } from './reducers/wordSlice'
import { IWord } from '../../types/models'

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

// export default function testExport(text:string) {
//   console.log(text)
// }
