/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUnlearnedWord, IWord } from '../../../types/models'
/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
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
  totalNumOfWords: 20,
}

export const audioGameSlice = createSlice({
  name: 'audiogame',
  initialState,
  reducers: {
    wordsFetchError(state, action: PayloadAction<string>) {
      state.isLoaded = false
      state.error = action.payload
    },

    setCurrentWord(state, action: PayloadAction<IWord | IUnlearnedWord>) {
      state.currentWord = action.payload
    },
    /**
     * Create array word for statistics after game
     * @param action.payload - word can contain different keynames { id } or { _id }
     */
    learnedWord(state, action: PayloadAction<ILearnedWord>) {
      if (action.payload.id === undefined) {
        Object.keys(action.payload).length === 0
          ? (state.learnedWords = [])
          : state.learnedWords.some((item) => item._id === action.payload._id)
            ? null
            : state.learnedWords.push(action.payload)
      }
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
    fetchTotalNumOfWords(state, action: PayloadAction<number>) {
      state.totalNumOfWords = action.payload
    },
  },
})

export default audioGameSlice.reducer

export interface IAudioGame {
  words: IWord[] | IUnlearnedWord[]
  learnedWords: ILearnedWord[]
  isLoaded: boolean
  error: string
  currentWord: IWord | null | IUnlearnedWord
  rightWords: IWord[]
  changeStyle: boolean
  customAnswers: IWord[]
  counterWord: number
  counterProgress: number
  totalNumOfWords: number
}

export interface ILearnedWord {
  _id?: string
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
