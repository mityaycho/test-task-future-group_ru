import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from './components/Table';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { useDispatch, useSelector } from 'react-redux';
import { tableDriwingTC } from './redux/setTable-reducer';
import { AppStateType } from './redux/store';



function App() {

		const dispatch = useDispatch();
		const [showTable, setShowTable] = useState('');
		const tableData = useSelector((store: AppStateType) => store.tablePage.data);
	
		const radios = [
			{ name: 'Small', value: 'Small' },
			{ name: 'Large', value: 'Large' }
		];
		
		useEffect(() => {
			if (showTable) {
				dispatch(tableDriwingTC(showTable));
				console.log(tableData);
			}
		});

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<h1 className="">Show table</h1>
				<ButtonGroup toggle className="mb-5">
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            type="radio"
            variant="secondary"
            name="radio"
            value={radio.value}
            checked={showTable === radio.value}
            onChange={(e) => setShowTable(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
			{showTable && <Table />}
			</header>
		</div>
	);
};

export default App;