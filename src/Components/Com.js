import './com.css';

const Com = ({ classe, loggedInUser, isTeacher, setOpen }) => {
	return (
		<div className='ddd'>
			<div className='com'>
				<div className='head'>
					<p className='mc'>My Classes</p>
					<p className='nc' onClick={() => setOpen(true)}>
						{isTeacher ? 'Create new Class' : 'Join new Class'}
					</p>
				</div>
				<div className='classes'>
					{classe ? classe.map((i, index) => <p>{i.name}</p>) : null}
				</div>
			</div>
		</div>
	);
};

export default Com;
