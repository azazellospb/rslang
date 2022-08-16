/* eslint-disable import/no-named-as-default */
/* eslint-disable import/prefer-default-export */
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import wordDataReducer from './reducers/wordSlice'

const rootReducer = combineReducers({
  wordDataReducer,
})

export const setupStore = () => configureStore({
  reducer: rootReducer,
})

export type RootReducerState = ReturnType<typeof rootReducer>
export type AppStoreState = ReturnType<typeof setupStore>
export type AppDispatchState = AppStoreState['dispatch']