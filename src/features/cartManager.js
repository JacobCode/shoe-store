import { createSlice } from '@reduxjs/toolkit';

const initialState = () => {
	try {
		return JSON.parse(localStorage.shoeCart);
	} catch {
		return []
	}
}

const saveToStorage = (key, value) => {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch {
		return;
	}
}

export const cartManager = createSlice({
	name: 'cart',
	initialState: {
		cart: initialState()
	},
	reducers: {
		addToCart: (state, action) => {
			state.cart = [...state.cart, action.payload];
			saveToStorage('shoeCart', state.cart);
		},
		removeFromCart: (state, action) => {
			state.cart = [...state.cart.filter((item) => item._id !== action.payload)];
			saveToStorage('shoeCart', state.cart);
		},
		emptyCart: (state) => {
			state.cart = [];
			saveToStorage('shoeCart', []);
		}
	},
});

export const { addToCart, removeFromCart, emptyCart } = cartManager.actions;

export const selectCart = state => state.cart;

export default cartManager.reducer;
