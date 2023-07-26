import { scrapePlayers, scrapeStandings } from "./scrapers.js";
import { firebaseConfig, scrapeURLs } from './constants.js';

import { initializeApp } from 'firebase/app';
// import {
//     getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, connectAuthEmulator,
//     onAuthStateChanged, signOut,
// } from "firebase/auth";
import { getDatabase, ref, set, get, child } from 'firebase/database';

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);
// const auth = getAuth(firebaseApp);


async function scrapeAll() {
    const standings = await scrapeStandings(scrapeURLs.standings);
    console.log(standings);
    const players = await scrapePlayers(scrapeURLs.players);
    console.log(players);

    set(ref(db, 'nba/standings'), standings);
    set(ref(db, 'nba/players'), players);


    console.log('Saved to Firebase!');

    return;
}

scrapeAll();