import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
	addUserToLocalStorage,
	getUserFromLocalStorage,
	removeUserFromLocalStorage,
} from '../../utils/localStorage';
import { registerUserThunk, updateUserThunk, clearStoreThunk } from './userThunk';

const initialState = {
	isLoading: false,
	isSidebarOpen: false,
	user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk('user/registerUser', registerUserThunk);
export const updateUser = createAsyncThunk('user/updateUser', updateUserThunk);
export const clearStore = createAsyncThunk('user/clearStore', clearStoreThunk);

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		toggleSidebar: (state) => {
			state.isSidebarOpen = !state.isSidebarOpen;
		},
		logoutUser: (state, { payload }) => {
			state.user = null;
			state.isSidebarOpen = false;
			removeUserFromLocalStorage();
			if (payload) {
				toast.success(payload);
			}
		},
	},
	extraReducers: {
		[registerUser.pending]: (state) => {
			state.isLoading = true;
		},
		[registerUser.fulfilled]: (state, { payload }) => {
			const { user } = payload;
			state.isLoading = false;
			state.user = user;
			addUserToLocalStorage(user);
			toast.success(`Welcome ${state.user.name}!`);
		},
		[registerUser.rejected]: (state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		},
		[updateUser.pending]: (state) => {
			state.isLoading = true;
		},
		[updateUser.fulfilled]: (state, { payload }) => {
			const { user } = payload;
			state.isLoading = false;
			state.user = user;
			addUserToLocalStorage(user);
			toast.success(`Profile updated!`);
		},
		[updateUser.rejected]: (state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		},
		[clearStore.rejected]: () => {
			toast.error('There was an error...');
		},
	},
});

export const { toggleSidebar, logoutUser } = userSlice.actions;
export default userSlice.reducer;
