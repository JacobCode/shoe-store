import React from 'react';
import { Link } from 'react-router-dom';
import {
	Container,
	Row,
	Col,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	Input
} from 'reactstrap';

export default function Footer() {
	return (
		<footer className="footer">
			<Container fluid>
				<Row>
					<Col xs={12} sm={6} md={3}>
						<ul className="footer-company text-muted">
							<h6>Company</h6>
							<li>Some Corp</li>
							<li>Some Street 123</li>
							<li>123 45 Some City</li>
							<li>Orgno: 123 456 789</li>
							<li>
							<i className="fa fa-envelope" aria-hidden="true"></i>
							<a href="/">info@shoestore.com</a>
							</li>
						</ul>
					</Col>
					<Col xs={12} sm={6} md={3}>
						<ul className="footer-sitemap">
							<h6>Sitemap</h6>
							<li><Link className="text-primary" to="/">Home</Link></li>
							<li><Link className="text-primary" to="/store">Store</Link></li>
							<li><Link className="text-primary" to="/cart">Cart</Link></li>
						</ul>
					</Col>
					<Col xs={12} sm={6} md={3}>
						<ul className="footer-social">
							<h6>Social</h6>
							<a href="/"><i className="social fab fa-facebook-f"></i></a>
							<a href="/"><i className="social fab fa-instagram"></i></a>
							<a href="/"><i className="social fab fa-twitter"></i></a>
							<a href="/"><i className="social fab fa-snapchat-ghost"></i></a>
						</ul>
					</Col>
					<Col xs={12} sm={6} md={3}>
						<h6>Search</h6>
						<InputGroup>
							<Input />
							<InputGroupAddon addonType="append">
								<InputGroupText>
									<i className="fas fa-search" />
								</InputGroupText>
							</InputGroupAddon>
						</InputGroup>
					</Col>
				</Row>
				<Row className="copyright">
					<Col className="text-center text-muted bottom">© 2020 Shoe Store All Rights Reserved <br /> Made by <a href="https://github.com/JacobCode">Jacob Carver</a></Col>
				</Row>
			</Container>
		</footer>
	)
}