/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IWord } from '../../../types/models'
/* eslint-disable no-nested-ternary */
const initialState: IAudioGame = {
  words: [],
  learnedWords: [],
  isLoaded: false,
  error: '',
  currentWord: null,
  rightWords: [],
  changeStyle: false,
  customAnswers: [],
  counterWord: 0,
  counterProgress: 1,
  // gameOwer: false,
}

export const audioGameSlice = createSlice({
  name: 'audiogame',
  initialState,
  reducers: {
    // wordsFetch(state) {
    //   state.isLoaded = true
    // },
    // wordsFetchSuccess(state, action: PayloadAction<IWord[]>) {
    //   state.isLoaded = false
    //   state.words = action.payload
    //   state.error = ''
    // },
    wordsFetchError(state, action: PayloadAction<string>) {
      state.isLoaded = false
      state.error = action.payload
    },
    setCurrentWord(state, action: PayloadAction<IWord>) {
      state.currentWord = action.payload
    },
    learnedWord(state, action: PayloadAction<ILearnedWord>) {
      // state.learnedWords.some((item) => item.id === action.payload.id)
      //   ? null
      //   : state.learnedWords.push(action.payload)
      Object.keys(action.payload).length === 0
        ? (state.learnedWords = [])
        : state.learnedWords.some((item) => item.id === action.payload.id)
          ? null
          : state.learnedWords.push(action.payload)
    },
    setStyles(state, action: PayloadAction<boolean>) {
      state.changeStyle = action.payload
    },
    // getCustomAnswers(state, )
    fetchCounterWord(state, action: PayloadAction<number>) {
      state.counterWord = action.payload
    },
    fetchCounterProgress(state, action: PayloadAction<number>) {
      state.counterProgress = action.payload
    },
    // fetchGameOver(state, action: PayloadAction<boolean>) {
    //   state.gameOwer = action.payload
    // },
  },
})

export default audioGameSlice.reducer

export interface IAudioGame {
  words: IWord[]
  learnedWords: ILearnedWord[]
  isLoaded: boolean
  error: string
  currentWord: IWord | null
  rightWords: IWord[]
  changeStyle: boolean
  customAnswers: IWord[]
  counterWord: number
  counterProgress: number
  // gameOwer: boolean
}

export interface ILearnedWord {
  id?: string | undefined
  group?: number | undefined
  page?: number | undefined
  word?: string | undefined
  image?: string | undefined
  audio?: string | undefined
  audioMeaning?: string | undefined
  audioExample?: string | undefined
  textMeaning?: string | undefined
  textExample?: string | undefined
  transcription?: string | undefined
  textExampleTranslate?: string | undefined
  textMeaningTranslate?: string | undefined
  wordTranslate?: string | undefined
  learned?: boolean
}
