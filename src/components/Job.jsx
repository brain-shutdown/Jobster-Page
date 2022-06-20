import React from 'react';
import Wrapper from '../assets/wrappers/Job';
import { FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { IoNavigate } from 'react-icons/io5';
import useJobData from '../hooks/useJobData';
import { MediaSelect, MediaInput } from './';

const Job = ({ id }) => {
	const { status_option, job_type_option, isLoading } = useSelector((store) => store.job);
	const {
		handleEditOrSubmission,
		handleCancelOrDeletion,
		handleJobInput,
		date,
		edit,
		company,
		position,
		jobLocation,
		jobType,
		status,
	} = useJobData(id);

	return (
		<Wrapper onSubmit={handleEditOrSubmission}>
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
					<MediaInput
						icon={<IoNavigate />}
						name={'jobLocation'}
						value={jobLocation}
						disabled={!edit}
						handleChange={handleJobInput}
					/>
					<MediaInput
						icon={<FaCalendarAlt />}
						name={'date'}
						value={date}
						disabled={true}
						handleChange={handleJobInput}
					/>
					<MediaSelect
						icon={<FaBriefcase />}
						name={'jobType'}
						value={jobType}
						disabled={!edit}
						handleChange={handleJobInput}
						options={job_type_option}
					/>
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
						<button
							type={edit ? 'submit' : 'button'}
							disabled={isLoading}
							className='btn edit-btn'
							onClick={handleEditOrSubmission}>
							{edit ? 'Submit' : 'Edit'}
						</button>
						<button
							type='button'
							disabled={isLoading}
							className='btn delete-btn'
							onClick={handleCancelOrDeletion}>
							{edit ? 'Cancel' : 'Delete'}
						</button>
					</div>
				</footer>
			</section>
		</Wrapper>
	);
};

export default Job;
