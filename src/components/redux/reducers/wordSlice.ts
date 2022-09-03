/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IWord } from '../../../types/models'

interface IWordDataState {
  data: IWord[],
  userWord: string,

}
const initialState: IWordDataState = {
  data: [],
  userWord: '',
}
export const wordSlice = createSlice({
  name: 'wordData',
  initialState,
  reducers: {
    fetchWordSuccess(state, action: PayloadAction<IWord[]>) {
      state.data = action.payload
    },
    fetchUserWords(state, action: PayloadAction<IWord>) {
      state.userWord = action.payload.id
    },
  },
})
export default wordSlice.reducer
export const { fetchWordSuccess, fetchUserWords } = wordSlice.actions
export const getWordsArray = (state: {
  wordSlice: { data: IWord[] }
}) => state.wordSlice.data
export const getUserWordArray = (state: {
  wordSlice: { userWords: IWord[] }
}) => state.wordSlice.userWords
