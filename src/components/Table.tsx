import React, { useState } from 'react';
import { IData } from '../redux/setTable-reducer';
import Paginator from './Paginator';
import { useSelector } from 'react-redux';
import { AppStateType } from '../redux/store';

interface IProps {
	tableData: Array<IData>
}

export const Table = (props: IProps) => {

	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const tableHead = useSelector((store: AppStateType): Array<string> => store.tablePage.tableHead)
	let leftPortionPageNumber = (currentPage - 1) * pageSize + 1;
  let rightPortionPageNumber = currentPage * pageSize;
	

	let tableHeadJSX = tableHead.map(el => <th scope="col">{el}</th>);
	
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
						{tableHeadJSX}
					</tr>
				</thead>
				<tbody>
					{tableData}
				</tbody>
			</table>
		</div>
	);
};