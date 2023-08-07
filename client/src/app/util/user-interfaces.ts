
export interface RegisterUser {
    username: string,
    email: string,
    password: string,
    repeatPassword: string,
};

export interface LoginUser {
    email: string,
    password: string,
};

export interface DB {
    nba: {
        analysis: string,
        leaders: {
            advanced: string,
            averages: string,
            misc: string,
            totals: string,
        },
        news: string,
        players: string,
        standings: {
            east: string,
            west: string,
        },
        teamStats: {
            advanced: string,
            averages: string,
            misc: string,
            totals: string,
        },
        transactions: string,
        teamLinks: string,
    },
    users: string,
};