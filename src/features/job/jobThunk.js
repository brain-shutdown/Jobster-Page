import customFetch from '../../utils/axios';
import { showLoading, getAllJobs, hideLoading, clearEditing } from './allJobsSlice';
import { clear } from './jobSlice';
import { logoutUser } from '../user/userSlice';

export const deleteJobThunk = async (url, thunkAPI) => {
	try {
		thunkAPI.dispatch(showLoading());
		const response = await customFetch.delete(url);
		thunkAPI.dispatch(getAllJobs());
		return response.data;
	} catch (error) {
		thunkAPI.dispatch(hideLoading());
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
};

export const editJobThunk = async (url, job, thunkAPI) => {
	try {
		const response = await customFetch.patch(url, job);
		thunkAPI.dispatch(clearEditing(job._id));
		thunkAPI.dispatch(getAllJobs());
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
};

export const createJobThunk = async (job, thunkAPI) => {
	try {
		const response = await customFetch.post('/jobs', job);
		thunkAPI.dispatch(clear());
		return response.data;
	} catch (error) {
		if (error.response.status === 401) {
			thunkAPI.dispatch(logoutUser());
			return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
		}
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
};
