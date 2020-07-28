import React, { useState } from 'react';
import { IData } from '../redux/setTable-reducer';
import Paginator from './Paginator';
import { useSelector, useDispatch } from 'react-redux';
import { AppStateType } from '../redux/store';
import { v4 as uuidv4 } from 'uuid';
import { setSortDataAC, setNewDataAC } from '../redux/actions';
import { useForm } from "react-hook-form";


interface IProps {
	tableData: Array<IData>;
};

export const Table = (props: IProps) => {

	const dispatch = useDispatch();
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [watchInfoBool, setWatchInfoBool] = useState(false);
	const [address, setAddress] = useState<IData>({} as IData);
	const [newData, setNewData] = useState(false);

	const { register, errors, handleSubmit } = useForm();

	const onSubmit = (data: any) => {
		dispatch(setNewDataAC({
			...data, address: {
				streetAddress: '',
				city: '',
				state: '',
				zip: ''
			},
			description: ''
		}));
	}

	const tableHead = useSelector((state: AppStateType) => state.tablePage.tableHead);
	let leftPortionPageNumber = (currentPage - 1) * pageSize + 1;
	let rightPortionPageNumber = currentPage * pageSize;


	const tableHeadSort = (e: any) => {
		const dataValue = e.target.dataset.value as keyof IData;
		const dataBool = e.target.dataset.bool;

		let sortData = props.tableData.sort((a, b) => dataBool === 'false' ?
			a[dataValue] > b[dataValue] ? 1 : -1 :
			b[dataValue] > a[dataValue] ? 1 : -1);
		let sortTAbleHead = tableHead.map(({ th, sort }) => th === dataValue && !sort ? { th, sort: true } : { th, sort: false });
		dispatch(setSortDataAC(sortData, sortTAbleHead));
	};

	const watchInfo = (e: any) => {
		const dataId = e.currentTarget.dataset.id;
		const watchAddress: any = props.tableData.find(el => +dataId === el.id);
		setAddress(watchAddress);
		setWatchInfoBool(true);
	}

	const addData = (e: any) => {
		newData ? setNewData(false) : setNewData(true);
	}


	let tableHeadJSX = tableHead.map(({ th, sort }) => <th
		className="table-head"
		key={uuidv4()}
		scope="col"
		data-value={th}
		data-bool={sort}>{th}&nbsp;{sort ? '▲' : '▼'}</th>);

	let tableData = props.tableData
		.filter((p, i) => i >= leftPortionPageNumber && i <= rightPortionPageNumber)
		.map(el => (
			<tr key={uuidv4()} data-id={el.id} onClick={watchInfo}>
				<th scope="row">{el.id}</th>
				<td>{el.firstName}</td>
				<td>{el.lastName}</td>
				<td>{el.email}</td>
				<td>{el.phone}</td>
			</tr>));


	return (
		<div>
			<div className="d-flex p-2">
				<button
					type="button"
					className="btn btn-secondary btn-sm mb-auto mr-auto ml-5 pl-3 pr-3"
					onClick={addData}>Add data</button>
				{newData &&
				
					<form onSubmit={handleSubmit(onSubmit)} className="form-col col-md-3">
						<input 
						className="form-control m-1" 
						placeholder="id" 
						name="id" 
						ref={register({ required: true })} />
						{errors.firstName && "add id"}

						<input 
						className="form-control m-1" 
						placeholder="firstName" 
						name="firstName" 
						ref={register({ required: true })} />
						{errors.firstName && "add firstName"}

						<input 
						className="form-control m-1" 
						placeholder="lastName" 
						name="lastName" 
						ref={register({ required: true })} />
						{errors.firstName && "add lastName"}

						<input 
						className="form-control m-1" 
						placeholder="email" 
						name="email" 
						ref={register({ required: true })} />
						{errors.firstName && "add email"}

						<input 
						className="form-control m-1" 
						placeholder="phone" 
						name="phone" 
						ref={register({ required: true })} />
						{errors.firstName && "add phone"}

						<input className="btn btn-secondary btn-sm" type="submit" />
					</form>}
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
			{watchInfoBool &&
				<div className="col">
					<div>Выбран пользователь <b>{address.firstName}&nbsp;{address.lastName}</b></div>
					<div>Описание:
						<textarea>
							{address.description}
						</textarea>
					</div>
					<div>Адрес проживания: <b>{address.address.streetAddress}</b></div>
					<div>Город: <b>{address.address.city}</b></div>
					<div>Провинция/штат: <b>{address.address.state}</b></div>
					<div>Индекс: <b>{address.address.zip}</b></div>
				</div>}
		</div>
	);
};