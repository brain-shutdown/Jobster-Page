import customFetch, { checkUnauthorizedResponse } from '../../utils/axios';

export const getAllJobsThunk = async (_, thunkAPI) => {
	const { search, searchStatus, searchType, sort, page } = thunkAPI.getState().allJobs;
	console.log(search);
	let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
	if (search) {
		url += `&search=${search}`;
	}
	try {
		const response = await customFetch.get(url);
		return response.data;
	} catch (error) {
		return checkUnauthorizedResponse(error, thunkAPI);
	}
};

export const showStatsThunk = async (thunkAPI) => {
	try {
		const response = await customFetch.get('/jobs/stats');
		return response.data;
	} catch (error) {
		return checkUnauthorizedResponse(error, thunkAPI);
	}
};
