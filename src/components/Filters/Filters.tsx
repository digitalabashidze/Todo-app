import { useMediaQuery } from 'react-responsive'
import styles from './Filters.module.css'

interface FiltersProps {
	filter: string
	quantity: number
	setFilter: (filter: string) => void
	clearCompleted: () => void
}

const Filters = ({
	filter,
	setFilter,
	quantity,
	clearCompleted,
}: FiltersProps) => {
	const isTabletOrMobile = useMediaQuery({ maxWidth: 768 })

	return (
		<>
			{!isTabletOrMobile && (
				<div className={styles.filters}>
					<div className={styles['quantity']}>
						<span>{quantity} items left</span>
					</div>
					<div className={styles['filters-btn-wrapper']}>
						<button
							className={filter === 'all' ? styles.active : ''}
							onClick={() => setFilter('all')}
						>
							All
						</button>
						<button
							className={filter === 'active' ? styles.active : ''}
							onClick={() => setFilter('active')}
						>
							Active
						</button>
						<button
							className={filter === 'completed' ? styles.active : ''}
							onClick={() => setFilter('completed')}
						>
							Completed
						</button>
					</div>
					<button className={styles['clear-btn']} onClick={clearCompleted}>
						Clear Completed
					</button>
				</div>
			)}
			{isTabletOrMobile && (
				<>
					<div className={styles.filters}>
						<div className={styles['quantity']}>
							<span>{quantity} items left</span>
						</div>

						<button className={styles['clear-btn']} onClick={clearCompleted}>
							Clear Completed
						</button>
					</div>
					<div className={styles['filters-btn-wrapper']}>
						<button
							className={filter === 'all' ? styles.active : ''}
							onClick={() => setFilter('all')}
						>
							All
						</button>
						<button
							className={filter === 'active' ? styles.active : ''}
							onClick={() => setFilter('active')}
						>
							Active
						</button>
						<button
							className={filter === 'completed' ? styles.active : ''}
							onClick={() => setFilter('completed')}
						>
							Completed
						</button>
					</div>
				</>
			)}
		</>
	)
}

export default Filters
