import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setStoreResults } from '../features/storeManager';
import axios from 'axios';

// Components
import FilterBar from '../components/FilterBar';
import PaginationController from '../components/PaginationController';
import ShoeCard from '../components/ShoeCard';

export default function Store(props) {
	var { cart, results } = props;
	var [currentPage, setCurrentPage] = useState(1);
	var [shoesPerPage, setShoesPerPage] = useState(10);
	var [loading, toggleLoading] = useState(false);
	var dispatch = useDispatch();

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
	}, [])

	useEffect(() => {
		if (currentPage !== 1) {
			setCurrentPage(1);
		}
	}, [results])

	var indexOfLastShoe = currentPage * shoesPerPage;
	var indexOfFirstShoe = indexOfLastShoe - shoesPerPage;
	var currentShoes = results.slice(indexOfFirstShoe, indexOfLastShoe);

	return (
		<div>
			<FilterBar loading={loading} toggleLoading={toggleLoading} />
			<div className="container">
				<div className="items d-flex flex-row justify-content-center">
					{loading ? <h1 className="loading">Loading...</h1> : 
					currentShoes.map((s) => {
						return (
							<ShoeCard key={s._id} shoe={s} />
						)
					})}
				</div>
			</div>
			<PaginationController setCurrentPage={setCurrentPage} currentPage={currentPage} shoesPerPage={shoesPerPage} totalShoes={results.length} />
		</div>
	)
}