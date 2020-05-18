import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartManager';

export default function Store() {
	var dispatch = useDispatch();
	// test data
	var newShoe = {
		"_id": "5ec0cf256439500631e62448",
		"brand": "Adidas",
		"name": "PW HU HOLI NMD MC PASSION",
		"color": "Red",
		"price": 535,
		"gender": "Men",
		"img_url": "https://www.flightclub.com/media/catalog/product/cache/1/image/1600x1140/9df78eab33525d08d6e5fb8d27136e95/8/0/804068_01.jpg"
	};
	return (
		<div>
			<h1 onClick={() => dispatch(addToCart(newShoe))}>Add Shoe</h1>
		</div>
	)
}