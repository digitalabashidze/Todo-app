import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'
import { toggleDarkMode } from '../../redux/themeSlice'
import moonIcon from '../../assets/images/icon-moon.svg'
import sunIcon from '../../assets/images/icon-sun.svg'
import useTheme from '../../hooks/useTheme'
import styles from './ThemeToggleBtn.module.css'

const ThemeToggleBtn = () => {
	const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode)
	const dispatch = useDispatch()

	useTheme(isDarkMode ? 'dark' : 'light')

	const toggleTheme = () => {
		dispatch(toggleDarkMode())
	}

	return (
		<button className={styles.btn} onClick={toggleTheme}>
			<img src={isDarkMode ? sunIcon : moonIcon} alt='Icon' />
		</button>
	)
}

export default ThemeToggleBtn
