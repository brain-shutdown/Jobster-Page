import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import { logoutUser } from '../user/userSlice';
import { hideLoading, showLoading, getAllJobs, clearEditing } from '../job/allJobsSlice';

const initialState = {
	isLoading: false,
	position: '',
	company: '',
	job_location: getUserFromLocalStorage()?.location || '',
	status: 'pending',
	job_type: 'full-time',
	status_option: ['interview', 'declined', 'pending'],
	job_type_option: ['full-time', 'part-time', 'remote', 'internship'],
};

export const createJob = createAsyncThunk('/job/createJob', async (job, thunkAPI) => {
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
});
export const editJob = createAsyncThunk('/job/editJob', async (job, thunkAPI) => {
	try {
		console.log(job);
		const response = await customFetch.patch(`/jobs/${job._id}`, job, {
			headers: {
				authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
			},
		});
		thunkAPI.dispatch(clearEditing(job._id));
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
});

export const deleteJob = createAsyncThunk('/job/deleteJob', async (jobID, thunkAPI) => {
	try {
		thunkAPI.dispatch(showLoading());
		const response = await customFetch.delete(`/jobs/${jobID}`, {
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
});

const jobSlice = createSlice({
	name: 'job',
	initialState,
	reducers: {
		handleChange: (state, { payload }) => {
			const { name, value } = payload;
			state[name] = value;
		},
		clear: () => {
			return {
				...initialState,
				location: getUserFromLocalStorage()?.location || '',
			};
		},
	},
	extraReducers: {
		[createJob.pending]: (state) => {
			state.isLoading = true;
		},
		[createJob.fulfilled]: (state) => {
			state.isLoading = false;
			toast.success(`Job Created!`);
		},
		[createJob.rejected]: (state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		},
		[deleteJob.pending]: (state) => {
			state.isLoading = true;
		},
		[deleteJob.fulfilled]: (state) => {
			state.isLoading = false;
			toast.success(`Job successfully removed!`);
		},
		[deleteJob.rejected]: (state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		},
		[editJob.pending]: (state) => {
			state.isLoading = true;
		},
		[editJob.fulfilled]: (state) => {
			state.isLoading = false;
			toast.success(`Job successfully updated!`);
		},
		[editJob.rejected]: (state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		},
	},
});

export const { handleChange, clear } = jobSlice.actions;
export default jobSlice.reducer;
