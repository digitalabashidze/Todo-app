import { useState } from 'react'
import moonIcon from '../../assets/images/icon-moon.svg'
import sunIcon from '../../assets/images/icon-sun.svg'
import styles from './ThemeToggleBtn.module.css'

const ThemeToggleBtn = () => {
	const [isDarkMode, setIsDarkMode] = useState(false)

	const toggleTheme = () => {
		setIsDarkMode(prevMode => !prevMode) // Toggle between true and false
	}

	// Apply dark-mode class to body element based on isDarkMode state
	if (isDarkMode) {
		document.body.classList.add('dark-mode')
	} else {
		document.body.classList.remove('dark-mode')
	}

	return (
		<button className={styles.btn} onClick={toggleTheme}>
			<img src={isDarkMode ? sunIcon : moonIcon} alt='Icon' />
		</button>
	)
}

export default ThemeToggleBtn
