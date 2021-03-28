import { Checkbox } from '@material-ui/core';
import './studentmon.css';

const StudentMon = () => {
	return (
		<div>
			<Checkbox
				// checked={checked}
				// onChange={handleChange}
				inputProps={{ 'aria-label': 'primary checkbox' }}
			/>
		</div>
	);
};

export default StudentMon;
