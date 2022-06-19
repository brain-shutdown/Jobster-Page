import React from 'react';
import Wrapper from '../assets/wrappers/JobInfo';

const JobInfo = ({ info, icon }) => {
	return (
		<Wrapper>
			<span className='icon'>{icon}</span>
			<span className='text'>{info}</span>
		</Wrapper>
	);
};

export default JobInfo;
