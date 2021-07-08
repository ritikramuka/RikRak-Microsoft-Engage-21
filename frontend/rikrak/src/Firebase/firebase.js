import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const obj = require("./secrets");

const app = firebase.initializeApp(obj);

export const auth = app.auth();

const firestore = firebase.firestore();
export const database = {
    users: firestore.collection('users'),
    rooms: firestore.collection('rooms'),
    getCurrentTimeStamp: firebase.firestore.FieldValue.serverTimestamp,
    formatDoc: doc => {
        return { id: doc.id, ...doc.data() }
    }
}

export const storage = app.storage();

export default app;