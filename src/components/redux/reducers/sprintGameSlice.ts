/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IWord } from '../../../types/models'
import { IStudiedWord } from '../../../types/sprint-game-models'

interface ISprint {
  gameData: IWord[],
  studiedArr: IStudiedWord[],
  isModalOpen: boolean,
  currentWord: IWord | null | undefined,
  comparisonWord: IWord | null | undefined,
  gameLoader: boolean,
  error: string | unknown,
  timer: number,
  score: number,
  turnCounter: number,
}

const initialState: ISprint = {
  gameData: [],
  studiedArr: [],
  isModalOpen: true,
  currentWord: null,
  comparisonWord: null,
  gameLoader: true,
  error: '',
  timer: 5,
  score: 0,
  turnCounter: 1,
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
      state.isModalOpen = false
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
    studiedWord(state, action: PayloadAction<IStudiedWord>) {
      state.studiedArr.some((item) => item.id === action.payload.id) ? null : state.studiedArr.push(action.payload)
    },
    gameScore(state) {
      state.score += 10
    },
    turnCounter(state) {
      state.turnCounter += 1
    },
    modalToggle(state, action: PayloadAction<boolean>) {
      state.isModalOpen = action.payload
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
  studiedWord,
  gameScore,
  turnCounter,
  modalToggle,
} = sprintGameSlice.actions

export default sprintGameSlice.reducer
