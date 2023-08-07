// const puppeteer = require('puppeteer');
import puppeteer from 'puppeteer';
import { scrapeURLs } from '../constants.js';

export async function scrapeTeamLinks(url) {
    const selectors = {
        ctr: '#__next > div.Layout_base__6IeUC.Layout_justNav__2H4H0 > div.Layout_mainContent__jXliI > div.MaxWidthContainer_mwc__ID5AG > section > div > div.TeamDivisions_wrapper__5_SVo',
        team: '.TeamFigure_tf__jA5HW',
        logo: '.TeamLogo_logo__PclAJ',
        href: '.Anchor_anchor__cSc3P.TeamFigure_tfMainLink__OPLFu',
    };
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setViewport({ width: 1000, height: 1024 });
    await page.goto(url);

    const ctr = await page.waitForSelector(selectors.ctr);
    const teams = await ctr.$$(selectors.team);
    const result = [];
    for (let i = 0; i < teams.length; i++) {
        const element = teams[i];
        const logoEl = await element.$(selectors.logo);
        const logo = await logoEl.evaluate(element => element.getAttribute('src'), element);
        const hrefEl = await element.$(selectors.href);
        const href = await hrefEl.evaluate(element => element.getAttribute('href'), element);
        result.push({ logo, href: 'https://www.nba.com' + href, name: href.substring(1, href.length - 1) });
    }
    // console.log(result);


    browser.close();
    return {
        data: result,
        updatedAt: ['MM/DD/YYYY, HH:MM:SS', (new Date()).toLocaleString()],
    };
}

// scrapeTeamLinks(scrapeURLs.teamLinks);
