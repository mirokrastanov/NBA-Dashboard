// const puppeteer = require('puppeteer');
import puppeteer from 'puppeteer';
import { newsRootURL, scrapeURLs } from '../constants.js';

export async function scrapeLeaders(url) {
    const selector = '.overall-leader';
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setViewport({ width: 1000, height: 1024 });
    await page.goto(url);

    const main = await page.waitForSelector('.main');
    const tables = await main.$$(selector);
    const result = [];

    for (let i = 0; i < tables.length; i++) {
        const table = tables[i];
        const tableReady = { category: null, top5: [] };
        const category = await table.$('.category-name');
        tableReady.category = await page.evaluate(category => category.textContent, category);
        const lines = await table.$$('.player-container.clearfix');
        for (let j = 0; j < lines.length; j++) {
            const line = lines[j];
            const lineReady = { player: null, stat: null, rank: j + 1, };
            const name = await line.$('.player-name > a');
            lineReady.player = await page.evaluate(name => name.textContent, name);
            const stat = await line.$('.stat');
            lineReady.stat = await page.evaluate(stat => stat.textContent, stat);
            tableReady.top5.push(lineReady);
        }
        result.push(tableReady);
    }

    // console.log(result);
    // console.log(result[0]);

    browser.close();
    return {
        data: result,
        updatedAt: ['MM/DD/YYYY, HH:MM:SS', (new Date()).toLocaleString()],
    };
}

// scrapeLeaders(scrapeURLs.leaders.advanced);
