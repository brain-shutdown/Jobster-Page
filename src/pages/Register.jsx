import React from 'react';
import Wrapper from '../assets/wrappers/RegisterPage';
import { Logo } from '../components';

const Register = () => {
	return (
		<Wrapper className='full-page'>
			<form action='submit' className='form'>
				<Logo />
				<h3>Login</h3>
				<div className='form-row'>
					<label htmlFor='email' className='form-label'>
						Email
					</label>
					<input type='email' name='email' id='email' className='form-input' />
				</div>
				<div className='form-row'>
					<label htmlFor='password' className='form-label'>
						Password
					</label>
					<input type='password' name='password' id='password' className='form-input' />
				</div>
				<button type='submit' className='btn btn-block'>
					Submit
				</button>
				<button type='submit' className='btn btn-block btn-hipster'>
					Demo App
				</button>
				<p>
					Not a member?
					<button type='button' className='member-btn'>
						Register Now
					</button>
				</p>
			</form>
		</Wrapper>
	);
};

export default Register;
