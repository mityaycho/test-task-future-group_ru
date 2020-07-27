import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from './components/Table';
import { useSelector } from 'react-redux';
import { IData } from './redux/setTable-reducer';
import { AppStateType } from './redux/store';
import Header from './components/Header';
import logo from './logo.svg';



function App() {

	const [showTable, setShowTable] = useState('');
	const tableData = useSelector((store: AppStateType): Array<IData> => store.tablePage.data);
	const preloader = useSelector((store: AppStateType): Array<IData> => store.tablePage.preloader);
	console.log(preloader)

	return (
		<div className="container App">
			<Header setShowTable={setShowTable} showTable={showTable} />
			{preloader ?
				<img src={logo} className="preloader-logo" alt="logo" /> :
				showTable && <Table tableData={tableData} />
			}
		</div>
	);
};

export default App;