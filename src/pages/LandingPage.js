import React from 'react';
import logo from '../images/logo.svg';
import main from '../images/main.svg';
import Wrapper from '../wrappers/LandingPage';
import { Link } from 'react-router-dom';

const LandingPage = () => {
	return (
		<Wrapper>
			<nav>
				<img src={logo} alt='logo' className='logo' />
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
					{/* <Link to='/login'>Login/Register</Link> */}
				</div>
				<img src={main} alt='Job Hunt' className='img main-img' />
			</div>
		</Wrapper>
	);
};

export default LandingPage;
