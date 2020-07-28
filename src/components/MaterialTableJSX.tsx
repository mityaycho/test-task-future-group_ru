import React, { forwardRef, useEffect, useState } from 'react';
import MaterialTable from 'material-table';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';






interface TableState {
	columns: Array<object>;
	data: Array<object>;
};

export default function MaterialTableJSX() {

	const tableIcons: any = {
		Add: forwardRef((props: any, ref: any) => <AddBox {...props} ref={ref} />),
		Check: forwardRef((props: any, ref: any) => <Check {...props} ref={ref} />),
		Clear: forwardRef((props: any, ref: any) => <Clear {...props} ref={ref} />),
		Delete: forwardRef((props: any, ref: any) => <DeleteOutline {...props} ref={ref} />),
		DetailPanel: forwardRef((props: any, ref: any) => <ChevronRight {...props} ref={ref} />),
		Edit: forwardRef((props: any, ref: any) => <Edit {...props} ref={ref} />),
		Export: forwardRef((props: any, ref: any) => <SaveAlt {...props} ref={ref} />),
		Filter: forwardRef((props: any, ref: any) => <FilterList {...props} ref={ref} />),
		FirstPage: forwardRef((props: any, ref: any) => <FirstPage {...props} ref={ref} />),
		LastPage: forwardRef((props: any, ref: any) => <LastPage {...props} ref={ref} />),
		NextPage: forwardRef((props: any, ref: any) => <ChevronRight {...props} ref={ref} />),
		PreviousPage: forwardRef((props: any, ref: any) => <ChevronLeft {...props} ref={ref} />),
		ResetSearch: forwardRef((props: any, ref: any) => <Clear {...props} ref={ref} />),
		Search: forwardRef((props: any, ref: any) => <Search {...props} ref={ref} />),
		SortArrow: forwardRef((props: any, ref: any) => <ArrowDownward {...props} ref={ref} />),
		ThirdStateCheck: forwardRef((props: any, ref: any) => <Remove {...props} ref={ref} />),
		ViewColumn: forwardRef((props: any, ref: any) => <ViewColumn {...props} ref={ref} />)
	};

	const [state, setState] = useState<TableState>({
		columns: [
			{ title: 'id', field: 'id' },
			{ title: 'firstName', field: 'firstName' },
			{ title: 'lastName', field: 'lastName' },
			{ title: 'email', field: 'email' },
			{ title: 'phone', field: 'phone' }
		],
		// data: tableDrawing,
		data: []
	});
	
	return (
		<MaterialTable
			icons={tableIcons}
			title=""
			columns={state.columns}
			options={{
				search: true,
				sorting: true
			}}
			// data={state.data}
			data={query =>
				new Promise((resolve, reject) => {
					let url = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
					
					fetch(url)
						.then(response => response.json())
						.then(result => {
							debugger
						resolve({
							data: result,
							page: result.page - 1,
							totalCount: result.cardPacksTotalCount
						});
					})
				})
			}
			editable={{
				onRowAdd: (newData) =>
					new Promise((resolve) => {
						setTimeout(() => {
							resolve();
							setState((prevState) => {
								const data = [...prevState.data];
								data.push(newData);
								return { ...prevState, data };
							});
						}, 600);
					}),
				onRowUpdate: (newData, oldData) =>
					new Promise((resolve) => {
						setTimeout(() => {
							resolve();
							if (oldData) {
								setState((prevState) => {
									const data = [...prevState.data];
									data[data.indexOf(oldData)] = newData;
									return { ...prevState, data };
								});
							}
						}, 600);
					}),
				onRowDelete: (oldData) =>
					new Promise((resolve) => {
						setTimeout(() => {
							resolve();
							setState((prevState) => {
								const data = [...prevState.data];
								data.splice(data.indexOf(oldData), 1);
								return { ...prevState, data };
							});
						}, 600);
					}),
			}}
		/>
	);
};