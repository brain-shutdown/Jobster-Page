import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
	isLoading: true,
	user: null,
};

export const loginUser = createAsyncThunk('/user/loginUser', async (user, thunkAPI) => {
	console.log(user);
});
export const registerUser = createAsyncThunk('/user/registerUser', async (user, thunkAPI) => {
	console.log(user);
});

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
});

export default userSlice.reducer;
