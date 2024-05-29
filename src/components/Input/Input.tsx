import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTask } from '../../redux/taskSlice'
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox'
import styles from './Input.module.css'

const Input = () => {
	const [taskText, setTaskText] = useState('')
	const [isChecked, setIsChecked] = useState(false)
	const dispatch = useDispatch()

	const handleAddTask = () => {
		if (taskText.trim()) {
			dispatch(addTask({ text: taskText, completed: isChecked }))
			setTaskText('')
			setIsChecked(false)
		}
	}

	return (
		<div className={styles['input-wrapper']}>
			<CustomCheckbox
				isChecked={isChecked}
				onChange={e => setIsChecked(e.target.checked)}
			/>
			<input
				type='text'
				value={taskText}
				placeholder='Create a new todo…'
				onChange={e => setTaskText(e.target.value)}
				className={styles['text-input']}
				onKeyPress={e => e.key === 'Enter' && handleAddTask()}
			/>
		</div>
	)
}

export default Input
