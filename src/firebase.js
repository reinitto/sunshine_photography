import * as firebase from 'firebase';
import 'firebase/auth';
const config = {
  apiKey: 'AIzaSyDU7pnAHmVuuf2nKxa5HpBBI4GaCobCQRw',
  authDomain: 'momblog-15d1c.firebaseapp.com',
  databaseURL: 'https://momblog-15d1c.firebaseio.com',
  projectId: 'momblog-15d1c',
  storageBucket: '',
  messagingSenderId: '754776938435',
  appId: '1:754776938435:web:43cadca033fb5094ec0f76'
};
firebase.initializeApp(config);
const databaseRef = firebase.database().ref();
export const todosRef = databaseRef.child('todos');
