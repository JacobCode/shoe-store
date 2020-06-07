import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { selectCart } from './features/cartManager';
import { selectResults } from './features/storeManager';
import { useSelector } from 'react-redux';

import './scss/app.scss';

// Layout
import Navigation from './layout/Navigation';
import Footer from './layout/Footer';

// Pages
import Home from './pages/Home';
import Store from './pages/Store';
import ShoppingCart from './pages/ShoppingCart';

function App() {
	var cart = useSelector(selectCart).cart;
	var results = useSelector(selectResults).results;
	var stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
	return (
		<div className="App">
			<Navigation />
			<Switch>
				<Route path={process.env.PUBLIC_URL + '/'} component={Home} exact />
				<Route path={process.env.PUBLIC_URL + '/store'} render={() => <Store cart={cart} results={results} />} exact />
				<Route path={process.env.PUBLIC_URL + '/cart'} render={() => 
					<Elements stripe={stripePromise}>
						<ShoppingCart cart={cart} />
					</Elements>} exact />
			</Switch>
			<Footer />
		</div>
	);
}

export default App;
