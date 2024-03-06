import { configureStore } from '@reduxjs/toolkit'
import DashboardCardsDataReducer from 'Redux/Features/DashboardCardsDataSlice/DashboardCardsSlice'

export const store = configureStore({
  reducer: {
    dashaboardCardsData : DashboardCardsDataReducer
  },
})