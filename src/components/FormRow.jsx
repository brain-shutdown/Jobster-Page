import React from 'react';

const FormRow = ({ type, name, value, autocomplete, labelText, handleChange }) => {
	return (
		<div className='form-row'>
			<label htmlFor={name} className='form-label'>
				{labelText || name}
			</label>
			<input
				type={type}
				name={name}
				id={name}
				className='form-input'
				onChange={handleChange}
				value={value}
				autoComplete={autocomplete}
			/>
		</div>
	);
};

export default FormRow;
