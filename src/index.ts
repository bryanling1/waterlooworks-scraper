import {onStartScraping, reportActionRequest } from '@internwave/scrapers-api';
import puppeteer from "puppeteer";
import { getTableRows } from 'src/scraping/getTableRows';
import { handleLogin } from 'src/scraping/handleLogin';
import { setupUserData } from 'src/setup/setupUserData';



onStartScraping(async ({optionValues})=>{
    const browser = await puppeteer.launch({ 
        headless: false,
        userDataDir: setupUserData(optionValues[1] === "true")
    });
    const page = await browser.newPage();
    reportActionRequest("Login to Waterlooworks")
    await handleLogin(page);
    const tableRows = await getTableRows(page);
    //DEBUG
    const idMap: Record<string, number> = {}
    tableRows.forEach((row)=>{
        if(!idMap[row.id]){
            idMap[row.id] = 0;
        }
        idMap[row.id]++;
    })
    const duplicateIds = Object.entries(idMap).filter(([, count])=>count>1);
    console.log(tableRows)
    console.log("Duplicate IDs: ", duplicateIds)
    console.log("Total: ", tableRows.length)
    await new Promise((resolve) => {
        browser.on('disconnected', resolve);
    });
    
})
