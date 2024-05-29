import { useEffect } from 'react'

const useTheme = (theme: 'light' | 'dark') => {
	useEffect(() => {
		const themeFile = theme === 'light' ? 'lightTheme.css' : 'darkTheme.css'

		const link = document.createElement('link')
		link.id = 'theme-link'
		link.rel = 'stylesheet'
		link.href = `./src/assets/styles/${themeFile}`
		document.head.appendChild(link)
	}, [theme])
}

export default useTheme
