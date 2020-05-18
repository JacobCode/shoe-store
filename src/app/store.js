import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cartManager';

export default configureStore({
	reducer: {
		cart: cartReducer
	},
});
