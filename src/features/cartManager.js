import { createSlice } from '@reduxjs/toolkit';

export const cartManager = createSlice({
	name: 'cart',
	initialState: {
		cart: [
			{
				brand: "Adidas",
				color: "Blue",
				gender: "Men",
				img_url: "https://www.flightclub.com/media/catalog/product/cache/1/image/1600x1140/9df78eab33525d08d6e5fb8d27136e95/8/0/804067_01.jpg",
				name: "PW HU HOLI NMD MC PEACE",
				price: 550,
				_id: "5ec0cf256439500631e62446"
			},
			{
				brand: "Adidas",
				color: "Grey",
				gender: "Men",
				img_url: "https://www.flightclub.com/media/catalog/product/cache/1/image/1600x1140/9df78eab33525d08d6e5fb8d27136e95/8/0/805220_01.jpg",
				name: "YEEZY BOOST 350 V2",
				price: 325,
				_id: "5ec0cf256439500631e62447"
			}
		]
	},
	reducers: {
		addToCart: (state, action) => {
			state.cart = [...state.cart, action.payload];
		},
		removeFromCart: (state, action) => {
			state.cart = [...state.cart.filter((item) => item._id !== action.payload)];
		}
	},
});

export const { addToCart, removeFromCart } = cartManager.actions;

export const selectCart = state => state.cart;

export default cartManager.reducer;
