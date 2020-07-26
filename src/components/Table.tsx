import React from 'react';
import { IData } from '../redux/setTable-reducer';
import Paginator from './Paginator';

interface IProps {
	tableData: Array<IData>
}

export const Table = (props: IProps) => {

	let tableData = props.tableData.map(el => (
		<tr key={el.id}>
			<th scope="row">{el.id}</th>
			<td>{el.firstName}</td>
			<td>{el.lastName}</td>
			<td>{el.email}</td>
			<td>{el.phone}</td>
		</tr>));

	return (
		<div className="d-flex flex-wrap justify-content-center">
			<Paginator dataLength={props.tableData.length} />
			<table className="table w-75 border">
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