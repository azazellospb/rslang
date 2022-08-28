import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICustomWord } from '../../../types/models'
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */

interface IAggregatedWordsState {
  data: ICustomWord[],
  hardWords:ICustomWord[]
}

const initialState: IAggregatedWordsState = {
  data: [],
  hardWords: [],
}

export const aggregatedSlice = createSlice({
  name: 'aggregatedData',
  initialState,
  reducers: {
    fetchAggregatedWords(state, action: PayloadAction<ICustomWord[]>) {
      state.data = action.payload
      state.hardWords = action.payload.filter((word) => word.difficulty === 'hard')
    },
    deleteHardWord(state, action: PayloadAction<ICustomWord>) {
      state.hardWords = state.hardWords.filter((word) => word.id !== action.payload.id)
    },
  },
})
export default aggregatedSlice.reducer
export const { fetchAggregatedWords, deleteHardWord } = aggregatedSlice.actions
export const getAggregatedWords = (state: {
  aggregatedSlice: { data: ICustomWord[] }
}) => state.aggregatedSlice.data
export const getHardWords = (state: {
  aggregatedSlice: { hardWords: ICustomWord[] }
}) => state.aggregatedSlice.hardWords
