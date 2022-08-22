import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: User = { name: '', password: '', email: '' }

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // TODO: change names
    setUserName: (state, action: PayloadAction<User>) => {
      /* eslint-disable no-param-reassign */
      state.name = action.payload.name
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
  },
})
/* eslint-disable object-curly-newline */
export interface User {
  password: string
  name: string
  email: string
}
// interface UserArr {
//   users: User[],
//   isLoading: boolean,
//   error: string
// }
export default userSlice.reducer
// userReducer для доступа к Redux использовать обязательно, это взято из store.ts (строка 9)
export const getUserName = (state: { userReducer: { name: string } }) => state.userReducer.name
export const {
  setUserName,
  clearUserName,
  setUserMail,
  setUserPassw,
  clearUserPassw,
  clearUserMail,
} = userSlice.actions
