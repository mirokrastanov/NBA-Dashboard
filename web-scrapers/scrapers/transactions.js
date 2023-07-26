// const puppeteer = require('puppeteer');
import puppeteer from 'puppeteer';
import { newsRootURL, scrapeURLs } from '../constants.js';

export async function scrapeTransactions(url) {
    const selectors = {
        panel: '#site-takeover > div.main-container > div > div.large-column-left > div',
        article: '.portal.widget.fullpage',
    };
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setViewport({ width: 1000, height: 1024 });
    await page.goto(url);

    const panel = await page.waitForSelector(selectors.panel);
    const raw = await panel.$$(selectors.article);
    const result = [];

    for (let i = 0; i < raw.length; i++) {
        const element = raw[i];
        const article = { date: null, lines: [] };

        const date = await element.$('h3');
        article.date = await date.evaluate(date => date.textContent, date);
        const parent = await element.$('ul');
        const children = await parent.$$('li');

        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const line = { body: null, tags: [] };
            line.body = await child.evaluate(child => child.textContent, child);
            const tags = await child.$$('a');
            for (let j = 0; j < tags.length; j++) {
                const tag = tags[j];
                const tagTxt = await tag.evaluate(tag => tag.textContent, tag);
                line.tags.push(tagTxt);
            }
            article.lines.push(line)
        }
        result.push(article);
    }
    // console.log(result);

    browser.close();
    return {
        data: result,
        updatedAt: ['MM/DD/YYYY, HH:MM:SS', (new Date()).toLocaleString()],
    };
}

// scrapeTransactions(scrapeURLs.transactions);
