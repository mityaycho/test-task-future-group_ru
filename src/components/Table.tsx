import React from 'react';
import { IData } from '../redux/setTable-reducer';

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
		<table className="table">
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
	);
};