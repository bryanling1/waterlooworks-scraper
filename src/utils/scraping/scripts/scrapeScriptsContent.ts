import { Page } from "puppeteer-core";
import { evaluateWebpageString } from "src/utils/scraping/parsing/evaluateWithRequestDomParser/evaluateWithRequestDomParser";

export const scrapeScriptsContent = (page: Page, webpageStr: string, selector: string): Promise<string> => {
    return evaluateWebpageString(
        page, webpageStr, selector
    )((document, selector) => {
        return Array.from(document.querySelectorAll(selector))
            .map(x=>(x as HTMLElement).innerText)
            .filter(x=>x.length > 0)
            .join("\n")
    });
}