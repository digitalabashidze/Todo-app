import { Provider } from 'react-redux'
import store from './redux/store'
import TaskList from './components/TaskList/TaskList'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

function App() {
	return (
		<Provider store={store}>
			<div className='app'>
				<Header />
				<main className='main'>
					<div className='container'>
						<TaskList />
					</div>
				</main>
				<Footer />
			</div>
		</Provider>
	)
}

export default App
