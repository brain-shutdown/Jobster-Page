import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Wrapper from '../assets/wrappers/JobsContainer';
import { getAllJobs } from '../features/job/allJobsSlice';
import { Job, Loading } from './';

const JobContainer = () => {
	const { isLoading, jobs } = useSelector((store) => store.allJobs);
	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(getAllJobs());
	}, [dispatch]);

	if (isLoading) {
		return (
			<Wrapper>
				<Loading center />
			</Wrapper>
		);
	}

	if (jobs.length === 0) {
		return (
			<Wrapper>
				<h2>No jobs to display...</h2>
			</Wrapper>
		);
	}

	return (
		<Wrapper>
			<h5>{jobs.length} Jobs found</h5>
			<div className='jobs'>
				{jobs.map((job) => {
					return <Job key={job._id} id={job._id} />;
				})}
			</div>
		</Wrapper>
	);
};

export default JobContainer;
