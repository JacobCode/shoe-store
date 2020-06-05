import React, { useEffect, useState, useRef } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm';
import { removeFromCart } from '../features/cartManager';
import { useDispatch } from 'react-redux';
import { TweenMax, Power1 } from 'gsap';
import { Container, Row, Col, Button } from 'reactstrap';
import emptyCart from '../media/add-to-cart.svg';

export default function ShoppingCart(props) {
	var { cart } = props;
	var dispatch = useDispatch();
	var stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
	var [subtotal, setSubtotal] = useState(0);
	var [formIsOpen, toggleForm] = useState(false);
	var shoes = useRef([]);
	useEffect(() => {
		function getSum(total, num) {
			return total + num;
		}
		if (cart.length > 0) {
			var numbers = [];
			cart.forEach(item => numbers.push(item.price));
			setSubtotal(numbers.reduce(getSum));
		} else {
			setSubtotal(0);
		}
	}, [cart]);
	useEffect(() => {
		TweenMax.staggerTo(shoes.current, 1, {
			duration: 0.5,
			opacity: 1,
			ease: Power1.easeInOut,
		}, 0);
	}, []);
	return (
		<div id="cart">
			<Container>
				<Row className="row-top">
					<Col className="col-center font-weight-bold" xs="6">Name</Col>
					<Col className="col-center font-weight-bold" xs="3">Size</Col>
					<Col className="col-center font-weight-bold" xs="3">Price</Col>
				</Row>
				{cart.length > 0 ? 
				<div className="cart-items">
					{cart.map((shoe, i) => {
						var { _id, name, price, size } = shoe;
						return (
							<div ref={el => shoes.current[i] = el} className={`item row ${(i + 1) !== cart.length ? 'mb-4' : ''}`} key={_id}>
								<Col xs="6" className="col-center d-flex justify-content-between">
									<p>{name}</p> 
									<i onClick={() => {
										dispatch(removeFromCart(_id))
									}} className="far fa-trash-alt"></i>
								</Col>
								<Col xs="3" className="col-center">
									<p>{size}</p>
								</Col>
								<Col xs="3" className="col-center">${price}.00</Col>
							</div>
						)
					})}
				</div>
				:
				<div className="cart-empty">
					<img alt="No Items In Cart" src={emptyCart} />
				</div>}
				<Row className="row-bottom">
					<Col className="col-center" xs="6">
						<Button className="font-weight-bold" color="primary" disabled={cart.length === 0} onClick={() => {
							toggleForm(true);
						}}>Checkout</Button>
					</Col>
					<Col className="col-center align-items-center" md="3" sm="3">Items: {cart.length}</Col>
					<Col className="col-center d-flex align-items-center" xs="6" sm="3" md="3">Subtotal: <span className="ml-1 font-weight-bold">${subtotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.00</span></Col>
				</Row>
			</Container>
			<Elements stripe={stripePromise}>
				<CheckoutForm subtotal={subtotal} formIsOpen={formIsOpen} toggleForm={toggleForm} />
			</Elements>
		</div>
	)
}