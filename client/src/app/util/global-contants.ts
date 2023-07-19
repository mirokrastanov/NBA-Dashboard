export const proxy: string = 'https://proxy-1.mirokrastanov.repl.co/';
export const noProxy: string = 'https://';

export const nbaAPIdomain: string = 'www.balldontlie.io/api/v1';

export const endpointsNBA: any = { // any to avoid property checking errors
    players: nbaAPIdomain + '/players',
    teams: nbaAPIdomain + '/teams',
    games: nbaAPIdomain + '/games',
    stats: nbaAPIdomain + '/stats',
    seasonAvg: nbaAPIdomain + '/season_averages'
};


// TODO --> add firebase fetching URL
