import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './scss/app.scss';

// Layout
import Navigation from './layout/Navigation';

// Pages
import Home from './pages/Home';
import Store from './pages/Store';
import ShoppingCart from './pages/ShoppingCart';

function App() {
	return (
		<div className="App">
			<Navigation />
			<Switch>
				<Route path={process.env.PUBLIC_URL + '/'} component={Home} exact />
				<Route path={process.env.PUBLIC_URL + '/store'} component={Store} exact />
				<Route path={process.env.PUBLIC_URL + '/cart'} component={ShoppingCart} exact />
			</Switch>
		</div>
	);
}

export default App;
