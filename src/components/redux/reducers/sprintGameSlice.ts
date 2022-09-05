/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IWord } from '../../../types/models'
import { IFetchParam, IStudiedWord } from '../../../types/sprint-game-models'

interface ISprint {
  gameData: IWord[],
  studiedArr: IStudiedWord[],
  isModalOpen: boolean,
  currentWord: IWord | null | undefined,
  comparisonWord: IWord | null | undefined,
  currentGroupPage: IFetchParam | null | undefined,
  gameLoader: boolean,
  error: string | unknown,
  timer: number,
  score: number,
  turnCounter: number,
  isFromDictionary: boolean,
  allWordStudiedOnPage: boolean,
  offer: boolean,
}

const initialState: ISprint = {
  gameData: [],
  studiedArr: [],
  isModalOpen: true,
  currentWord: null,
  comparisonWord: null,
  currentGroupPage: null,
  gameLoader: false,
  error: '',
  timer: 20,
  score: 0,
  turnCounter: 1,
  isFromDictionary: false,
  allWordStudiedOnPage: false,
  offer: false,
}

const sprintGameSlice = createSlice({
  name: 'sprint',
  initialState,
  reducers: {
    fetchWordForSprintGameLoader(state, action: PayloadAction<boolean>) {
      state.gameLoader = action.payload
    },
    fetchWordForSprintGameSuccess(state, action: PayloadAction<IWord[]>) {
      // state.gameLoader = false
      state.isModalOpen = false
      state.error = ''
      state.gameData = action.payload
    },
    fetchWordForSprintGameError(state, action: PayloadAction<string | unknown>) {
      // state.gameLoader = false
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
      Object.keys(action.payload).length === 0
        ? state.studiedArr = []
        : state.studiedArr.some((item) => item.id === action.payload.id) ? null : state.studiedArr.push(action.payload)
    },
    gameScore(state, action: PayloadAction<number>) {
      action.payload === 0
        ? state.score = 0
        : state.score += action.payload
    },
    turnCounter(state) {
      state.turnCounter += 1
    },
    modalToggle(state, action: PayloadAction<boolean>) {
      state.isModalOpen = action.payload
    },
    whereEnterGame(state, action: PayloadAction<boolean>) {
      state.isFromDictionary = action.payload
    },
    currentGroupPage(state, action: PayloadAction<IFetchParam>) {
      state.currentGroupPage = action.payload
    },
    showMessageIfAllWordStudiedOnPage(state, action: PayloadAction<boolean>) {
      state.allWordStudiedOnPage = action.payload
    },
    isGetOffer(state, action: PayloadAction<boolean>) {
      state.offer = action.payload
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
  whereEnterGame,
  currentGroupPage,
  showMessageIfAllWordStudiedOnPage,
  isGetOffer,
} = sprintGameSlice.actions

export default sprintGameSlice.reducer
