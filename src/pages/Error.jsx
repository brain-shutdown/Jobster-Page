import React from 'react';
import Wrapper from '../assets/wrappers/ErrorPage';
import error_img from '../assets/images/not-found.svg';
import { Link } from 'react-router-dom';

const Error = () => {
	return (
		<Wrapper className='full-page'>
			<div>
				<img src={error_img} alt='Page not found' />
				<h3>Ohh! Page not found!</h3>
				<p>We can't seem to find the page you're looking for.</p>
				<Link to='/' className='btn btn-hipster'>
					Back Home
				</Link>
			</div>
		</Wrapper>
	);
};

export default Error;
