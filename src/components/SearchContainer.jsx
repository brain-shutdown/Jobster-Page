import React from 'react';
import Wrapper from '../assets/wrappers/SearchContainer';
import { FormRow, FormRowSelect } from './';

const SearchContainer = () => {
	return (
		<Wrapper>
			<form action='submit' className='form'>
				<h4>Search Form</h4>
				<div className='form-center'>
					<FormRow
						type='text'
						name='search'
						// value={}
						// handleChange={handleJobInput}
					/>
					<FormRowSelect
						name='status'
						// value={status}
						options={[1, 2, 3]}
						// handleChange={handleJobInput}
					/>
					<FormRowSelect
						name='type'
						// value={status}
						options={[1, 2, 3]}
						// handleChange={handleJobInput}
					/>
					<FormRowSelect
						name='sort'
						// value={status}
						options={[1, 2, 3]}
						// handleChange={handleJobInput}
					/>
					<button className='btn btn-block btn-danger'>Clear Filters</button>
				</div>
			</form>
		</Wrapper>
	);
};

export default SearchContainer;
