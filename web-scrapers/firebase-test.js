import { scrapeStandings } from "./scrapers.js";
import { firebaseConfig, scrapeURLs } from './constants.js';

import { initializeApp } from 'firebase/app';
import {
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, connectAuthEmulator,
    onAuthStateChanged, signOut,
} from "firebase/auth";
import { getDatabase, ref, set, get, child } from 'firebase/database';

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);
connectAuthEmulator(auth, 'http://127.0.0.1:9099');
// export const FIREBASE_AUTH_EMULATOR_HOST="127.0.0.1:9099"
// to use emulator instead of the real firebase system - init in terminal with:   firebase emulators:start


const loginEmailPassword = async () => {
    const loginEmail = 'name from form';
    const loginPassword = 'pass from from';
    try {
        const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        console.log(userCredential.user);
    } catch (error) {
        console.log(error);
    }
};
const createAccount = async () => {
    const loginEmail = 'name from form';
    const loginPassword = 'pass from from';
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, loginEmail, loginPassword);
        console.log(userCredential.user);
    } catch (error) {
        console.log(error);
    }
};
const monitorAuthState = async () => {
    onAuthStateChanged(auth, user => {
        if (user) {
            console.log(user);
            // hide login form, update nav, update view, etc
        } else {
            // show error and don't update view - not logged in
        }
    });
};
const logout = async () => {
    await signOut(auth);
};


async function scrapeAll() {
    const standings = await scrapeStandings(scrapeURLs.standings);
    console.log(standings);

    set(ref(db, 'nba/' + 'standings'), standings);

    console.log('Saved!');


}

scrapeAll();