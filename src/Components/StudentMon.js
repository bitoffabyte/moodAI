import { Checkbox } from '@material-ui/core';
import { useState } from 'react';
// import { Camera } from './Camera';
import './studentmon.css';

const StudentMon = ({ id }) => {
	const [show, setShow] = useState(false);
	return (
		<div style={{ marginLeft: '5%' }}>
			<Checkbox
				checked={show}
				onChange={() => setShow((prev) => !prev)}
				inputProps={{ 'aria-label': 'primary checkbox' }}
			/>
			<p style={{ display: 'inline' }}>Start Camera</p>
			{/* {show ? <Camera id={id} /> : null} */}
		</div>
	);
};

export default StudentMon;
