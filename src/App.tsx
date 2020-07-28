import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from './components/Table';
import { useSelector } from 'react-redux';
import { AppStateType } from './redux/store';
import Header from './components/Header';
import logo from './logo.svg';
import MaterialTableJSX from './components/MaterialTableJSX';



function App() {

	const [showTable, setShowTable] = useState('');
	const [tableWatch, setTableWatch] = useState('');
	const { data: tableData, preloader } = useSelector((state: AppStateType) => state.tablePage);

	return (
		<div className="container App">
			<button
				type="button"
				className="btn btn-secondary btn-sm m-2"
				onClick={() => setTableWatch('material-table')}>Material table</button>

			<button
				type="button"
				className="btn btn-secondary btn-sm m-2"
				onClick={() => setTableWatch('custom-table')}>Custom table</button>
			{tableWatch === 'material-table' && <MaterialTableJSX />}

			{tableWatch === 'custom-table' &&
				<div>
					<Header setShowTable={setShowTable} showTable={showTable} />
					{preloader ?
						<img src={logo} className="preloader-logo" alt="logo" /> :
						showTable && <Table tableData={tableData} />
					}
				</div>
			}

		</div>
	);
};

export default App;