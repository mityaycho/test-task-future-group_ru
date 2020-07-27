import React, { ChangeEvent, useCallback, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';

type paginatorType = {
	dataLength: number;
	pageSize: number;
	setPageSize: (e: number) => void;
	currentPage: number;
	setCurrentPage: (arg: number) => void;
}

const Paginator: React.FC<paginatorType> = ({ dataLength, pageSize, setPageSize, currentPage, setCurrentPage }) => {

	const [portionSize, setPortionSize] = useState(10);
	const [startPortion, setStartPortion] = useState(1);

	const pages = [];
	const allPages = Math.ceil(dataLength / pageSize);

	for (let i = startPortion; i <= portionSize; i++) {
		pages.push(i);
	};

	if (allPages < portionSize) {
		setPortionSize(allPages);
	}

	const pagesData = pages
		.map(p => {
			if (allPages >= portionSize) {

				return (
					<>
						<Pagination.Item
							key={p}
							active={currentPage === p ? true : false}
							onClick={() => {
								setCurrentPage(p);
								if (p === portionSize && p !== allPages) {
									setStartPortion(startPortion + 9);
								setPortionSize(portionSize + 9);
								}
							}}>
							{p}
						</Pagination.Item>

					</>
				)
			} else {
				return <Pagination.Item
					key={p}
					active={currentPage === p ? true : false}
					onClick={() => setCurrentPage(p)}>
					{p}
				</Pagination.Item>
			}
		});

	const setNumberCallback = useCallback((val) => setCurrentPage(val),
		[setCurrentPage]);

	return (
		<div className="d-flex justify-content-end mr-5">
			<div>
				<select defaultValue={5} onChange={(e: ChangeEvent<HTMLSelectElement>) => {
					setPageSize(+e.target.value);
				}}>
					<option value={5}>5</option>
					<option value={10}>10</option>
					<option value={25}>25</option>
					<option value={dataLength}>All</option>
				</select>
			</div>

			<Pagination>
				<Pagination.First onClick={() => {
					currentPage > 1 && setNumberCallback(1);
					setStartPortion(1);
					setPortionSize(10);
				}} />
				<Pagination.Prev onClick={() => {
					if (currentPage > 1 && currentPage === startPortion) {
						setStartPortion(startPortion - 9);
						setPortionSize(portionSize - 9);
					}
					currentPage > 1 && setNumberCallback(currentPage - 1);
				}} />

				{pagesData}

				<Pagination.Next onClick={() => {
					if (allPages > portionSize && currentPage === portionSize && currentPage !== allPages) {
						setStartPortion(startPortion + 9);
						setPortionSize(portionSize + 9);
					} else if (allPages > portionSize && currentPage === allPages - 1) {
						setStartPortion(allPages - 9);
						setPortionSize(allPages);
					}
					currentPage < allPages && setNumberCallback(currentPage + 1);
				}} />
				<Pagination.Last onClick={() => {
					if (allPages > portionSize) {
						currentPage < allPages && setNumberCallback(allPages);
						setStartPortion(allPages - 9);
						setPortionSize(allPages);
					}
				}} />
			</Pagination>
		</div>
	);
};

export default Paginator;