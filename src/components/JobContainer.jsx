import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Wrapper from '../assets/wrappers/JobsContainer';
import { getAllJobs } from '../features/job/allJobsSlice';
import { Job, Loading, PageBtnContainer } from './';

const JobContainer = () => {
	const { isLoading, jobs, totalJobs, numPages, search, searchStatus, searchType, sort, page } =
		useSelector((store) => store.allJobs);
	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(getAllJobs());
	}, [dispatch, page, sort, searchStatus, searchType]);

	React.useEffect(() => {
		const timeout = setTimeout(() => dispatch(getAllJobs()), 300);
		return () => clearTimeout(timeout);
	}, [dispatch, search]);

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
			<h5>
				{totalJobs} Job{totalJobs > 1 && 's'} found
			</h5>
			<div className='jobs'>
				{jobs.map((job) => {
					return <Job key={job._id} id={job._id} />;
				})}
			</div>
			{numPages > 1 && <PageBtnContainer />}
		</Wrapper>
	);
};

export default JobContainer;
