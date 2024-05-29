import styles from './CustomCheckbox.module.css'

interface CustomCheckboxProps {
	isChecked: boolean
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const CustomCheckbox = ({ isChecked, onChange }: CustomCheckboxProps) => {
	return (
		<label className={styles['checkbox-container']}>
			<input type='checkbox' checked={isChecked} onChange={onChange} />
			<span className={styles['checkmark']}></span>
		</label>
	)
}

export default CustomCheckbox
