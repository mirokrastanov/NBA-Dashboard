// const puppeteer = require('puppeteer');
import puppeteer from 'puppeteer';
import { newsRootURL, scrapeURLs } from '../constants.js';

export async function scrapeNews(url) {
    const selectors = {
        news: '#site-takeover > div.main-container > div > div.large-column-left.news-column',
        article: '.article.clearfix',
    };
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setViewport({ width: 1000, height: 1024 });
    await page.goto(url);

    const newsPanel = await page.waitForSelector(selectors.news);
    const newsRaw = await newsPanel.$$(selectors.article);
    const newsResult = [];

    for (let i = 0; i < newsRaw.length; i++) {
        const element = newsRaw[i];
        const title = await element.$('a.article-title');
        const postedOn = await element.$('p.author-details');
        const body = await element.$('div.article-content.content > div.article-body');
        const source = await element.$('p.article-source > a');
        const img = await element.$('div.lead-photo img');

        if (!source) continue;
        const titleTxt = await page.evaluate(title => title.textContent, title);
        const sourceTxt = await page.evaluate(source => source.textContent, source);
        const sourceURL = await page.evaluate(source => source.getAttribute('href'), source);
        const toPush = {
            title: titleTxt,
            sourceTxt: sourceTxt,
            sourceURL: sourceURL,
        };
        if (postedOn) toPush.postedOn = await page.evaluate(postedOn => postedOn.textContent, postedOn);
        if (body) toPush.body = await page.evaluate(body => body.textContent, body);
        if (img) toPush.img = newsRootURL + (await page.evaluate(img => img.getAttribute('src'), img));

        newsResult.push(toPush);
    }
    // console.log(newsResult);

    browser.close();
    return {
        data: newsResult,
        updatedAt: ['MM/DD/YYYY, HH:MM:SS', (new Date()).toLocaleString()],
    };
}

// scrapeNews(scrapeURLs.news);
