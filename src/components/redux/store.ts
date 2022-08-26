/* eslint-disable import/no-named-as-default */
/* eslint-disable import/prefer-default-export */
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import sprintGameSlice from './reducers/sprintGameSlice'
import wordSlice from './reducers/wordSlice'
import userReducer from './reducers/userSlice'
import audioGameSlice from './reducers/audioGameSlice'

const rootReducer = combineReducers({
  wordSlice,
  sprintGameSlice,
  userReducer,
  audioGameSlice,
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
