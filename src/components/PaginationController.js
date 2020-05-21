import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export default function({ shoesPerPage, totalShoes, currentPage, setCurrentPage }) {
	var pageNumbers = [];
	var availablePages = Math.ceil(totalShoes / shoesPerPage);
	var nextPage = currentPage + 1 <= availablePages ? currentPage + 1 : 1;
	var previousPage = currentPage - 1 >= 1 ? currentPage - 1 : availablePages;
	for (var i = 1; i <= 8; i++) {
		pageNumbers.push(i);
	}
	return (
		<div className="pagination-container container-fluid d-flex align-items-center justify-content-between flex-wrap" >
			<Pagination id="pagination-controller" aria-label="pagination">
				{/* Previous Page Button */}
				<PaginationItem onClick={() => {
					setCurrentPage(previousPage);
				}}>
					<PaginationLink previous />
				</PaginationItem>

				{pageNumbers.map((page) => {
					return (
						<PaginationItem onClick={() => {
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
					setCurrentPage(nextPage);
				}}>
					<PaginationLink next />
				</PaginationItem>
			</Pagination>
			<h5>Results: {totalShoes}</h5>
		</div>
	)
}