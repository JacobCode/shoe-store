import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setStoreResults } from '../features/storeManager';
import axios from 'axios';
import loadingImage from '../media/three-dots.svg';

// Components
import FilterBar from '../components/FilterBar';
import PaginationController from '../components/PaginationController';
import ShoeCard from '../components/ShoeCard';

export default function Store(props) {
	var { cart, results } = props;
	var topResults = useRef(null);
	var [currentPage, setCurrentPage] = useState(1);
	var [shoesPerPage, setShoesPerPage] = useState(15);
	var [loading, toggleLoading] = useState(false);
	var dispatch = useDispatch();

	function scrollToResults() {
		document.getElementById('results').scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		async function getData() {
			var results = await axios.get('https://shoe-server.herokuapp.com/api/all');
			return results;
		}
		if (results.length <= 0) {
			toggleLoading(true);
			getData()
				.then((res) => {
					var { status, data } = res;
					if (status === 200) dispatch(setStoreResults(data));
				}).then(() => setTimeout(() => toggleLoading(false), 1500))
				.catch((err) => console.error(err));
		}
	}, [dispatch, results.length]);

	var indexOfLastShoe = currentPage * shoesPerPage;
	var indexOfFirstShoe = indexOfLastShoe - shoesPerPage;
	var currentShoes = results.slice(indexOfFirstShoe, indexOfLastShoe);

	return (
		<div id="store">
			<FilterBar setCurrentPage={setCurrentPage} toggleLoading={toggleLoading} />
			<div id="results" className="items d-flex flex-row justify-content-center">
				{loading ?
					<div className="loading">
					<img src={loadingImage} alt="Loading Store" />
				</div> : 
				currentShoes.map((s, i) => {
					var itemInCart = cart.filter((c) => c._id === s._id)[0];
					var isInCart = itemInCart !== undefined ? true : false;
					return (
						<ShoeCard inCart={isInCart} key={s._id} shoe={{...s, size: isInCart ? itemInCart.size : "8"}} />
					)
				})}
			</div>
			<PaginationController scrollToResults={scrollToResults} topResults={topResults} setShoesPerPage={setShoesPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} shoesPerPage={shoesPerPage} totalShoes={results.length} />
		</div>
	)
}