import { combineReducers, configureStore } from '@reduxjs/toolkit'
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/prefer-default-export */
import sprintGameSlice from './reducers/sprintGameSlice'
import aggregatedSlice from './reducers/aggregatedSlice'
import userReducer from './reducers/userSlice'
import wordSlice from './reducers/wordSlice'
import audioGameSlice from './reducers/audioGameSlice'
import gameSlice from './reducers/gameSlice'

const rootReducer = combineReducers({
  wordSlice,
  aggregatedSlice,
  sprintGameSlice,
  userReducer,
  audioGameSlice,
  gameSlice,
})
/* eslint-disable implicit-arrow-linebreak */
export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
  })

export type RootReducerState = ReturnType<typeof rootReducer>
export type AppStoreState = ReturnType<typeof setupStore>
export type AppDispatchState = AppStoreState['dispatch']
