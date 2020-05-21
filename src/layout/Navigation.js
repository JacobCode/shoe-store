import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCart } from '../features/cartManager';

// Image
import close from '../media/close.svg';
import cartIcon from '../media/cart.svg';

export default function Navigation() {
	const [isOpen, toggle] = useState(false);
	var cart = useSelector(selectCart).cart;
	const [cartNumber, setNumber] = useState(cart.length);
	useEffect(() => {
		setNumber(cart.length);
	}, [cart]);
	return (
		<nav>
			<div className="container-fluid">
				<div className="toggler" onClick={() => toggle(!isOpen)}>
					<div className="bar top-bar"></div>
					<div className="bar middle-bar"></div>
					<div className="bar bottom-bar"></div>
				</div>
				<div className="genders">
					<Link to="/store">Men</Link>
					<div className="divider"></div>
					<Link to="/store">Women</Link>
				</div>
				<Link to="/cart" className="cart">
					<img src={cartIcon} alt="Cart" />
					<span>{cartNumber}</span>
				</Link>
			</div>
			<div id="menu" className={isOpen ? 'open' : ''}>
				<div className="close" onClick={() => toggle(!isOpen)}>
					<img src={close} alt="Close Menu" />
				</div>
				<div className="links">
					<Link onClick={() => toggle(false)} className={`${window.location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
					<Link onClick={() => toggle(false)} className={`${window.location.pathname === '/store' ? 'active' : ''}`} to="/store">Store</Link>
					<Link onClick={() => toggle(false)} className={`${window.location.pathname === '/cart' ? 'active' : ''}`} to="/cart">Cart ({cartNumber})</Link>
				</div>
			</div>
		</nav>
	)
}