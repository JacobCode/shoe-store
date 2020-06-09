import React, { useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { setStoreResults } from '../features/storeManager';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

export default function FilterBar({ toggleLoading, setCurrentPage }) {
	var dispatch = useDispatch();
	var [userInput, setUserInput] = useReducer(
		(state, newState) => ({
			...state,
			...newState
		}), {
			chosen_price: 1000,
			chosen_brand: 'All',
			chosen_gender: 'All',
		}
	);
	var { chosen_brand, chosen_gender, chosen_price } = userInput;
	function handleChange(e) {
		var name = e.target.name;
		var newValue = e.target.value;
		setUserInput({ [name]: newValue });
	}
	async function searchStore() {
		var results = axios.get(`https://shoe-server.herokuapp.com/api/search/${chosen_brand}/${chosen_gender}/${chosen_price}`);
		return results;
	}
	function handleSubmit(e) {
		e.preventDefault();
		toggleLoading(true);
		searchStore()
			.then((res) => {
				var { status, data } = res;
				if (status === 200) {
					setCurrentPage(1);
					dispatch(setStoreResults(data));
				}
			})
			.then(() => setTimeout(toggleLoading(false), 1500))
			.catch((err) => console.error(err));
	}
	return (
		<div id="filter-bar">
			<Form onSubmit={handleSubmit} className="container">
				<div className="price filter">
					<FormGroup>
						<Label htmlFor="priceSelect">Price</Label>
						<input id="priceSelect" onChange={handleChange} name="chosen_price" type="range" min="60" max="1000" value={chosen_price} />
						<p>${chosen_price >= 1000 ? chosen_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : chosen_price}</p>
					</FormGroup>
				</div>
				<div className="brand filter">
					<FormGroup>
						<Label htmlFor="brandSelect">Brand</Label>
						<Input onChange={handleChange} type="select" name="chosen_brand" id="brandSelect">
							<option>All</option>
							<option>Adidas</option>
							<option>Nike</option>
							<option>Jordan</option>
							<option>Vans</option>
						</Input>
					</FormGroup>
				</div>
				<div className="gender filter">
					<FormGroup>
						<Label htmlFor="genderSelect">Gender</Label>
						<Input onChange={handleChange} type="select" name="chosen_gender" id="genderSelect">
							<option>All</option>
							<option>Men</option>
							<option>Women</option>
						</Input>
					</FormGroup>
				</div>
				<div className="submit filter">
					<FormGroup>
						<Button>Search</Button>
					</FormGroup>
				</div>
			</Form>
		</div>
	)
}