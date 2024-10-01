import { Page } from "puppeteer";
import { Selectors } from "src/constants/Selectors";
import { scrapeRowKeyValue } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeOverviewTab/src/scrapeRowKeyValue";

export const scrapeOverviewPanelTable = async(page: Page, panel: number): Promise<Record<string, string>> => {
    const out: Record<string, string> = {}
    const rows = await page.$$(Selectors.JobPosting.TableRows(panel))
    for(const row of rows){
        const pair = await scrapeRowKeyValue(row);
        if(!pair){
            continue
        }
        const [key, value] = pair
        out[key] = value
    }
    return out;
}