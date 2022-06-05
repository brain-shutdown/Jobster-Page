import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing, Register, Error, PrivateRoute } from './pages/';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AddJob, AllJobs, Profile, SharedLayout, Stats } from './pages/Dashboard';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					exact
					element={
						<PrivateRoute>
							<SharedLayout />
						</PrivateRoute>
					}>
					<Route index element={<Stats />} />
					<Route path='all-jobs' element={<AllJobs />} />
					<Route path='add-job' element={<AddJob />} />
					<Route path='profile' element={<Profile />} />
				</Route>
				<Route path='/landing' exact element={<Landing />} />
				<Route path='/register' exact element={<Register />} />
				<Route path='/*' exact element={<Error />} />
			</Routes>
			<ToastContainer
				position='top-center'
				autoClose={process.env.REACT_APP_TIMEOUT}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='colored'
			/>
		</BrowserRouter>
	);
}

export default App;
