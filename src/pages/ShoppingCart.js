import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm';
import { removeFromCart } from '../features/cartManager';
import { useDispatch } from 'react-redux';

export default function ShoppingCart(props) {
	var { cart } = props;
	var dispatch = useDispatch();
	var stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
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