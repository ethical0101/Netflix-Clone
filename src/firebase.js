// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    getAuth,
    signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "Your API key",
    authDomain: "Your Auth Domain",
    projectId: "Your Project ID",
    storageBucket: "Your storageBucket key",
    messagingSenderId: "Your messagingSenderId key",
    appId: "Your appId",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        // alert(error.message);
        toast.error(error.code.split("/")[1].split("-").join(" "));
    }
};

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        // alert(error.message);
        toast.error(error.code.split("/")[1].split("-").join(" "));
    }
};

const logout = () => {
    signOut(auth);
};

export { auth, db, login, signup, logout };
