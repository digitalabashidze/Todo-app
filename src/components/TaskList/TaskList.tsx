import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import {
	DragDropContext,
	Droppable,
	Draggable,
	DropResult,
} from 'react-beautiful-dnd'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'
import {
	deleteTask,
	toggleTaskCompletion,
	editTask,
	clearCompletedTasks,
	reorderTasks,
} from '../../redux/taskSlice'
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox'
import deleteIcon from '../../assets/images/icon-cross.svg'
import Filters from '../Filters/Filters'
import styles from './TaskList.module.css'

const TaskList = () => {
	const isTabletOrMobile = useMediaQuery({ maxWidth: 768 })

	const tasks = useSelector((state: RootState) => state.tasks.tasks)
	const dispatch = useDispatch()

	const [editedTaskId, setEditedTaskId] = useState<string | null>(null)
	const [editedTaskText, setEditedTaskText] = useState<string>('')

	const [filter, setFilter] = useState<string>('all')

	const handleEditTask = (taskId: string, newText: string) => {
		dispatch(editTask({ id: taskId, text: newText }))
		setEditedTaskId(null)
		setEditedTaskText('')
	}

	const filteredTasks = tasks.filter(task => {
		if (filter === 'all') return true
		if (filter === 'active') return !task.completed
		if (filter === 'completed') return task.completed
		return true
	})

	const tasksQuantity = filteredTasks.length

	const onDragEnd = (result: DropResult) => {
		if (!result.destination) return
		dispatch(
			reorderTasks({
				sourceIndex: result.source.index,
				destinationIndex: result.destination.index,
			})
		)
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId='droppable-task-list'>
				{provided => (
					<>
						<ul
							className={styles.taskList}
							{...provided.droppableProps}
							ref={provided.innerRef}
						>
							{filteredTasks.map((task, index) => (
								<Draggable key={task.id} draggableId={task.id} index={index}>
									{provided => (
										<li
											className={`${styles.task} ${
												task.completed ? styles.completed : ''
											}`}
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
										>
											<div className={styles['task-wrapper']}>
												<CustomCheckbox
													isChecked={task.completed}
													onChange={() =>
														dispatch(toggleTaskCompletion(task.id))
													}
												/>
												{editedTaskId === task.id ? (
													<input
														className={styles['edit-input']}
														type='text'
														value={editedTaskText}
														onChange={e => setEditedTaskText(e.target.value)}
														onBlur={() =>
															handleEditTask(task.id, editedTaskText)
														}
														autoFocus
													/>
												) : (
													<span
														onDoubleClick={() => {
															setEditedTaskId(task.id)
															setEditedTaskText(task.text)
														}}
													>
														{task.text}
													</span>
												)}
											</div>
											<button
												onClick={() => dispatch(deleteTask(task.id))}
												className={styles['delete-button']}
											>
												<img src={deleteIcon} alt='delete icon' />
											</button>
										</li>
									)}
								</Draggable>
							))}
							{provided.placeholder}
							{tasksQuantity >= 0 && !isTabletOrMobile && (
								<li>
									<Filters
										filter={filter}
										setFilter={setFilter}
										quantity={tasksQuantity}
										clearCompleted={() => dispatch(clearCompletedTasks())}
									/>
								</li>
							)}
						</ul>
						{isTabletOrMobile && (
							<Filters
								filter={filter}
								setFilter={setFilter}
								quantity={tasksQuantity}
								clearCompleted={() => dispatch(clearCompletedTasks())}
							/>
						)}
					</>
				)}
			</Droppable>
		</DragDropContext>
	)
}

export default TaskList
