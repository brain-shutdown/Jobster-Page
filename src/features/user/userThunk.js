import customFetch, { checkUnauthorizedResponse } from '../../utils/axios';
import { logoutUser } from './userSlice';
import { clear } from '../job/jobSlice';
import { clearAllJobsState } from '../job/allJobsSlice';

export const registerUserThunk = async (user, thunkAPI) => {
	try {
		// url can be for login or register
		const response = await customFetch.post(`/auth/${user.type}`, user);
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
};

export const updateUserThunk = async (user, thunkAPI) => {
	try {
		const response = await customFetch.patch('/auth/updateUser', user);
		return response.data;
	} catch (error) {
		return checkUnauthorizedResponse(error, thunkAPI);
	}
};

export const clearStoreThunk = async (message, thunkAPI) => {
	try {
		thunkAPI.dispatch(logoutUser(message));
		thunkAPI.dispatch(clearAllJobsState());
		thunkAPI.dispatch(clear());
		return Promise.resolve();
	} catch (error) {
		return Promise.reject();
	}
};
