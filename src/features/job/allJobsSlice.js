import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';

const initialFilterState = {
	search: '',
	searchStatus: 'all',
	searchType: 'all',
	sort: 'latest',
	sortOptions: ['latest', 'oldest', 'A-Z', 'Z-A'],
};

const initialState = {
	isLoading: false,
	jobs: [],
	jobsEditing: [],
	totalJobs: 0,
	numPages: 1,
	page: 1,
	...initialFilterState,
};

export const getAllJobs = createAsyncThunk('/allJobs/getAllJobs', async (_, thunkAPI) => {
	try {
		const response = await customFetch.get('/jobs');
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
});

const allJobsSlice = createSlice({
	name: 'allJobs',
	initialState,
	reducers: {
		showLoading: (state) => {
			state.isLoading = true;
		},
		hideLoading: (state) => {
			state.isLoading = false;
		},
		handleChange: (state, { payload: { id, name, value } }) => {
			state.jobs.forEach((job) => {
				if (job._id === id) {
					job[name] = value;
				}
			});
		},
		setEditing: (state, { payload: { job } }) => {
			if (!state.jobsEditing.some((obj) => obj._id === job._id)) {
				state.jobsEditing.push(job);
			}
		},
		clearEditing: (state, { payload: id }) => {
			state.jobsEditing = state.jobsEditing.filter((job) => job._id !== id);
		},
		cancelEditing: (state, { payload: id }) => {
			const { company, position, status, jobType, jobLocation } = state.jobsEditing.filter(
				(job) => job._id === id
			)[0];
			state.jobs.forEach((job) => {
				if (job._id === id) {
					job.company = company;
					job.position = position;
					job.status = status;
					job.jobType = jobType;
					job.jobLocation = jobLocation;
				}
			});
			state.jobsEditing = state.jobsEditing.filter((job) => job._id !== id);
		},
	},
	extraReducers: {
		[getAllJobs.pending]: (state) => {
			state.isLoading = true;
		},
		[getAllJobs.fulfilled]: (state, { payload: { jobs } }) => {
			state.isLoading = false;
			state.jobs = jobs;
		},
		[getAllJobs.rejected]: (state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		},
	},
});

export const { showLoading, hideLoading, handleChange, setEditing, clearEditing, cancelEditing } =
	allJobsSlice.actions;
export default allJobsSlice.reducer;
