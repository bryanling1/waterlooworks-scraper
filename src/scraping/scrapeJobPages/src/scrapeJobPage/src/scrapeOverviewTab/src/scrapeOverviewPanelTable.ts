import { Page } from "puppeteer";
import { Selectors } from "src/constants/Selectors";
import { evaluateWebpageString } from "src/utils/scraping/parsing/evaluateWithRequestDomParser/evaluateWithRequestDomParser";
import { sanitizeRecord } from "src/utils/scraping/parsing/sanitize";

export const scrapeOverviewPanelTable = async(
    page: Page, 
    webpageStr: string, 
    panel: number,
): Promise<Record<string, string>> => {
    const records = await evaluateWebpageString(
        page, 
        webpageStr, 
        Selectors.JobPosting.TableRows(panel)
    )((document, rowsSelector) => {
        const out: Record<string, string> = {}
        const rows = document.querySelectorAll(rowsSelector)
        for(const row of rows){
            const key = row.querySelector("td:nth-child(1)")?.textContent
            let value = row.querySelector("td:nth-child(2) span")?.innerHTML
            if(!value){ 
                value = row.querySelector("td:nth-child(2)")?.innerHTML
            }
            if(!key || !value){
                continue;
            }
            out[key] = value
        }
        return out;
    });  
    return sanitizeRecord(records)
}
