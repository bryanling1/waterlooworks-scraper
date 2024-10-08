import { API } from '@internwave/scrapers-api';
import puppeteer from "puppeteer";
import { login } from 'src/scraping/login/login';
import { scrapeJobs } from 'src/scraping/scrapeJobs/scrapeJobs';

API.onStartScraping(3)(async (args, progressReporter)=>{
    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: null,
    });
    const page = await browser.newPage();
    await page.setJavaScriptEnabled(true);
    await login(page, progressReporter, args[1] === "true");
    return scrapeJobs(page, progressReporter, args[0]);
})
