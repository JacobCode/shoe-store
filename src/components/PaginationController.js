import React from 'react';
import { Pagination, PaginationItem, PaginationLink, Input } from 'reactstrap';

export default function({ shoesPerPage, totalShoes, currentPage, setCurrentPage, setShoesPerPage, scrollToResults }) {
	var pageNumbers = [];
	var availablePages = Math.ceil(totalShoes / shoesPerPage);
	var nextPage = currentPage + 1 <= availablePages ? currentPage + 1 : 1;
	var previousPage = currentPage - 1 >= 1 ? currentPage - 1 : availablePages;
	for (var i = 1; i <= 7; i++) {
		pageNumbers.push(i);
	}
	var pageOptions = [15, 30, 45, 60, 'All'];
	return (
		<div className="pagination-container container d-flex align-items-center justify-content-between flex-wrap" >
			<Pagination id="pagination-controller" aria-label="pagination">
				{/* Previous Page Button */}
				<PaginationItem onClick={() => {
					scrollToResults();
					setCurrentPage(previousPage);
				}}>
					<PaginationLink previous />
				</PaginationItem>

				{/* Pages */}
				{pageNumbers.map((page) => {
					return (
						<PaginationItem onClick={() => {
							scrollToResults();
							if (availablePages >= page) {
								setCurrentPage(page);
							}
						}} active={currentPage === page ? true : false} 
						key={page} disabled={availablePages < page}>
							<PaginationLink>
								{page}
							</PaginationLink>
						</PaginationItem>
					)
				})}

				{/* Next Page Button */}
				<PaginationItem onClick={() => {
					scrollToResults();
					setCurrentPage(nextPage);
				}}>
					<PaginationLink next />
				</PaginationItem>
			</Pagination>

			<div className="results-controller d-flex align-items-center justify-content-center">
				<p>Shoes Per Page:</p>
				<Input type="select" defaultValue={15} onChange={(e) => {
					var input = e.target.value;
					setCurrentPage(1);
					if (input === 'All') {
						setShoesPerPage(75);
					} else {
						setShoesPerPage(Number(input));
					}
				}} name="results-per-page">
					{pageOptions.map((o) => {
						return (
							<option key={o}>{o}</option>
						)
					})}
				</Input> 
			</div>
		</div>
	)
}