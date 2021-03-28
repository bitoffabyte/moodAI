import React, { useEffect, useState } from 'react';
import Side from '../Components/Side';
import { useLocalContext } from '../Context/Context';
import './home.css';
import { useHistory } from 'react-router-dom';
import db from '../config';
import Com from '../Components/Com';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase';
require('firebase/firestore');

const Home = () => {
	const history = useHistory();
	const { logout, loggedInUser, loggedInMail } = useLocalContext();
	const [data, setData] = useState({});
	const [isTeacher, setIsTeacher] = useState('');
	const [pop, setPop] = useState('');
	const [open, setOpen] = useState(false);
	useEffect(() => {
		console.log(!loggedInUser);
		if (!loggedInUser) {
			history.push('/');
		}
	}, [loggedInUser]);
	useEffect(() => {
		if (loggedInMail)
			db.collection('Users')
				.doc(loggedInMail)
				.get()
				.then((snap) => {
					if (snap.exists) {
						setData(snap.data());
						setIsTeacher(snap.data().isTeacher);
					}
				})
				.catch((error) => {
					console.log('Error getting document:', error);
				});
	}, [loggedInMail]);

	const joinClass = (id) => {};
	const newClass = () => {
		const id = uuidv4();
		const data = { id, members: [loggedInMail], name: pop };
		db.collection('Classes').doc(id).set(data);
		db.collection('Users')
			.doc(loggedInMail)
			.update({
				classes: firebase.firestore.FieldValue.arrayUnion({
					id,
					name: pop,
				}),
			});
	};
	return (
		<div className='home'>
			<Side
				isTeacher={isTeacher}
				loggedInUser={loggedInUser}
				logout={() => {
					logout();
					history.push('/');
				}}
			/>
			<Com
				classe={data.classes}
				isTeacher={isTeacher}
				setOpen={setOpen}
			/>
			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				maxWidth='md'
				fullWidth={true}
			>
				<div className='dia'>
					<DialogTitle id='simple-dialog-title'>
						Create Class
					</DialogTitle>
					<TextField
						id='standard-basic'
						label='Class Name'
						vlue={pop}
						onChange={(e) => setPop(e.target.value)}
					/>
					<IconButton onClick={newClass}>
						<AddIcon className='plus' />
					</IconButton>
				</div>
			</Dialog>
		</div>
	);
};

export default Home;
