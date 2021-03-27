import React, { useEffect, useState } from 'react';
import { useLocalContext } from '../Context/Context';
import db from '../config';
const RouteHandler = () => {
	const { loggedInMail } = useLocalContext();
	const [createdClasses, setCreatedClasses] = useState([]);

	useEffect(() => {
		const unSubscribe = db
			.collection('Users')
			.doc(loggedInMail)
			.get()
			.then((snap) => {
				if (snap.exists) {
					alert('exists');
				} else {
					alert('dosen not');
				}
			});
	}, []);
	return <div>{loggedInMail}</div>;
};

export default RouteHandler;
