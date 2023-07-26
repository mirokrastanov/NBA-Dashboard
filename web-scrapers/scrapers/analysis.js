// const puppeteer = require('puppeteer');
import puppeteer from 'puppeteer';
import { newsRootURL, scrapeURLs } from '../constants.js';

export async function scrapeAnalysis(url) {
    const selectors = {
        analysis: '#site-takeover > div.main-container > div > div.large-column-left.news-column',
        article: '.article.clearfix',
    };
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setViewport({ width: 1000, height: 1024 });
    await page.goto(url);

    const panel = await page.waitForSelector(selectors.analysis);
    const raw = await panel.$$(selectors.article);
    const result = [];

    for (let i = 0; i < raw.length; i++) {
        const element = raw[i];
        const title = await element.$('a.article-title');
        const author = await element.$('p:nth-child(2) > a');
        const postedOn = await element.$('p:nth-child(3)');
        const body = await element.$('div.article-content.content');
        const img = await element.$('div.lead-photo img');
        const img2 = await element.$('img.wiretap-icon');

        const titleTxt = await page.evaluate(title => title.textContent, title);
        const authorTxt = await page.evaluate(author => author.textContent, author);
        const sourceURL = newsRootURL + (await page.evaluate(title => title.getAttribute('href'), title));
        const bodyTxt = (await page.evaluate(body => body.textContent, body)).split('Read more »').join('').trim();
        const toPush = {
            title: titleTxt,
            author: authorTxt,
            sourceURL: sourceURL,
            body: bodyTxt,
        };
        if (postedOn) toPush.postedOn = await page.evaluate(postedOn => postedOn.textContent, postedOn);
        if (img) toPush.img = newsRootURL + (await page.evaluate(img => img.getAttribute('src'), img));
        if (img2) toPush.img2 = newsRootURL + (await page.evaluate(img2 => img2.getAttribute('src'), img2));

        result.push(toPush);
    }
    // console.log(result);

    browser.close();
    return {
        data: result,
        updatedAt: ['MM/DD/YYYY, HH:MM:SS', (new Date()).toLocaleString()],
    };
}

// scrapeAnalysis(scrapeURLs.analysis);
