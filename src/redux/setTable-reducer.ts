import { SET_TABLE_SMALL, SET_TABLE_LARGE, SET_PRELOADER, setTableSmalAC, setTableLargeAC, setPreloaderAC, SET_SORT_DATA } from './actions';
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

export interface ITablePreloader {
	type: typeof SET_PRELOADER;
	preloader: boolean;
}
export interface IInitialSatate {
	tableHead: Array<string>;
	preloader: boolean;
	data: Array<IData>;
};

export interface ITableSmall {
	type: string;
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
}
const initialSate = {
	tableHead: ['id', 'firstName', 'lastName', 'Email', 'Phone'],
	preloader: false,
	data: []
};


export const tableReducer = (state: IInitialSatate = initialSate, action: ITableSmall | ITableLarge | any) => {
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
			console.log(action.data)
			return {
				...state, data: action.data
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