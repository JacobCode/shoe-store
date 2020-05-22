import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartManager';
import { Button } from "reactstrap";

export default function ShoeCard({ shoe, inCart }) {
	var { name, price, brand, img_url } = shoe;
	var dispatch = useDispatch();
	return (
		<div className="shoe-card">
			<div className="inner">
				<div className="info">
					<h6>{brand}</h6>
					<h1>{name}</h1>
				</div>
				<div className="shoe-image" style={{backgroundImage: `url('${img_url}')`}}></div>
				<span>${price}</span>
				{inCart ? 
				<Button className="add-to-cart in-cart">
					<i className="fas fa-check"></i>
				</Button>
				:
				<Button onClick={() => {
					dispatch(addToCart(shoe));
				}} className="add-to-cart">
					<i className="fas fa-plus"></i>
				</Button>}
			</div>
		</div>
	)
}