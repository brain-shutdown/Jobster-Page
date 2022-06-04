import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../components';

import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';

const LandingPage = () => {
	return (
		<Wrapper>
			<nav>
				<Logo />
			</nav>
			<div className='container page'>
				<div className='info'>
					<h1>
						Job <span>Tracking</span> App
					</h1>
					<p>
						Crucifix narwhal street art asymmetrical, humblebrag tote bag pop-up fixie
						raclette taxidermy craft beer. Brunch bitters synth, VHS crucifix heirloom
						meggings bicycle rights.
					</p>
					<Link to='/register' className='btn btn-hero'>
						Login/Register
					</Link>
				</div>
				<img src={main} alt='Job Hunt' className='img main-img' />
			</div>
		</Wrapper>
	);
};

export default LandingPage;
