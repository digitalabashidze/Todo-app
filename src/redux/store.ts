import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './taskSlice'
import themeReducer from './themeSlice'

const store = configureStore({
	reducer: {
		tasks: tasksReducer,
		theme: themeReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
