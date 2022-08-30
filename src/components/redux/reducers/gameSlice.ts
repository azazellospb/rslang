/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: IGameSlice = {
  gameOver: false,
}

export const gameSlice = createSlice({
  name: 'gameBehavior',
  initialState,
  reducers: {
    fetchGameOver(state, action: PayloadAction<boolean>) {
      state.gameOver = action.payload
    },
  },
})

export default gameSlice.reducer

export interface IGameSlice {
  gameOver: boolean
}
