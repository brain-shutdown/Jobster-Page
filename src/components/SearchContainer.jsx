import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../assets/wrappers/SearchContainer';
import { handleSearch, clearFilters } from '../features/job/allJobsSlice';
import { FormRow, FormRowSelect } from './';

const SearchContainer = () => {
	const { searchStatus, searchType, sort, sortOptions, search, isLoading } = useSelector(
		(store) => store.allJobs
	);
	const { status_option, job_type_option } = useSelector((store) => store.job);
	const dispatch = useDispatch();

	const handleChange = (e) => {
		// if (isLoading) return;
		const name = e.target.name;
		const value = e.target.value;
		dispatch(handleSearch({ name, value }));
	};

	const handleClearFilters = () => {
		dispatch(clearFilters());
	};

	return (
		<Wrapper>
			<form action='submit' className='form'>
				<h4>Search Form</h4>
				<div className='form-center'>
					<FormRow type='text' name='search' value={search} handleChange={handleChange} />
					<FormRowSelect
						labelText='status'
						name='searchStatus'
						value={searchStatus}
						options={['all', ...status_option]}
						handleChange={handleChange}
					/>
					<FormRowSelect
						labelText='Type'
						name='searchType'
						value={searchType}
						options={['all', ...job_type_option]}
						handleChange={handleChange}
					/>
					<FormRowSelect
						name='sort'
						value={sort}
						options={['all', ...sortOptions]}
						handleChange={handleChange}
					/>
					<button
						type='button'
						className='btn btn-block btn-danger'
						disabled={isLoading}
						onClick={handleClearFilters}>
						Clear Filters
					</button>
				</div>
			</form>
		</Wrapper>
	);
};

export default SearchContainer;
