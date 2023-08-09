import { fbSECRET, teamsURL } from "../constants.js";
import axios from 'axios';

export async function scrapeTeams(url) {
    let res = await axios.get(url);
    let data = await res.data;
    // console.log(data);
    return data;
}

// scrapeTeams(teamsURL);

export async function fbAdminPUT(url, teamsAPI) {
    let adminURL = url + `.json?=auth=${fbSECRET}`;
    let res = await axios.put(adminURL, teamsAPI);
    let data = await res.data;
    return data;
}

export function teamsOutput(teamsData) {
    let result = teamsData.data;
    return {
        data: result,
        updatedAt: ['MM/DD/YYYY, HH:MM:SS', (new Date()).toLocaleString()],
    };
}