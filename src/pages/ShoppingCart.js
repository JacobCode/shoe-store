import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm';

function ShoppingCart() {
	const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
	return (
		<Elements stripe={stripePromise}>
			<CheckoutForm />
		</Elements>
	)
}

export default ShoppingCart;