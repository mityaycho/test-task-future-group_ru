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

	const pages = [];
	const pagesCount = Math.ceil(dataLength / pageSize);

	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i);
	};

	const pagesData = pages.map(p => {
		if (pagesCount >= portionSize + currentPage) {
			return (
				<>
					{p < portionSize + currentPage && <Pagination.Item
						key={p}
						active={currentPage === p ? true : false}
						onClick={() => setCurrentPage(p)}>
						{p}
					</Pagination.Item>}
					{p === pagesCount && <>
						<Pagination.Ellipsis />
						<Pagination.Item
							key={pagesCount}
							active={currentPage === p ? true : false}
							onClick={() => setCurrentPage(pagesCount)}>{pagesCount}</Pagination.Item>
					</>}
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
		<div className="d-flex">
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
				<Pagination.First onClick={() => currentPage > 1 && setNumberCallback(1)} />
				<Pagination.Prev onClick={() => currentPage > 1 && setNumberCallback(currentPage - 1)} />

				{pagesData}

				<Pagination.Next onClick={() => currentPage < pagesCount && setNumberCallback(currentPage + 1)} />
				<Pagination.Last onClick={() => currentPage < pagesCount && setNumberCallback(pagesCount)} />
			</Pagination>
		</div>
	);
};

export default Paginator;