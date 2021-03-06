import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { FormRow, FormRowSelect } from '../../components';
import { clear, createJob, handleChange } from '../../features/job/jobSlice';

const AddJob = () => {
	const {
		position,
		company,
		jobLocation,
		status,
		jobType,
		status_option,
		job_type_option,
		isLoading,
	} = useSelector((store) => store.job);
	const { user } = useSelector((store) => store.user);
	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(handleChange({ name: 'jobLocation', value: user.location }));
	}, [user.location, dispatch]);

	function handleSubmit(e) {
		e.preventDefault();
		if (!position || !company || !jobLocation) {
			toast.error('Please fill out all the fields!');
			return;
		}
		dispatch(createJob({ position, company, jobLocation, status, jobType }));
	}
	function handleJobInput(e) {
		const name = e.target.name;
		const value = e.target.value;
		dispatch(handleChange({ name, value }));
	}

	return (
		<Wrapper>
			<form className='form' onSubmit={handleSubmit}>
				<h3>Add Job</h3>
				<div className='form-center'>
					<FormRow
						type='text'
						name='position'
						value={position}
						handleChange={handleJobInput}
					/>
					<FormRow
						type='text'
						name='company'
						value={company}
						handleChange={handleJobInput}
					/>
					<FormRow
						type='text'
						name='jobLocation'
						value={jobLocation}
						handleChange={handleJobInput}
						labelText='Job Location'
					/>
					<FormRowSelect
						name='status'
						value={status}
						options={status_option}
						handleChange={handleJobInput}
					/>
					<FormRowSelect
						name='jobType'
						value={jobType}
						options={job_type_option}
						handleChange={handleJobInput}
						labelText='Job Type'
					/>
					<div className='btn-container'>
						<button
							type='button'
							className='btn btn-block clear-btn'
							onClick={() => dispatch(clear())}>
							Clear
						</button>
						<button
							type='submit'
							className='btn btn-block submit-btn'
							disabled={isLoading}
							onSubmit={handleSubmit}>
							Submit
						</button>
					</div>
				</div>
			</form>
		</Wrapper>
	);
};

export default AddJob;
