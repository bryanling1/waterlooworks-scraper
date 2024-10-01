import { Page } from "puppeteer";
import { Selectors } from "src/constants/Selectors";

export const scrapeTotalHires = async (page: Page): Promise<number> => {
    const tds = (await page.$$(Selectors.JobPosting.WorkTermRating.TabldTDs));
    let totalHires = 0;
    for(const td of tds){
        const text = await page.evaluate(td => td.textContent, td);
        if(!text){
            continue;
        }
        const numberValue = parseInt(text);
        if(!isNaN(numberValue)){
            totalHires += numberValue;
        }
    }
    return totalHires
}