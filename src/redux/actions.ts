import { IData, ITableSmall, ITableLarge } from "./setTable-reducer";

export const SET_TABLE_SMALL = 'setTable-reducer/SET_TABLE_SMALL';
export const SET_TABLE_LARGE = 'setTable-reducer/SET_TABLE_LARGE';

export const setTableSmalAC = (data: Array<IData>): ITableSmall => ({ type: SET_TABLE_SMALL, data });
export const setTableLargeAC = (data: Array<IData>): ITableLarge => ({ type: SET_TABLE_LARGE, data });