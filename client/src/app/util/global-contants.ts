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
export const firebaseNBA: any = {
    standings: 'https://nba-1-480a7-default-rtdb.europe-west1.firebasedatabase.app/.json',

};

// TODO --> add firebase fetching URL for users + auth all
