import React, { useState } from 'react';
import { IData, ITableHead } from '../redux/setTable-reducer';
import Paginator from './Paginator';
import { useSelector, useDispatch } from 'react-redux';
import { AppStateType } from '../redux/store';
import { v4 as uuidv4 } from 'uuid';
import { setSortDataAC } from '../redux/actions';


interface IProps {
	tableData: Array<IData>
}

export const Table = (props: IProps) => {

	const dispatch = useDispatch();
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const tableHead = useSelector((state: AppStateType): Array<ITableHead> => state.tablePage.tableHead)
	let leftPortionPageNumber = (currentPage - 1) * pageSize + 1;
	let rightPortionPageNumber = currentPage * pageSize;


	let tableHeadJSX = tableHead.map(({ th, sort }) => <th
		className="table-head"
		key={uuidv4()}
		scope="col"
		data-value={th}
		data-bool={sort}>{th}&nbsp;{sort ? '▲' : '▼'}</th>);

	let tableData = props.tableData
		.filter((p, i) => i >= leftPortionPageNumber && i <= rightPortionPageNumber)
		.map((el, i) => (
			<tr key={uuidv4()}>
				<th scope="row">{el.id}</th>
				<td>{el.firstName}</td>
				<td>{el.lastName}</td>
				<td>{el.email}</td>
				<td>{el.phone}</td>
			</tr>));

	const tableHeadSort = (e: any) => {
		const dataValue = e.target.dataset.value as keyof IData;
		const dataBool = e.target.dataset.bool;

		let sortData = props.tableData.sort((a, b) => dataBool ?
		a[dataValue] > b[dataValue] ? 1 : -1 :
		b[dataValue] > a[dataValue] ? 1 : -1);
		let sortTAbleHead = tableHead.map(({ th, sort }) => th === dataValue && !sort ? { th, sort: true } : { th, sort: false });
		dispatch(setSortDataAC(sortData, sortTAbleHead));
	};

	const addData = (e: any) => {
		
	}

	return (
		<div>
			<div className="d-flex p-2">
			<button 
			type="button" 
			className="btn btn-secondary btn-sm pl-5 pr-5 mr-auto"
			onClick={addData}>Add</button>
			<Paginator
				dataLength={props.tableData.length}
				pageSize={pageSize}
				setPageSize={setPageSize}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage} />
			</div>

			<table className="table border">
				<thead className="thead-light" onClick={tableHeadSort}>
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