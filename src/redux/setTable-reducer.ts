import { SET_TABLE_SMALL, SET_TABLE_LARGE, SET_PRELOADER, setTableSmalAC, setTableLargeAC, setPreloaderAC, SET_SORT_DATA, SET_NEW_DATA } from './actions';
import { Dispatch } from 'redux';
import { getTableApi } from './../api/getTableApi';


export type IData = {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	address: {
		streetAddress: string;
		city: string;
		state: string;
		zip: string;
	}
	description: string;
};

export type ITableHead = {
	th: string;
	sort: boolean;
}

export interface ITablePreloader {
	type: typeof SET_PRELOADER;
	preloader: boolean;
}


export interface ITableSmall {
	type: typeof SET_TABLE_SMALL;
	data: Array<IData>;
	preloader: boolean;
};

export interface ITableLarge {
	type: typeof SET_TABLE_LARGE;
	data: Array<IData>;
	preloader: boolean;
};

export interface ISortData {
	type: typeof SET_SORT_DATA;
	data: Array<IData>;
	tableHead: Array<ITableHead>;
};

export interface ISetNewData {
	type: typeof SET_NEW_DATA;
	data: IData;
};

const initialSate = {
	tableHead: [
		{ th: 'id', sort: false },
		{ th: 'firstName', sort: false },
		{ th: 'lastName', sort: false },
		{ th: 'Email', sort: false },
		{ th: 'Phone', sort: false }
	] as Array<ITableHead>,
	preloader: false,
	data: [] as Array<IData>
};

export type IInitialSatate = typeof initialSate

export const tableReducer = (state = initialSate, action: ITableSmall | ITableLarge | ITablePreloader | ISortData | ISetNewData): IInitialSatate => {
	switch (action.type) {
		case SET_TABLE_SMALL:
			return {
				...state, data: action.data, preloader: action.preloader
			}
		case SET_TABLE_LARGE:
			return {
				...state, data: action.data, preloader: action.preloader
			}
		case SET_PRELOADER:
			return {
				...state, preloader: action.preloader
			}
		case SET_SORT_DATA:
			return {
				...state, data: action.data, tableHead: action.tableHead
			}
		case SET_NEW_DATA:
			return {
				...state, data: [action.data, ...state.data]
			}
		default:
			return state;
	}
};

export const tableDriwingTC = (table: string) => async (dispatch: Dispatch) => {
	try {
		if (table === 'Small') {

			dispatch(setPreloaderAC(true));
			const response = await getTableApi.getTableSmall();
			dispatch(setTableSmalAC(response, false));
		} else if (table === 'Large') {
			dispatch(setPreloaderAC(true));
			const response = await getTableApi.getTableLarge();
			dispatch(setTableLargeAC(response, false));
		}
	} catch (error) {
		return error;
	}
};