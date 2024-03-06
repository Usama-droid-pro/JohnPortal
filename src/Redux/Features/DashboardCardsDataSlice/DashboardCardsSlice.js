import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  verifiedLeadsCount: 0,
  lockedLeadsCount : 0,
  unLockedLeadsCount : 0
}

export const dashaboardCardsDataSlice = createSlice({
  name: 'dashaboardCardsData',
  initialState,
  reducers: {
    updateVerifiedLeadsCount: (state , action) => {
      state.verifiedLeadsCount = action.payload.count
    },
    updateLockedLeadsCount: (state , action) => {
        state.lockedLeadsCount = action.payload.count
      },
      updateUnLockedLeadsCount: (state , action) => {
        state.unLockedLeadsCount = action.payload.count
      },
  },
})

// Action creators are generated for each case reducer function
export const { updateVerifiedLeadsCount, updateLockedLeadsCount, updateUnLockedLeadsCount } = dashaboardCardsDataSlice.actions

export default dashaboardCardsDataSlice.reducer