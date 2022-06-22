import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getUserFromLocalStorage } from '../../utils/localStorage';

import { createJobThunk, deleteJobThunk, editJobThunk } from './jobThunk';

const initialState = {
	isLoading: false,
	position: '',
	company: '',
	jobLocation: getUserFromLocalStorage()?.location || '',
	status: 'pending',
	jobType: 'full-time',
	status_option: ['interview', 'declined', 'pending'],
	job_type_option: ['full-time', 'part-time', 'remote', 'internship'],
};

export const createJob = createAsyncThunk('/job/createJob', createJobThunk);

export const editJob = createAsyncThunk('/job/editJob', editJobThunk);

export const deleteJob = createAsyncThunk('/job/deleteJob', deleteJobThunk);

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
