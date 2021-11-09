import { initializeApp } from 'firebase/app';

import {getAnalytics} from 'firebase/analytics';

import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBqTP0aWQz6NKGuBB2lAJS6m2i1biq4m6w",
    authDomain: "burger-builder-5e925.firebaseapp.com",
    projectId: "burger-builder-5e925",
    storageBucket: "burger-builder-5e925.appspot.com",
    messagingSenderId: "774867304165",
    appId: "1:774867304165:web:a6b5b9fc56d272f09ade0c",
    measurementId: "G-TVW1685GPM"
}


const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const db = getFirestore(app);

export {app, db, analytics}