// const puppeteer = require('puppeteer');
import puppeteer from 'puppeteer';
import { newsRootURL, scrapeURLs } from '../constants.js';

export async function scrapeTeamStats(url) {
    const selectors = {
        table: '#table-3734',
        thead: 'thead',
        tbody: 'tbody',
    };
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setViewport({ width: 1000, height: 1024 });
    await page.goto(url);

    async function scrapeHeaders() {
        const headersRowEl1 = await page.waitForSelector(selectors.thead);
        const headersThArray1 = await headersRowEl1.$$('th');
        const headersArray1 = [];
        for (let i = 0; i < headersThArray1.length; i++) {
            const element = headersThArray1[i];
            const thText = await page.evaluate(element => element.textContent, element);
            headersArray1.push(thText);
        }
        return headersArray1;
    }

    async function scrapeBody(headersArray1) {
        const bodyEl1 = await page.waitForSelector(selectors.tbody);
        const bodyTdArray1 = await bodyEl1.$$('td');
        const bodyArray1 = { temp: {}, result: [] };
        for (let i = 0; i < bodyTdArray1.length; i++) {
            const element = bodyTdArray1[i];
            const thText = await page.evaluate(element => element.textContent, element);
            const aTags = await element.$$('a');
            if (aTags.length > 1) {
                const anchorTextArr = [];
                for (let j = 0; j < aTags.length; j++) {
                    const el = aTags[j];
                    const aText = await page.evaluate(el => el.textContent, el);
                    anchorTextArr.push(aText);
                }
                bodyArray1.temp[headersArray1[i % headersArray1.length]] = anchorTextArr;
            } else {
                bodyArray1.temp[headersArray1[i % headersArray1.length]] = thText;
            }
            if (Object.keys(bodyArray1.temp).length == headersArray1.length) {
                let copy = JSON.parse(JSON.stringify(bodyArray1.temp));
                bodyArray1.result.push(copy);
                bodyArray1.temp = {};
            }
        }
        return bodyArray1.result;
    }

    const headers = await scrapeHeaders();
    headers[headers.indexOf('#')] = 'id';
    const body = await scrapeBody(headers);
    
    // console.log(headers);
    // console.log(body);

    browser.close();
    return {
        data: body,
        updatedAt: ['MM/DD/YYYY, HH:MM:SS', (new Date()).toLocaleString()],
    };
}

// scrapeTeamStats(scrapeURLs.teamStats.advanced);
