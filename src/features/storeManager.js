import { createSlice } from '@reduxjs/toolkit';

export const storeManager = createSlice({
	name: 'storeResults',
	initialState: {
		results: []
	},
	reducers: {
		setStoreResults: (state, action) => {
			state.results = action.payload;
		}
	}
})

export const { setStoreResults } = storeManager.actions;

export const selectResults = state => state.results;

export default storeManager.reducer;