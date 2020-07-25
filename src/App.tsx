import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from './components/Table';

import { useDispatch, useSelector } from 'react-redux';
import { tableDriwingTC, IData } from './redux/setTable-reducer';
import { AppStateType } from './redux/store';
import Header from './components/Header';



function App() {

	const [showTable, setShowTable] = useState('');
	const tableData = useSelector((store: AppStateType): Array<IData> => store.tablePage.data);

	return (
		<div className="App">
			<Header setShowTable={setShowTable} />
			{showTable && <Table tableData={tableData} />}
		</div>
	);
};

export default App;