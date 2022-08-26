import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICustomWord } from '../../../types/models'
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */

interface IAggregatedWordsState {
  data: ICustomWord[],

}

const initialState: IAggregatedWordsState = {
  data: [],
}

export const aggregatedSlice = createSlice({
  name: 'aggregatedData',
  initialState,
  reducers: {
    fetchAggregatedWords(state, action: PayloadAction<ICustomWord[]>) {
      state.data = action.payload
    },
  },
})
export default aggregatedSlice.reducer
export const { fetchAggregatedWords } = aggregatedSlice.actions
export const getAggregatedWords = (state: {
  aggregatedSlice: { data: ICustomWord[] }
}) => state.aggregatedSlice.data
