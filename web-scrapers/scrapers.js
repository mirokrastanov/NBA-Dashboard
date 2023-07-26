// const puppeteer = require('puppeteer');
import puppeteer from 'puppeteer';
import { scrapeURLs } from './constants.js';

export async function scrapeStandings(url) {
    // exports.scrapeStandings = async function (url) {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto(url);

    async function scrapeHeaders(selector) {
        const headersRowEl1 = await page.waitForSelector(selector);
        const headersThArray1 = await headersRowEl1.$$('th');
        const headersArray1 = [];
        for (let i = 0; i < headersThArray1.length; i++) {
            const element = headersThArray1[i];
            const thText = await page.evaluate(element => element.textContent, element);
            headersArray1.push(thText);
        }
        return headersArray1;
    }
    async function scrapeBody(selector, headersArray1) {
        const bodyEl1 = await page.waitForSelector(selector);
        const bodyTdArray1 = await bodyEl1.$$('td');
        const bodyArray1 = { temp: {}, result: [] };
        for (let i = 0; i < bodyTdArray1.length; i++) {
            const element = bodyTdArray1[i];
            const thText = await page.evaluate(element => element.textContent, element);
            const img = await element.$$('img');
            let imgSrc;
            if (img.length != 0) {
                let imgEl = img[0];
                imgSrc = await page.evaluate(imgEl => imgEl.getAttribute('src'), imgEl);
                // console.log(imgSrc);
            }
            if (imgSrc) {
                bodyArray1.temp[headersArray1[i % 12]] = [thText, imgSrc];
            } else {
                bodyArray1.temp[headersArray1[i % 12]] = [thText];
            }
            if (Object.keys(bodyArray1.temp).length == 12) {
                let copy = JSON.parse(JSON.stringify(bodyArray1.temp));
                bodyArray1.result.push(copy);
                bodyArray1.temp = {};
            }
        }
        return bodyArray1.result;
    }
    // if selector wail - copy it directly from the inspector tool in chrome
    const headersArray = await scrapeHeaders('.Crom_headers__mzI_m');
    const bodyArray1 = await scrapeBody('.Crom_body__UYOcU', headersArray);
    const bodyArray2 = await scrapeBody('#__next > div.Layout_base__6IeUC.Layout_justNav__2H4H0 > div.Layout_mainContent__jXliI > div.MaxWidthContainer_mwc__ID5AG > section.Block_block__62M07.nba-stats-content-block > div > div:nth-child(3) > div.Crom_container__C45Ti.crom-container > table > tbody', headersArray);
    bodyArray1.map(x => {
        let teamMain = x['Team'][0].split(' - ');
        let teamCut = teamMain.splice(0, 1).join('');
        teamCut = teamCut.split('');
        let rank;
        if (teamCut[1] == Number(teamCut[1])) {
            rank = teamCut.splice(0, 2);
        } else {
            rank = teamCut.splice(0, 1);
        }
        rank = rank.join('');
        let letter = teamMain.join('');
        let team = teamCut.join('');
        x['Team'].splice(0, 1, rank, team, letter);
    });
    bodyArray2.map(x => {
        let teamMain = x['Team'][0].split(' - ');
        let teamCut = teamMain.splice(0, 1).join('');
        teamCut = teamCut.split('');
        let rank;
        if (teamCut[1] == Number(teamCut[1])) {
            rank = teamCut.splice(0, 2);
        } else {
            rank = teamCut.splice(0, 1);
        }
        rank = rank.join('');
        let letter = teamMain.join('');
        let team = teamCut.join('');
        x['Team'].splice(0, 1, rank, team, letter);
    });
    // console.log(bodyArray1);

    browser.close();

    return {
        eastConference: bodyArray1,
        westConference: bodyArray2,
        updatedAt: ['MM/DD/YYYY, HH:MM:SS', (new Date()).toLocaleString()],
    };
}

// scrapeStandings(scrapeURLs.standings);
