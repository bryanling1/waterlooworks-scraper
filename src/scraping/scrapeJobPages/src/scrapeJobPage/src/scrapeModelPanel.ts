import { Page } from "puppeteer-core";
import { evaluateWebpageString } from "src/utils/scraping/parsing/evaluateWithRequestDomParser/evaluateWithRequestDomParser";
import { sanitizeMap } from "src/utils/scraping/parsing/sanitizeMap";

export const scrapeModalPanels = async (page: Page, webpage: string):Promise<[
    Record<string, string>,
    Record<string, string>,
    Record<string, string>

]> => {
    return Promise.all([
        scrapeModalPanel(page, webpage, 3),
        scrapeModalPanel(page, webpage, 4),
        scrapeModalPanel(page, webpage, 5)
    ])
}
const scrapeModalPanel = async (page: Page, webpage: string, nthPanel: number):Promise<
    Record<string, string>
> => {
    const out = await evaluateWebpageString(
        page, 
        webpage,
        nthPanel
    )((document, panel) => {
        const out: Record<string, string> = {}
        const rows = document.querySelectorAll(`.panel:nth-of-type(${panel}) .tag__key-value-list`)
        for(const row of rows){
            const key = row.querySelector("span")?.textContent
            if(!key){
                continue;
            }
            const elements = row.querySelectorAll("span ~ *")
            out[key] = ""
            for(const element of elements){
                out[key] += element.innerHTML.replace(/\t\n/g, "") + " "
            }
        }
        return out;
    });
    return sanitizeMap(out);
}