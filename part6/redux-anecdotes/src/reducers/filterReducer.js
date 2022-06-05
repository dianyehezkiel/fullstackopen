import { createSlice } from "@reduxjs/toolkit"

const filter = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter(state, action) {
      return action.payload
    }
  }
})

export const { setFilter } = filter.actions
export default filter.reducer