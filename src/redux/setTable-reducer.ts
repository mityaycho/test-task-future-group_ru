import { SET_TABLE_SMALL, SET_TABLE_LARGE, setTableSmalAC, setTableLargeAC } from './actions';
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

export interface IInitialSatate {
	data: Array<IData>
};

export interface ITableSmall {
	type: string;
	data: Array<IData>;
};

export interface ITableLarge {
	type: typeof SET_TABLE_LARGE;
	data: Array<IData>;
};

const initialSate = {
	data: []
};


export const tableReducer = (state: IInitialSatate = initialSate, action: ITableSmall | ITableLarge) => {
	switch (action.type) {
		case SET_TABLE_SMALL:
			return {
				...state, data: action.data
			}
		case SET_TABLE_LARGE:
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
			
			const response = await getTableApi.getTableSmall();
			dispatch(setTableSmalAC(response));
		} else if (table === 'Large') {
			const response = await getTableApi.getTableLarge();
			dispatch(setTableLargeAC(response));
		}
	} catch (error) {
		return error;
	}
};