import React from 'react';
import logo from './../logo.svg';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { tableDriwingTC } from '../redux/setTable-reducer';
import { useDispatch } from 'react-redux';

interface IpropsHeader {
	showTable: string;
	setShowTable(e: string): void;
}

const Header = (props: IpropsHeader) => {

	const dispatch = useDispatch();

	const radios = [
		{ name: 'Small', value: 'Small' },
		{ name: 'Large', value: 'Large' }
	];

	const fetchData = (e: string) => {
		props.setShowTable(e);
		dispatch(tableDriwingTC(e));
	};

	return (
		<div className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<div>
					<h1 className="">Show table</h1>
					<ButtonGroup toggle className="mb-5">
						{radios.map((radio, idx) => (
							<ToggleButton
								key={idx}
								type="radio"
								variant="secondary"
								name="radio"
								value={radio.value}
								checked={props.showTable === radio.value}
								onChange={(e) => fetchData(e.currentTarget.value)}
							>
								{radio.name}
							</ToggleButton>
						))}
					</ButtonGroup>
				</div>
			</div>
	);
};

export default Header;