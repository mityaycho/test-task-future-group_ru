import { IData, ITableSmall, ITableLarge, ITablePreloader } from "./setTable-reducer";

export const SET_TABLE_SMALL = 'setTable-reducer/SET_TABLE_SMALL';
export const SET_TABLE_LARGE = 'setTable-reducer/SET_TABLE_LARGE';
export const SET_PRELOADER = 'setTable-reducer/SET_PRELOADER';

export const setTableSmalAC = (data: Array<IData>, preloader: boolean): ITableSmall => ({ type: SET_TABLE_SMALL, data, preloader });
export const setTableLargeAC = (data: Array<IData>, preloader: boolean): ITableLarge => ({ type: SET_TABLE_LARGE, data, preloader });
export const setPreloaderAC = (preloader: boolean): ITablePreloader => ({ type: SET_PRELOADER, preloader });