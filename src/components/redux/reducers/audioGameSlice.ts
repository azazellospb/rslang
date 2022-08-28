/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IWord } from '../../../types/models'

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
      // console.log('learnedWord')
      state.learnedWords.some((item) => item.id === action.payload.id)
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
  },
})

export default audioGameSlice.reducer

interface IAudioGame {
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
}

interface ILearnedWord {
  id: string
  group: number
  page: number
  word: string
  image: string
  audio: string
  audioMeaning: string
  audioExample: string
  textMeaning: string
  textExample: string
  transcription: string
  textExampleTranslate: string
  textMeaningTranslate: string
  wordTranslate: string
  learned?: boolean
}
