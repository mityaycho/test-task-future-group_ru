import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from './components/Table';
import { useSelector } from 'react-redux';
import { AppStateType } from './redux/store';
import Header from './components/Header';
import logo from './logo.svg';



function App() {

	const [showTable, setShowTable] = useState('');
	const { data: tableData, preloader } = useSelector((state: AppStateType) => state.tablePage);

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