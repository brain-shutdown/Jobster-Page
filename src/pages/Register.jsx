import React, { useState } from 'react';
import Wrapper from '../assets/wrappers/RegisterPage';
import { Logo, FormRow } from '../components';
import { toast } from 'react-toastify';
import { registerUser } from '../features/user/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const initialState = {
	name: '',
	email: '',
	password: '',
	isMember: true,
};

const Register = () => {
	const [values, setValues] = useState(initialState);
	const { isLoading, user } = useSelector((store) => store.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	React.useEffect(() => {
		if (user && !isLoading) {
			navigate('/');
		}
	}, [user, navigate, isLoading]);

	function handleChange(e) {
		let name = e.target.name;
		let value = e.target.value;
		setValues({ ...values, [name]: value });
	}

	function handleSubmit(e) {
		e.preventDefault();
		const { name, email, password, isMember } = values;
		if (!email || !password || (!isMember && !name)) {
			toast.error('Please fill out all fields!');
			return;
		}
		if (isMember) {
			dispatch(registerUser({ type: 'login', email, password }));
			return;
		}
		dispatch(registerUser({ type: 'register', name, email, password }));
	}

	function toggleMember() {
		setValues({ ...values, isMember: !values.isMember });
	}

	return (
		<Wrapper className='full-page'>
			<form action='submit' className='form' onSubmit={handleSubmit}>
				<Logo />
				<h3>{!values.isMember ? 'Register' : 'Login'}</h3>
				{!values.isMember && (
					<FormRow
						type='text'
						name='name'
						value={values.name}
						handleChange={handleChange}
						autocomplete='name'
					/>
				)}
				<FormRow
					type='email'
					name='email'
					value={values.email}
					handleChange={handleChange}
					autocomplete='username'
				/>
				<FormRow
					type='password'
					name='password'
					value={values.password}
					handleChange={handleChange}
					autocomplete={values.isMember ? 'current-password' : 'new-password'}
				/>
				<button type='submit' className='btn btn-block' disabled={isLoading}>
					{isLoading ? 'Loading...' : 'Submit'}
				</button>
				<button
					type='submit'
					className='btn btn-block btn-hipster'
					disabled={isLoading}
					onClick={() =>
						dispatch(
							registerUser({
								type: 'login',
								email: 'testUser@test.com',
								password: 'secret',
							})
						)
					}>
					{isLoading ? 'Loading...' : 'Demo App'}
				</button>
				<p>
					{values.isMember ? 'Not a member?' : 'Already a member?'}
					<button type='button' className='member-btn' onClick={toggleMember}>
						{values.isMember ? 'Register Now' : 'Login'}
					</button>
				</p>
			</form>
		</Wrapper>
	);
};

export default Register;
