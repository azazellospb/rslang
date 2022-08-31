/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUnlearnedWord, IWord } from '../../../types/models'
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
}

export const audioGameSlice = createSlice({
  name: 'audiogame',
  initialState,
  reducers: {
    wordsFetchError(state, action: PayloadAction<string>) {
      state.isLoaded = false
      state.error = action.payload
    },

    setCurrentWord(state, action: PayloadAction<IWord>) {
      state.currentWord = action.payload
    },

    learnedWord(state, action: PayloadAction<ILearnedWord>) {
      Object.keys(action.payload).length === 0
        ? (state.learnedWords = [])
        : state.learnedWords.some((item) => item.id === action.payload.id)
          ? null
          : state.learnedWords.push(action.payload)
    },

    setStyles(state, action: PayloadAction<boolean>) {
      state.changeStyle = action.payload
    },

    fetchCounterWord(state, action: PayloadAction<number>) {
      state.counterWord = action.payload
    },

    fetchCounterProgress(state, action: PayloadAction<number>) {
      state.counterProgress = action.payload
    },
  },
})

export default audioGameSlice.reducer

export interface IAudioGame {
  words: IWord[]
  learnedWords: ILearnedWord[]
  isLoaded: boolean
  error: string
  currentWord: IWord | null | IUnlearnedWord
  rightWords: IWord[]
  changeStyle: boolean
  customAnswers: IWord[]
  counterWord: number
  counterProgress: number
}

export interface ILearnedWord {
  // _id?: string
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
