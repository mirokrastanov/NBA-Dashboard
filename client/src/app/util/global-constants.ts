export const proxy: string = 'https://proxy-1.mirokrastanov.repl.co/';
export const noProxy: string = 'https://';

export const nbaAPIdomain: string = 'www.balldontlie.io/api/v1';

// API - A BACKUP OPTION if needed as it has very limited data and a lot of important information missing
export const endpointsNBA: any = {
    players: nbaAPIdomain + '/players',
    teams: nbaAPIdomain + '/teams',
    games: nbaAPIdomain + '/games',
    stats: nbaAPIdomain + '/stats',
    seasonAvg: nbaAPIdomain + '/season_averages'
};

// MY Firebase DB - with scraped data - TODO: deploy the scraper online so it updates it on certain interval
export const firebaseConfig = {
    apiKey: "AIzaSyAoQvUDD11vzDNgv9kuBlnnyDquxvHYQWI",
    authDomain: "nba-1-480a7.firebaseapp.com",
    databaseURL: "https://nba-1-480a7-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "nba-1-480a7",
    storageBucket: "nba-1-480a7.appspot.com",
    messagingSenderId: "130806097515",
    appId: "1:130806097515:web:b478223fb8d42565bab32e"
};

export const dbROOT: string = 'https://nba-1-480a7-default-rtdb.europe-west1.firebasedatabase.app/';
export const dbSuffix: string = '.json';
export const dbTarget: any = {
    nba: {
        analysis: 'nba/analysis/data/',
        leaders: {
            advanced: 'nba/leaders/advanced/data/',
            averages: 'nba/leaders/averages/data/',
            misc: 'nba/leaders/misc/data/',
            totals: 'nba/leaders/totals/data/',
        },
        news: 'nba/news/data/',
        players: 'nba/players/data/',
        standings: {
            east: 'nba/standings/eastConference/',
            west: 'nba/standings/westConference/',
        },
        teamStats: {
            advanced: 'nba/teamStats/advanced/data/',
            averages: 'nba/teamStats/averages/data/',
            misc: 'nba/teamStats/misc/data/',
            totals: 'nba/teamStats/totals/data/',
        },
        transactions: 'nba/transactions/data/',
    },
    users: 'users/',
};

// TODO --> add firebase fetching URL for users + auth all
