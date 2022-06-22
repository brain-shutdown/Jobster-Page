import customFetch, { checkUnauthorizedResponse } from '../../utils/axios';
import { showLoading, getAllJobs, hideLoading, clearEditing } from './allJobsSlice';
import { clear } from './jobSlice';

export const deleteJobThunk = async (jobID, thunkAPI) => {
	try {
		thunkAPI.dispatch(showLoading());
		const response = await customFetch.delete(`/jobs/${jobID}`);
		thunkAPI.dispatch(getAllJobs());
		return response.data;
	} catch (error) {
		thunkAPI.dispatch(hideLoading());
		return checkUnauthorizedResponse(error, thunkAPI);
	}
};

export const editJobThunk = async (job, thunkAPI) => {
	try {
		const response = await customFetch.patch(`/jobs/${job._id}`, job);
		thunkAPI.dispatch(clearEditing(job._id));
		thunkAPI.dispatch(getAllJobs());
		return response.data;
	} catch (error) {
		return checkUnauthorizedResponse(error, thunkAPI);
	}
};

export const createJobThunk = async (job, thunkAPI) => {
	try {
		const response = await customFetch.post('/jobs', job);
		thunkAPI.dispatch(clear());
		console.log(job, response.data);
		return response.data;
	} catch (error) {
		return checkUnauthorizedResponse(error, thunkAPI);
	}
};
