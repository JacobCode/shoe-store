import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm';

import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, selectCart } from '../features/cartManager';

export default function ShoppingCart() {
	const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
	var cart = useSelector(selectCart).cart;
	var dispatch = useDispatch();
	return (
		<div>
			<div className="cart-items">
				{cart.map((shoe) => {
					var { _id, name } = shoe;
					return (
						<div key={_id}>
							<h1>{name}</h1>
							<h2 onClick={() => {
								dispatch(removeFromCart(_id))
							}}>X</h2>
						</div>
					)
				})}
			</div>
			<Elements stripe={stripePromise}>
				<CheckoutForm />
			</Elements>
		</div>
	)
}