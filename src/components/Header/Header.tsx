import Input from '../Input/Input'
import ThemeToggleBtn from '../ThemeToggleBtn/ThemeToggleBtn'

import styles from './Header.module.css'

const Header = () => {
	return (
		<header className={styles['header']}>
			<div className='container'>
				<div className={styles['header-wrapper']}>
					<h1>TODO</h1>
					<ThemeToggleBtn />
				</div>
				<Input />
			</div>
		</header>
	)
}

export default Header
