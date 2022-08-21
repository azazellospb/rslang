/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IWord } from '../../../types/models'

interface ISprint {
  gameData: IWord[],
  currentWord: IWord | null | undefined,
  comparisonWord: IWord | null | undefined,
  gameLoader: boolean,
  error: string | unknown
  timer: number
}

const initialState: ISprint = {
  gameData: [],
  currentWord: null,
  comparisonWord: null,
  gameLoader: true,
  error: '',
  timer: 60,
}

const sprintGameSlice = createSlice({
  name: 'sprint',
  initialState,
  reducers: {
    fetchWordForSprintGameLoader(state) {
      state.gameLoader = true
    },
    fetchWordForSprintGameSuccess(state, action: PayloadAction<IWord[]>) {
      state.gameLoader = false
      state.error = ''
      state.gameData = action.payload
    },
    fetchWordForSprintGameError(state, action: PayloadAction<string | unknown>) {
      state.gameLoader = false
      state.error = action.payload
    },
    timerWork(state, action: PayloadAction<number>) {
      state.timer = action.payload
    },
    currentWord(state, action: PayloadAction<IWord>) {
      state.currentWord = action.payload
    },
    forComparisonWord(state, action: PayloadAction<IWord>) {
      state.comparisonWord = action.payload
    },
  },
})

export const {
  fetchWordForSprintGameLoader,
  fetchWordForSprintGameSuccess,
  fetchWordForSprintGameError,
  timerWork,
  currentWord,
  forComparisonWord,
} = sprintGameSlice.actions

export default sprintGameSlice.reducer
