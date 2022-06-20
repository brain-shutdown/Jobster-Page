import customFetch from '../../utils/axios';
import { showLoading, getAllJobs, hideLoading, clearEditing } from './allJobsSlice';
import { clear } from './jobSlice';
import { logoutUser } from '../user/userSlice';

export const deleteJobThunk = async (url, thunkAPI) => {
	try {
		thunkAPI.dispatch(showLoading());
		const response = await customFetch.delete(url, {
			headers: {
				authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
			},
		});
		thunkAPI.dispatch(getAllJobs());
		return response.data;
	} catch (error) {
		thunkAPI.dispatch(hideLoading());
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
};

export const editJobThunk = async (url, job, thunkAPI) => {
	try {
		const response = await customFetch.patch(url, job, {
			headers: {
				authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
			},
		});
		thunkAPI.dispatch(clearEditing(job._id));
		thunkAPI.dispatch(getAllJobs());
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
};

export const createJobThunk = async (url, job, thunkAPI) => {
	try {
		const response = await customFetch.post('/jobs', job, {
			headers: {
				authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
			},
		});
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
