import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing, Dashboard, Register, Error } from './pages/';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' exact element={<Dashboard />} />
				<Route path='/landing' exact element={<Landing />} />
				<Route path='/register' exact element={<Register />} />
				<Route path='/*' exact element={<Error />} />
			</Routes>
			<ToastContainer
				position='top-center'
				autoClose={3000}
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
