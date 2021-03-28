import firebase from 'firebase';
var firebaseConfig = {
	apiKey: 'AIzaSyA75EhCApu55-_Ov33zjD3LXCKI8PWQUCs',
	authDomain: 'face-20bb0.firebaseapp.com',
	databaseURL: 'https://face-20bb0-default-rtdb.firebaseio.com',
	projectId: 'face-20bb0',
	storageBucket: 'face-20bb0.appspot.com',
	messagingSenderId: '1099329693539',
	appId: '1:1099329693539:web:f318f33aa6891df25e5556',
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
