import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: { name: '' },
  reducers: {
    // TODO: change names
    setUserName: (state, action: PayloadAction<User>) => {
      // eslint-disable-next-line no-param-reassign
      state.name += action.payload
    },
    clearUserName: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.name = ''
    },
  },
})

interface User {
  password: string,
  name: string,
  email: string,
}
// interface UserArr {
//   users: User[],
//   isLoading: boolean,
//   error: string
// }
export default userSlice.reducer
// userReducer для доступа к Redux использовать обязательно, это взято из store.ts (строка 9)
export const getUserName = (state: { userReducer: { name: string } }) => state.userReducer.name
export const { setUserName, clearUserName } = userSlice.actions
