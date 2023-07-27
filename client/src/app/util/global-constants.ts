export const proxy: string = 'https://proxy-1.mirokrastanov.repl.co/';
export const noProxy: string = 'https://';

export const nbaAPIdomain: string = 'www.balldontlie.io/api/v1';

// API - free data with flaws and not all the data needed
export const endpointsNBA: any = { // any to avoid property checking errors
    players: nbaAPIdomain + '/players',
    teams: nbaAPIdomain + '/teams',
    games: nbaAPIdomain + '/games',
    stats: nbaAPIdomain + '/stats',
    seasonAvg: nbaAPIdomain + '/season_averages'
};

// MY Firebase DB - with scraped data - TODO: deploy the scraper online so it updates it on certain interval
export const dbROOT: string = 'https://nba-1-480a7-default-rtdb.europe-west1.firebasedatabase.app/';
export const dbSufix: string = '.json';
export const dbTarget: {} | string = {
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
    users: {},
};

// TODO --> add firebase fetching URL for users + auth all
