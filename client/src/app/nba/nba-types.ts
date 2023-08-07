export interface Team {
    id: number;
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    name: string;
    full_name: string;
};

export interface Player {
    'Age': string,
    'Current Team': string,
    'Draft Status': string,
    'HT': string,
    'Nationality': string,
    'Player': string,
    'Pos': string,
    'Pre-Draft Team': string,
    'WT': string,
    'YOS': string,
    'id': string,
    'teamID': string,
};

// export interface PlayerBackup {
//     id: number;
//     first_name: string;
//     last_name: string;
//     position: string;
//     height_feet: null | number;
//     height_inches: null | number;
//     weight_pounds: null | number;
//     team: Team;
// };

export interface News {
    body: string,
    img: string,
    postedOn: string,
    sourceTxt: string,
    sourceURL: string,
    title: string,
};

export interface Analysis {
    author: string,
    body: string,
    img: string,
    img2: string,
    postedOn: string,
    sourceURL: string,
    title: string,
};

export interface Links {
    href: string,
    logo: string,
    name: string,
};

export interface StatsAdvanced {
    'AST%': string,
    'BLK%': string,
    'DRB%': string,
    'DRtg': string,
    'FIC40': string,
    'ORB%': string,
    'ORtg': string,
    'PPS': string,
    'Pace': string,
    'Poss': string,
    'STL%': string,
    'TOV%': string,
    'TRB%': string,
    'TS%': string,
    'Team': string,
    'Total S%': string,
    'eFG%': string,
    'id': string,
};

export interface StatsAverages {
    '3P%': string,
    '3PA': string,
    '3PM': string,
    'APG': string,
    'BPG': string,
    'DRB': string,
    'FG%': string,
    'FGA': string,
    'FGM': string,
    'FT%': string,
    'FTA': string,
    'FTM': string,
    'GP': string,
    'MPG': string,
    'ORB': string,
    'PF': string,
    'PPG': string,
    'RPG': string,
    'SPG': string,
    'TOV': string,
    'Team': string,
    'id': string,
};

export interface StatsMisc {
    '20 Ast': string,
    '20 Reb': string,
    '5 Blk': string,
    '5 Stl': string,
    'Ast|TO': string,
    'Dbl Dbl': string,
    'FT|FGA': string,
    'HOB': string,
    'High Game': string,
    "L's": string,
    'MOV': string,
    'Stl|TO': string,
    'Team': string,
    'Techs': string,
    'Tpl Dbl': string,
    "W's": string,
    'Win %': string,
    'id': string,
};



// TODO 
// STANDINGS, teamStats, transactions and userEXTRA for users --- if favorites make it through :)


