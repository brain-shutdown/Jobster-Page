import React, { useEffect, useState } from 'react';
import Wrapper from '../assets/wrappers/Job';
import { FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { IoNavigate } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { deleteJob, editJob } from '../features/job/jobSlice';
import { handleChange, setEditing, cancelEditing } from '../features/job/allJobsSlice';
import { toast } from 'react-toastify';

const Job = ({ id }) => {
	const { status_option, job_type_option, isLoading } = useSelector((store) => store.job);
	const { jobs, jobsEditing } = useSelector((store) => store.allJobs);
	const job = jobs.filter((job) => job._id === id)[0];
	const { updatedAt, company, position, jobLocation, jobType, status } = job;

	const [edit, setEdit] = useState(false);
	const dispatch = useDispatch();

	const updateDate = new Date(updatedAt);
	const formatUpdateDate = updateDate.toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!position || !company || !jobLocation) {
			toast.error('Please fill out all the fields!');
			return;
		}
		const orgJob = jobsEditing.filter((job) => job._id === id)[0];

		for (let key of Object.keys(orgJob)) {
			if (orgJob[key] !== job[key]) {
				dispatch(editJob(job));
				return;
			}
		}

		toast.warning('No changes.');
		dispatch(cancelEditing(id));
	};

	const handleJobInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		dispatch(handleChange({ id, name, value }));
	};

	useEffect(() => {
		setEdit(jobsEditing.some((obj) => obj._id === id));
	}, [jobsEditing, id]);

	return (
		<Wrapper>
			<header>
				<div className='main-icon'>{company.charAt(0)}</div>
				<div className='info'>
					<input
						type='text'
						name='position'
						className={edit ? 'text' : 'position'}
						value={position}
						onChange={handleJobInput}
						disabled={!edit}
					/>
					<input
						type='text'
						name='company'
						className={edit ? 'text' : 'company'}
						value={company}
						onChange={handleJobInput}
						disabled={!edit}
					/>
				</div>
			</header>
			<section className='content'>
				<div className='content-center'>
					<div className='media'>
						<span className='icon'>
							<IoNavigate />
						</span>
						<input
							type='text'
							name='jobLocation'
							className='text'
							value={jobLocation}
							onChange={handleJobInput}
							disabled={!edit}
						/>
					</div>
					<div className='media'>
						<span className='icon'>
							<FaCalendarAlt />
						</span>
						<input
							type='text'
							name='date'
							className='text'
							value={formatUpdateDate}
							disabled
							onChange={handleJobInput}
						/>
					</div>
					<div className='media'>
						<span className='icon'>
							<FaBriefcase />
						</span>
						<select
							name='jobType'
							className='text'
							value={jobType}
							disabled={!edit}
							onChange={handleJobInput}>
							{job_type_option.map((option, index) => {
								return (
									<option key={index} value={option}>
										{option}
									</option>
								);
							})}
						</select>
					</div>
					<select
						className={edit ? 'text' : `status ${status}`}
						type='text'
						name='status'
						value={status}
						disabled={!edit}
						onChange={handleJobInput}>
						{status_option.map((option, index) => {
							return (
								<option key={index} value={option}>
									{option}
								</option>
							);
						})}
					</select>
				</div>
				<footer>
					<div className='actions'>
						{!edit && (
							<>
								<button
									type='button'
									className='btn edit-btn'
									onClick={() => dispatch(setEditing({ job }))}>
									Edit
								</button>
								<button
									className='btn delete-btn'
									onClick={() => dispatch(deleteJob(id))}>
									Delete
								</button>
							</>
						)}
						{edit && (
							<>
								<button
									type='submit'
									disabled={isLoading}
									className='btn edit-btn'
									onClick={handleSubmit}>
									Submit
								</button>
								<button
									type='button'
									disabled={isLoading}
									className='btn delete-btn'
									onClick={() => dispatch(cancelEditing(id))}>
									Cancel
								</button>
							</>
						)}
					</div>
				</footer>
			</section>
		</Wrapper>
	);
};

export default Job;
