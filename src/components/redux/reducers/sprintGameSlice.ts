/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IWord } from '../../../types/models'

interface ISprint {
  gameData: IWord[],
  gameLoader: boolean,
  error: string | unknown
}

const initialState: ISprint = {
  gameData: [],
  gameLoader: true,
  error: '',
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
  },
})

export const {
  fetchWordForSprintGameLoader,
  fetchWordForSprintGameSuccess,
  fetchWordForSprintGameError,
} = sprintGameSlice.actions

export default sprintGameSlice.reducer
