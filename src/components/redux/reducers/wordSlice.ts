/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IWord } from '../../../types/models'

interface IWordDataState {
  data: IWord[],

}
const initialState: IWordDataState = {
  data: [],
}
export const wordSlice = createSlice({
  name: 'wordData',
  initialState,
  reducers: {
    fetchWordSuccess(state, action: PayloadAction<IWord[]>) {
      state.data = action.payload
    },
  },
})

export default wordSlice.reducer
