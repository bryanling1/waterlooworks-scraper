import { API } from '@internwave/scrapers-api';
import puppeteer from "puppeteer-core";
import { JobBoard } from 'src/constants/JobBoards';
import { login } from 'src/scraping/login/login';
import { scrapeJobs } from 'src/scraping/scrapeJobs/scrapeJobs';

API.onStartScraping(3)(async (args, progressReporter)=>{
    if(!args[0] || !args[1]){
        throw new Error("Missing arguments");
    }
    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: null,
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH
    });
    const page = await browser.newPage();
    await page.setJavaScriptEnabled(true);
    await login(page, progressReporter, args[1] === "true");
    return scrapeJobs(page, progressReporter, args[0] as JobBoard);
})

  
