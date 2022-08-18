import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatchState, RootReducerState } from '../store'

export const useAppDispatch = () => useDispatch<AppDispatchState>()
export const useAppSelector: TypedUseSelectorHook<RootReducerState> = useSelector
