import React from 'react';

const FormRowSelect = ({ name, value, options, labelText, handleChange }) => {
	return (
		<div className='form-row'>
			<label htmlFor='name' className='form-label'>
				{labelText || name}
			</label>
			<select
				name={name}
				id={name}
				className='form-select'
				onChange={handleChange}
				value={value}>
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

export default FormRowSelect;
