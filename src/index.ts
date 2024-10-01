import { API } from '@internwave/scrapers-api';
import puppeteer from "puppeteer";
import { login } from 'src/scraping/login/login';
import { scrapeGraduateTable } from 'src/scraping/scrapeGraduateTable/scrapeGraduateTable';

API.onStartScraping(3)(async (args, progressReporter)=>{
    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: null,
    });
    const page = await browser.newPage();
    await page.setJavaScriptEnabled(true);
    await login(page, progressReporter, args[1] === "true");
    switch(args[0]){
        case "Graduating and Full-Time":
            return scrapeGraduateTable(page, progressReporter);
        default:
            return []
    }
})
