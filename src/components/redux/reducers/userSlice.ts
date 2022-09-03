/* eslint-disable @typescript-eslint/semi */
/* eslint-disable  no-unsafe-optional-chaining */
/* eslint-disable  @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserStat, IUnlearnedWord } from '../../../types/models'

const initialState: User = {
  name: '',
  password: '',
  email: '',
  statistic: null,
  todayWords: 0,
  allLearned: [],
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      /* eslint-disable no-param-reassign */
      state.name = action.payload
    },
    clearUserName: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.name = ''
    },
    setUserMail: (state, action: PayloadAction<User>) => {
      state.email = action.payload.email
    },
    clearUserMail: (state) => {
      state.email = ''
    },
    setUserPassw: (state, action: PayloadAction<User>) => {
      state.password = action.payload.password
    },
    clearUserPassw: (state) => {
      state.password = ''
    },
    setUserStats: (state, action: PayloadAction<UserStat>) => {
      state.statistic = action.payload
    },
    setTodayLearnedWords: (state, action: PayloadAction<number>) => {
      state.todayWords = action.payload
    },
    setAllLearned: (state, action: PayloadAction<IUnlearnedWord[]>) => {
      state.allLearned = [...action.payload]
    },
  },
})
/* eslint-disable object-curly-newline */
export interface User {
  password: string
  name: string
  email: string
  statistic?: UserStat | null
  todayWords?: number,
  allLearned?: IUnlearnedWord[],
}

export default userSlice.reducer
// userReducer для доступа к Redux использовать обязательно, это взято из store.ts (строка 9)
export const getUserName = (state: { userReducer: { name: string } }) => state.userReducer.name
export const getLearnedWords = (state: {
  userReducer: { todayWords: number[] }
}) => state.userReducer.todayWords
export const getAllLearned = (state: {
  userReducer: { allLearned: IUnlearnedWord[] }
}) => state.userReducer.allLearned
export const userStats = (state: {
  userReducer: { statistic: UserStat }
}) => state.userReducer.statistic

export const {
  setUserName,
  clearUserName,
  setUserMail,
  setUserPassw,
  clearUserPassw,
  clearUserMail,
  setUserStats,
  setAllLearned,
  setTodayLearnedWords,
} = userSlice.actions
