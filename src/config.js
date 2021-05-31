import firebase from 'firebase';
var firebaseConfig = {
	apiKey: 'AIzaSyAb2hr1b_q4I96QfQuyn2AsmcmxxHvDFBY',
	authDomain: 'dfzhbdfz.firebaseapp.com',
	databaseURL: 'https://dfzhbdfz-default-rtdb.firebaseio.com',
	projectId: 'dfzhbdfz',
	storageBucket: 'dfzhbdfz.appspot.com',
	messagingSenderId: '776797359347',
	appId: '1:776797359347:web:3cecce9bf3e9bbc3a43b86',
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
	prompt: 'select_account',
});
const database = firebase.database();
export { auth, provider, database };
export default db;
