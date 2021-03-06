import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getAllJobsThunk, showStatsThunk } from './allJobsThunk';

const initialFilterState = {
	search: '',
	searchStatus: 'all',
	searchType: 'all',
	sort: 'latest',
	sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState = {
	isLoading: false,
	jobs: [],
	jobsEditing: [],
	totalJobs: 0,
	numPages: 1,
	page: 1,
	stats: {},
	monthlyApplications: [],
	...initialFilterState,
};

export const getAllJobs = createAsyncThunk('jobs/getAllJobs', getAllJobsThunk);

export const showStats = createAsyncThunk('jobs/showStats', showStatsThunk);

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
		handleSearch: (state, { payload: { name, value } }) => {
			state.page = 1;
			state[name] = value;
		},
		clearFilters: (state) => {
			return {
				...state,
				...initialFilterState,
			};
		},
		setCurrentPage: (state, { payload }) => {
			state.page = payload;
		},
		clearAllJobsState: () => initialState,
	},
	extraReducers: {
		[getAllJobs.pending]: (state) => {
			state.isLoading = true;
		},
		[getAllJobs.fulfilled]: (state, { payload: { jobs, numOfPages, totalJobs } }) => {
			state.isLoading = false;
			state.jobs = jobs;
			state.numPages = numOfPages;
			state.totalJobs = totalJobs;
		},
		[getAllJobs.rejected]: (state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		},
		[showStats.pending]: (state) => {
			state.isLoading = true;
		},
		[showStats.fulfilled]: (state, { payload: { monthlyApplications, defaultStats } }) => {
			state.isLoading = false;
			state.stats = defaultStats;
			state.monthlyApplications = monthlyApplications;
		},
		[showStats.rejected]: (state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		},
	},
});

export const {
	showLoading,
	hideLoading,
	handleChange,
	setEditing,
	clearEditing,
	cancelEditing,
	handleSearch,
	clearFilters,
	setCurrentPage,
	clearAllJobsState,
} = allJobsSlice.actions;
export default allJobsSlice.reducer;
