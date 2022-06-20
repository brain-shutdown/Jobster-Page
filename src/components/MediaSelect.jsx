import React from 'react';

const MediaSelect = ({ icon, value, name, disabled, handleChange, options }) => {
	return (
		<div className='media'>
			<span className='icon'>{icon}</span>
			<select
				name={name}
				className='text'
				value={value}
				disabled={disabled}
				onChange={handleChange}>
				{options.map((option, index) => {
					return (
						<option key={index} value={option}>
							{option}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export default MediaSelect;
