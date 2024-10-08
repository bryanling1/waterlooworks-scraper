import { Page } from "puppeteer";
import { Selectors } from "src/constants/Selectors";
import { evaluateWebpageString } from "src/utils/scraping/parsing/evaluateWithRequestDomParser/evaluateWithRequestDomParser";

export const scrapeTotalHires = async (page: Page, pageString: string): Promise<number> => {
    const values = await evaluateWebpageString(
        page, pageString, Selectors.JobPosting.WorkTermRating.TabldTDs
    )((document, selector) => {
        const out: string[] = [];
        for(const td of document.querySelectorAll(selector)){
            if(!td.textContent){
                continue
            }
            out.push(td.textContent)
        }
        return out;
    });
    let totalHires = 0;
    for(const value of values){
        if(!value){
            continue
        }
        const numberValue = parseInt(value);
        if(!isNaN(numberValue)){
            totalHires += numberValue;
        }
    }
    return totalHires
}