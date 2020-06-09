import React, { useEffect, useRef } from 'react';
import { FormGroup, Input, Button } from 'reactstrap';
import { TweenMax, TweenLite, Power1, Power3, Linear } from 'gsap';

import shoeImage from '../media/shoe2.png';
import nike from '../media/nike.svg';
import adidas from '../media/adidas.svg';
import jordan from '../media/jordan.svg';
import vans from '../media/vans.svg';

export default function Home() {
	var left = useRef(null);
	var right = useRef(null);
	var svg = useRef(null);
	var img = useRef(null);
	var colors = ['#00afff', '#3668ed', '#f2262d', '#F96D23'];
	var brands = [
		{
			name: 'Adidas',
			logo: adidas
		},
		{
			name: 'Jordan',
			logo: jordan
		},
		{
			name: 'Nike',
			logo: nike
		}, 
		{
			name: 'Vans',
			logo: vans
		}
	]
	useEffect(() => {
		TweenMax.to(left, 1, {
			duration: 1,
			width: '50%',
			ease: Power1.easeInOut
		});
		TweenMax.to(right, 1, {
			duration: 1,
			width: '50%',
			ease: Power1.easeInOut
		});
		TweenLite.delayedCall(1, () => {
			TweenMax.to(svg, {
				duration: 0.5,
				strokeDashoffset: '0',
				ease: Linear.easeNone
			});
		});
		TweenLite.delayedCall(1.5, () => {
			TweenMax.to(img, {
				duration: 1,
				opacity: 1,
				ease: Power1.easeIn
			});
			TweenMax.to(img, {
				duration: 1,
				transform: 'rotate(0deg)',
				ease: Power3.easeInOut
			})
		});
	}, []);
	return (
		<div id="home">
			<div>
				<div className="hero container-fluid">
					<div ref={el => left = el} className="hero-left"></div>
					<div className="hero-middle">
						<svg viewBox="0 0 110 110">
							<circle cx="50%" cy="50%" r="50" className="fill"></circle>
							<circle cx="50%" cy="50%" r="50" className="progress" ref={el => svg = el}></circle>
						</svg>
						<img ref={el => img = el} src={shoeImage} alt="Welcome to Shoe Store" />
					</div>
					<div ref={el => right = el} className="hero-right"></div>
				</div>
				
				<section className="about container-fluid">

					<div className="about-row color">
						<div className="left">
							<h1>Choose Your <br /> Style</h1>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Scripta periculis ei eam, te pro movet reformidans.</p>
							<Button color="primary">More About Colors</Button>
						</div>
						<div className="right grid">
							{colors.map((c, i) => {
								return (
									<div key={i} className="c" style={{background: c}}></div>
								)
							})}
						</div>
					</div>

					<div className="about-row brand">
						<div className="right">
							<h1>Choose Your <br /> Brand</h1>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Scripta periculis ei eam, te pro movet reformidans.</p>
							<Button color="primary">More About Brands</Button>
						</div>
						<div className="left grid">
							{brands.map((b, i) => {
								return (
									<div key={i} className="b" style={{ backgroundImage: `url('${b.logo}')` }}></div>
								)
							})}
						</div>
					</div>

				</section>
				
				<section className="socials container-fluid">
					<h1>Follow Us</h1>
					<div className="social-boxes">
						<div className="box">
							<div className="box-inner">
								<h2>Facebook</h2>
								<a href="/">Follow<i className="fas fa-circle"></i><i className="fab fa-facebook-f"></i></a>
							</div>
						</div>
						<div className="box">
							<div className="box-inner">
								<h2>Youtube</h2>
								<a href="/">Follow<i className="fas fa-circle"></i><i className="fab fa-youtube"></i></a>
							</div>
						</div>
						<div className="box">
							<div className="box-inner">
								<h2>Twitter</h2>
								<a href="/">Follow<i className="fas fa-circle"></i><i className="fab fa-twitter"></i></a>
							</div>
						</div>
					</div>
				</section>
				
				<section className="newsletter container-fluid">
					<form>
						<h1>Subscribe To Our Newsletter</h1>
						<FormGroup>
							<Input type="text" placeholder="E-mail Address..." />
							<Button color="primary">Subscribe</Button>
						</FormGroup>
					</form>
				</section>
			</div>
		</div>
	)
}