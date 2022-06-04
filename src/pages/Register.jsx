import React, { useState } from 'react';
import Wrapper from '../assets/wrappers/RegisterPage';
import { Logo, FormRow } from '../components';
import { toast } from 'react-toastify';

const initialState = {
	name: '',
	email: '',
	password: '',
	isMember: true,
};

const Register = () => {
	const [values, setValues] = useState(initialState);

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
						labelText='name'
					/>
				)}
				<FormRow
					type='email'
					name='email'
					value={values.email}
					handleChange={handleChange}
					autocomplete='username'
					labelText='email'
				/>
				<FormRow
					type='password'
					name='password'
					value={values.password}
					handleChange={handleChange}
					autocomplete={values.isMember ? 'current-password' : 'new-password'}
					labelText='password'
				/>
				<button type='submit' className='btn btn-block'>
					Submit
				</button>
				<button type='submit' className='btn btn-block btn-hipster'>
					Demo App
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
