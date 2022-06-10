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
		job_location,
		status,
		job_type,
		status_option,
		job_type_option,
		isLoading,
		isEditing,
	} = useSelector((store) => store.job);
	const { user } = useSelector((store) => store.user);
	const dispatch = useDispatch();

	React.useEffect(() => {
		if (!isEditing) {
			dispatch(handleChange({ name: 'job_location', value: user.location }));
		}
	}, [isEditing, user.location, dispatch]);

	function handleSubmit(e) {
		e.preventDefault();
		if (!position || !company || !job_location) {
			toast.error('Please fill out all the fields!');
			return;
		}
		dispatch(createJob({ position, company, job_location, status, job_type }));
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
						name='job_location'
						value={job_location}
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
						name='job_type'
						value={job_type}
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
