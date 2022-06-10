import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import { logoutUser } from '../user/userSlice';

const initialState = {
	isLoading: false,
	position: '',
	company: '',
	job_location: getUserFromLocalStorage()?.location || '',
	status: 'pending',
	job_type: 'full-time',
	status_option: ['interview', 'declined', 'pending'],
	job_type_option: ['full-time', 'part-time', 'remote', 'internship'],
	isEditing: false,
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
	},
});

export const { handleChange, clear } = jobSlice.actions;
export default jobSlice.reducer;
