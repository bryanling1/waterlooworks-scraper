import {onStartScraping, reportActionRequest } from '@internwave/scrapers-api';
import puppeteer from "puppeteer";
import { Links } from './constants/Links';
import { Selectors } from './constants/Selectors';
import path from 'path';

interface IJobTableRow{
    id: string,
    jobTitle: string,
    organization: string,
    positionType?: string,
    city?: string,
    appDeadline?: number
}

onStartScraping(async ({optionValues})=>{
        const userDataDir = process.env.FILE_STORAGE_BASE_DIR ? path.join(process.env.FILE_STORAGE_BASE_DIR, "user_data") : undefined;
        console.log("Option values 2: ", optionValues)
        console.log(userDataDir)
        const browser = await puppeteer.launch({ 
            headless: false,
            userDataDir,
        });
        const page = await browser.newPage();
        reportActionRequest("Login to Waterlooworks")
        await page.goto(Links.LOGIN);
        await page.waitForSelector(Selectors.LOGOUT_BUTTON, {timeout: 0});
        await page.goto(Links.GRADUATE_JOBS);
        await page.waitForSelector(Selectors.SEARCH_BUTTON_GRADUATE_JOBS)
        await page.click(Selectors.SEARCH_BUTTON_GRADUATE_JOBS);
        const tableRows: IJobTableRow[] = []
        let nextPageButtonEnabled = true;
        while(nextPageButtonEnabled){
            await page.waitForSelector(Selectors.JOB_TABLE_ROW);   
            const trs = await page.$$(Selectors.JOB_TABLE_ROW);
            for(const tr of trs){
                const tds = await tr.$$("td");
                const id = await tds[2].evaluate((node)=>node.textContent);
                const jobTitle = await tds[3].evaluate((node)=>node.textContent);
                const organization = await tds[4].evaluate((node)=>node.textContent);
                if(!id || !jobTitle || !organization){
                    continue;
                }
                const positionType = await tds[5].evaluate((node)=>node.textContent);
                const city = await tds[6].evaluate((node)=>node.textContent);
                const appDeadline = await tds[7].evaluate((node)=>node.textContent);
                const job: IJobTableRow = {
                    id: id.trim(),
                    jobTitle: jobTitle.trim(),
                    organization: organization.trim(),
                    positionType: positionType?.trim(),
                    city: city?.trim(),
                    appDeadline: appDeadline ? new Date(appDeadline.trim()).getTime() : undefined
                }
                tableRows.push(job);
            }

            const nextPageButton = await page.$(Selectors.PAGINATION_NEXT_BUTTON);
            if(!nextPageButton){
                break;
            }
            nextPageButtonEnabled = !(await nextPageButton.evaluate((node)=>node.classList.contains("disabled")));
            if(nextPageButtonEnabled){
                await nextPageButton?.click();
            }
            await page.waitForSelector(Selectors.JOB_TABLE_ROW);
        }
        console.log("Table rows: ", tableRows)
        console.log("Total: ", tableRows.length)
        await new Promise((resolve) => {
            browser.on('disconnected', resolve);
        });
    
})
