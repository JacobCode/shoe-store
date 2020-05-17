import React from 'react';
import { Counter } from './features/counter/Counter';
import Shoppingcart from './pages/ShoppingCart';

function App() {
	return (
		<div className="App">
			<Counter />
			<Shoppingcart />
		</div>
	);
}

export default App;
