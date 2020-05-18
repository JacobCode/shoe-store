import React from 'react';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

function CheckoutForm() {
	var stripe = useStripe();
	var elements = useElements();
	var handleSubmit = async (event) => {
		event.preventDefault();
		var {error, paymentMethod} = await stripe.createPaymentMethod({
			type: 'card',
			card: elements.getElement(CardElement),
		});
		if (error) console.error(error);
		console.log(paymentMethod);
	};
	return (
		<form onSubmit={handleSubmit}>
			<CardElement />
			<button type="submit" disabled={!stripe}>Pay</button>
		</form>
	);
};

export default CheckoutForm;