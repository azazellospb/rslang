import { combineReducers, configureStore } from '@reduxjs/toolkit'
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/prefer-default-export */
import sprintGameSlice from './reducers/sprintGameSlice'
import wordDataReducer from './reducers/wordSlice'
import userReducer from './reducers/userSlice'
import audioGameSlice from './reducers/audioGameSlice'

const rootReducer = combineReducers({
  wordDataReducer,
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
