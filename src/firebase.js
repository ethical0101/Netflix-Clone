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

// Firebase configuration using environment variables
const firebaseConfig = {
    apiKey: "AIzaSyClQKgVHy9oiaA0L2UIrju6JKWdhPZoVyk",
    authDomain: "netflix-clone-df734.firebaseapp.com",
    projectId: "netflix-clone-df734",
    storageBucket: "netflix-clone-df734.firebasestorage.app",
    messagingSenderId: "820218212525",
    appId: "1:820218212525:web:a68d360a6a5883b992d624",
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
        toast.error(error.code.split("/")[1].split("-").join(" "));
    }
};

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split("/")[1].split("-").join(" "));
    }
};

const logout = () => {
    signOut(auth);
};

export { auth, db, login, signup, logout };
