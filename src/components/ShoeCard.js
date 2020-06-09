import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartManager';
import { TweenMax, TweenLite, Linear } from 'gsap';
import { Button, Input } from 'reactstrap';

export default function ShoeCard({ shoe, inCart }) {
	var { name, price, brand, img_url, size } = shoe;
	var dispatch = useDispatch();
	var [chosenSize, selectSize] = useState("8")
	var sizes = [7, 8, 9, 10, 11, 12, 13];
	var card = useRef(null);
	useEffect(() => {
		TweenLite.delayedCall(0.25, () => {
			TweenMax.to(card, 1, {
				duration: 1,
				opacity: 1,
				ease: Linear.easeInOut,
			});
		})
	}, []);
	return (
		<div className="shoe-card" ref={el => card = el}>
			<div className="inner">
				<div className="info">
					<h6>{brand} - ${price}</h6>
					<h1>{name}</h1>
				</div>
				<div className="shoe-image" style={{backgroundImage: `url('${img_url}')`}}></div>
				<Input type="select" defaultValue={size} onChange={(e) => {
					selectSize(e.target.value);
				}} disabled={inCart} name="size_select">
					{sizes.map((s) => {
						return (
							<option key={s}>{s}</option>
						)
					})}
				</Input>
				{inCart ? 
				<Button className="add-to-cart in-cart toggle add">
					<svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 64 64"><path data-name="layer1" fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="6" d="M16 33l11 11 21-22"></path></svg>
				</Button>
				:
				<Button onClick={() => {
					var addShoe = {...shoe, size: chosenSize}
					dispatch(addToCart(addShoe));
				}} className="add-to-cart">
					<svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 64 64"><path data-name="layer1" fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="6" d="M32 16v32m16-16H16"></path></svg>
				</Button>}
			</div>
		</div>
	)
}