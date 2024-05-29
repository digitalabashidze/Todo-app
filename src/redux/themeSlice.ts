import { createSlice } from '@reduxjs/toolkit'

interface ThemeState {
	isDarkMode: boolean
}

const initialState: ThemeState = {
	isDarkMode: localStorage.getItem('theme') === 'dark',
}

const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		toggleDarkMode: state => {
			state.isDarkMode = !state.isDarkMode
			localStorage.setItem('theme', state.isDarkMode ? 'dark' : 'light')
		},
	},
})

export const { toggleDarkMode } = themeSlice.actions
export default themeSlice.reducer
