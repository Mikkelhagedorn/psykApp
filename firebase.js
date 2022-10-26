import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyDMrha8ZupdXsvOaUv4zCR3EWHjsBOGNs4",
    authDomain: "companydetails-6f880.firebaseapp.com",
    projectId: "companydetails-6f880",
    storageBucket: "companydetails-6f880.appspot.com",
    messagingSenderId: "699301522453",
    appId: "1:699301522453:web:68eff701e6684589e6721c"
};
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}
const db = app.firestore();
const auth = firebase.auth();
const firebasestorage = firebase.storage();
export { db, auth,firebasestorage };
