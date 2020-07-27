import React, { useState } from 'react';
import { IData } from '../redux/setTable-reducer';
import Paginator from './Paginator';

interface IProps {
	tableData: Array<IData>
}

export const Table = (props: IProps) => {

	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	let leftPortionPageNumber = (currentPage - 1) * pageSize + 1;
  let rightPortionPageNumber = currentPage * pageSize;
	

	let tableData = props.tableData
	.filter((p, i) => i >= leftPortionPageNumber && i <= rightPortionPageNumber)
	.map((el, i) => (
		<tr key={el.id}>
		<th scope="row">{el.id}</th>
		<td>{el.firstName}</td>
		<td>{el.lastName}</td>
		<td>{el.email}</td>
		<td>{el.phone}</td>
	</tr>));

	return (
		<div>
			<Paginator
				dataLength={props.tableData.length}
				pageSize={pageSize}
				setPageSize={setPageSize}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage} />
			<table className="table border">
				<thead className="thead-light">
					<tr>
						<th scope="col">id</th>
						<th scope="col">firstName</th>
						<th scope="col">lastName</th>
						<th scope="col">Email</th>
						<th scope="col">Phone</th>
					</tr>
				</thead>
				<tbody>
					{tableData}
				</tbody>
			</table>
		</div>
	);
};