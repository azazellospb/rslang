import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAggregatedWords, ICustomWord, IUnlearnedWord } from '../../../types/models'
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */

interface IAggregatedWordsState {
  data: ICustomWord[],
  hardWords: IUnlearnedWord[],
  beforePageWords: IUnlearnedWord[],
  otherUnlearned: IUnlearnedWord[],
  dictPageWords: IUnlearnedWord[],
}

const initialState: IAggregatedWordsState = {
  data: [],
  hardWords: [],
  beforePageWords: [],
  otherUnlearned: [],
  dictPageWords: [],
}
export const aggregatedSlice = createSlice({
  name: 'aggregatedData',
  initialState,
  reducers: {
    fetchAggregatedWords(state, action: PayloadAction<ICustomWord[]>) {
      state.data = action.payload
    },
    deleteHardWord(state, action: PayloadAction<IUnlearnedWord>) {
      state.hardWords = state.hardWords.filter((word) => word.id !== action.payload.id)
    },
    addHardWord(state, action: PayloadAction<IUnlearnedWord>) {
      state.hardWords = [...state.hardWords, action.payload]
    },
    fetchBeforePageUnlearned(state, action: PayloadAction<IUnlearnedWord[]>) {
      state.beforePageWords = action.payload
    },
    fetchOtherSectionUnlearned(state, action: PayloadAction<IUnlearnedWord[]>) {
      state.otherUnlearned = action.payload
    },
    fetchDictPage(state, action: PayloadAction<IUnlearnedWord[]>) {
      state.dictPageWords = action.payload
    },
    fetchHardWords(state, action: PayloadAction<IAggregatedWords[]>) {
      state.hardWords = action.payload[0].paginatedResults
    },
  },
})
export default aggregatedSlice.reducer
export const {
  fetchAggregatedWords,
  deleteHardWord,
  fetchBeforePageUnlearned,
  fetchOtherSectionUnlearned,
  fetchDictPage,
  fetchHardWords,
  addHardWord,
} = aggregatedSlice.actions
export const getAggregatedWords = (state: {
  aggregatedSlice: { data: ICustomWord[] }
}) => state.aggregatedSlice.data
export const getHardWords = (state: {
  aggregatedSlice: { hardWords: IUnlearnedWord[] }
}) => state.aggregatedSlice.hardWords
export const getBeforePageWords = (state: {
  aggregatedSlice: { beforePageWords: IUnlearnedWord[] }
}) => state.aggregatedSlice.beforePageWords
export const getOtherUnlearned = (state: {
  aggregatedSlice: { otherUnlearned: IUnlearnedWord[] }
}) => state.aggregatedSlice.otherUnlearned
export const dictPageWords = (state: {
  aggregatedSlice: { dictPageWords: IUnlearnedWord[] }
}) => state.aggregatedSlice.dictPageWords
