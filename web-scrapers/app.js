import { scrapeStandings } from './scrapers/standings.js';
import { scrapePlayers } from './scrapers/players.js';
import { scrapeNews } from './scrapers/news.js';
import { scrapeAnalysis } from './scrapers/analysis.js';

import { firebaseConfig, scrapeURLs } from './constants.js';
import { initializeApp } from 'firebase/app';
// import {
//     getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, connectAuthEmulator,
//     onAuthStateChanged, signOut,
// } from "firebase/auth";
import { getDatabase, ref, set, get, child } from 'firebase/database';
import { scrapeTransactions } from './scrapers/transactions.js';
import { scrapeLeaders } from './scrapers/leaders.js';
import { scrapeTeamStats } from './scrapers/teamStats.js';
import { scrapeTeamLinks } from './scrapers/teamLinks.js';

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);
// const auth = getAuth(firebaseApp);


async function scrapeAll() {
    const standings = await scrapeStandings(scrapeURLs.standings);
    const players = await scrapePlayers(scrapeURLs.players);
    const news = await scrapeNews(scrapeURLs.news);
    const analysis = await scrapeAnalysis(scrapeURLs.analysis);
    const transactions = await scrapeTransactions(scrapeURLs.transactions);
    const leadersAverages = await scrapeLeaders(scrapeURLs.leaders.averages);
    const leadersTotals = await scrapeLeaders(scrapeURLs.leaders.totals);
    const leadersMisc = await scrapeLeaders(scrapeURLs.leaders.misc);
    const leadersAdvanced = await scrapeLeaders(scrapeURLs.leaders.advanced);
    const teamStatsAverages = await scrapeTeamStats(scrapeURLs.teamStats.averages);
    const teamStatsTotals = await scrapeTeamStats(scrapeURLs.teamStats.totals);
    const teamStatsMisc = await scrapeTeamStats(scrapeURLs.teamStats.misc);
    const teamStatsAdvanced = await scrapeTeamStats(scrapeURLs.teamStats.advanced);
    const teamLinks = await scrapeTeamLinks(scrapeURLs.teamLinks);

    set(ref(db, 'nba/standings'), standings);
    set(ref(db, 'nba/players'), players);
    set(ref(db, 'nba/news'), news);
    set(ref(db, 'nba/analysis'), analysis);
    set(ref(db, 'nba/transactions'), transactions);
    set(ref(db, 'nba/leaders/averages'), leadersAverages);
    set(ref(db, 'nba/leaders/totals'), leadersTotals);
    set(ref(db, 'nba/leaders/misc'), leadersMisc);
    set(ref(db, 'nba/leaders/advanced'), leadersAdvanced);
    set(ref(db, 'nba/teamStats/averages'), teamStatsAverages);
    set(ref(db, 'nba/teamStats/totals'), teamStatsTotals);
    set(ref(db, 'nba/teamStats/misc'), teamStatsMisc);
    set(ref(db, 'nba/teamStats/advanced'), teamStatsAdvanced);
    set(ref(db, 'nba/teamLinks'), teamLinks);

    console.log('Saved to Firebase!');

    return;
}

scrapeAll()
    .then(() => console.log('Scraping finished!'))
    .catch((err) => console.log(err))
