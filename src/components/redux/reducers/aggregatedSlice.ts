import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICustomWord, IUnlearnedWord } from '../../../types/models'
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */

interface IAggregatedWordsState {
  data: ICustomWord[],
  hardWords:ICustomWord[],
  beforePageWords: IUnlearnedWord[],
  otherUnlearned: IUnlearnedWord[],
}

const initialState: IAggregatedWordsState = {
  data: [],
  hardWords: [],
  beforePageWords: [],
  otherUnlearned: [],
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
    fetchBeforePageUnlearned(state, action: PayloadAction<IUnlearnedWord[]>) {
      state.beforePageWords = action.payload
    },
    fetchOtherSectionUnlearned(state, action: PayloadAction<IUnlearnedWord[]>) {
      state.otherUnlearned = action.payload
    },
  },
})
export default aggregatedSlice.reducer
export const {
  fetchAggregatedWords,
  deleteHardWord,
  fetchBeforePageUnlearned,
  fetchOtherSectionUnlearned,
} = aggregatedSlice.actions
export const getAggregatedWords = (state: {
  aggregatedSlice: { data: ICustomWord[] }
}) => state.aggregatedSlice.data
export const getHardWords = (state: {
  aggregatedSlice: { hardWords: ICustomWord[] }
}) => state.aggregatedSlice.hardWords
export const getBeforePageWords = (state: {
  aggregatedSlice: { beforePageWords: IUnlearnedWord[] }
}) => state.aggregatedSlice.beforePageWords
export const getOtherUnlearned = (state: {
  aggregatedSlice: { otherUnlearned: IUnlearnedWord[] }
}) => state.aggregatedSlice.otherUnlearned
