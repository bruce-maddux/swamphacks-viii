import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAl5UswXPfm0noa3PMXfuWv2JJZYJpB1j8",
    authDomain: "vernal-bonfire-303320.firebaseapp.com",
    projectId: "vernal-bonfire-303320",
    storageBucket: "vernal-bonfire-303320.appspot.com",
    messagingSenderId: "221953670584",
    appId: "1:221953670584:web:2af0597132f373a8b4e34d",
    measurementId: "G-NTX8WQRQSY"
    }

let firebase = initializeApp(firebaseConfig)
export default firebase

