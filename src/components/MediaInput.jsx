import React from 'react';

const MediaInput = ({ icon, value, name, disabled, handleChange }) => {
	return (
		<div className='media'>
			<span className='icon'>{icon}</span>
			<input
				type='text'
				name={name}
				className='text'
				value={value}
				disabled={disabled}
				onChange={handleChange}
			/>
		</div>
	);
};

export default MediaInput;
