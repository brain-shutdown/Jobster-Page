import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editJob, deleteJob } from '../features/job/jobSlice';
import { handleChange, cancelEditing, setEditing } from '../features/job/allJobsSlice';
import { toast } from 'react-toastify';

const useJobData = (id) => {
	const [edit, setEdit] = useState(false);
	const { jobs, jobsEditing } = useSelector((store) => store.allJobs);
	const dispatch = useDispatch();

	const job = jobs.filter((job) => job._id === id)[0];
	const { updatedAt, company, position, jobLocation, jobType, status } = job;
	const updateDate = new Date(updatedAt);
	const date = updateDate.toLocaleDateString('en-US', {
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

	const handleEditOrSubmission = (e) => {
		if (edit) {
			handleSubmit(e);
			return;
		}
		dispatch(setEditing({ job }));
	};

	const handleCancelOrDeletion = () => {
		if (edit) {
			dispatch(cancelEditing(id));
			return;
		}
		dispatch(deleteJob(id));
	};

	const handleJobInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		dispatch(handleChange({ id, name, value }));
	};

	useEffect(() => {
		setEdit(jobsEditing.some((obj) => obj._id === id));
	}, [jobsEditing, id]);

	return {
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
	};
};

export default useJobData;
