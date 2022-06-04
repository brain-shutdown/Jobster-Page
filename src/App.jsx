import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing, Dashboard, Register, Error } from './pages/';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' exact element={<Dashboard />} />
				<Route path='/landing' exact element={<Landing />} />
				<Route path='/register' exact element={<Register />} />
				<Route path='/*' exact element={<Error />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
