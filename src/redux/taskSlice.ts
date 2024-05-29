import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Task {
	id: string
	text: string
	completed: boolean
}

interface TaskState {
	tasks: Task[]
}

const loadState = (): Task[] => {
	try {
		const data = localStorage.getItem('tasks')
		if (data === null) {
			return []
		}
		return JSON.parse(data)
	} catch (err) {
		console.error('Could not load state from localStorage', err)
		return []
	}
}

const tasksfromStorage = loadState()

const saveState = (state: Task[]) => {
	try {
		const newTaks = JSON.stringify(state)
		localStorage.setItem('tasks', newTaks)
	} catch (e) {
		console.error('Could not save state to localStorage', e)
	}
}

const initialState: TaskState = {
	tasks: tasksfromStorage || [],
}

const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		setTasks: (state, action: PayloadAction<Task[]>) => {
			state.tasks = action.payload
			saveState(state.tasks)
		},
		addTask: (
			state,
			action: PayloadAction<{ text: string; completed: boolean }>
		) => {
			const newTask: Task = {
				id: new Date().toISOString(),
				text: action.payload.text,
				completed: action.payload.completed,
			}
			state.tasks.push(newTask)
			saveState(state.tasks)
		},
		deleteTask: (state, action: PayloadAction<string>) => {
			state.tasks = state.tasks.filter(task => task.id !== action.payload)
			saveState(state.tasks)
		},
		editTask: (state, action: PayloadAction<{ id: string; text: string }>) => {
			const task = state.tasks.find(task => task.id === action.payload.id)
			if (task) {
				task.text = action.payload.text
				saveState(state.tasks)
			}
		},
		toggleTaskCompletion: (state, action: PayloadAction<string>) => {
			const task = state.tasks.find(task => task.id === action.payload)
			if (task) {
				task.completed = !task.completed
				saveState(state.tasks)
			}
		},
		clearCompletedTasks: state => {
			state.tasks = state.tasks.filter(task => !task.completed)
			saveState(state.tasks)
		},
		reorderTasks: (
			state,
			action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>
		) => {
			const [reorderedTask] = state.tasks.splice(action.payload.sourceIndex, 1)
			state.tasks.splice(action.payload.destinationIndex, 0, reorderedTask)
			saveState(state.tasks)
		},
	},
})

export const {
	setTasks,
	addTask,
	deleteTask,
	editTask,
	toggleTaskCompletion,
	clearCompletedTasks,
	reorderTasks,
} = tasksSlice.actions
export default tasksSlice.reducer
