import { Page } from "puppeteer-core"
import { Selectors } from "src/constants/Selectors"
import { evaluateWebpageString } from "src/utils/scraping/parsing/evaluateWithRequestDomParser/evaluateWithRequestDomParser"

export const hasWorkTermData = async (page: Page, webpageStr:string): Promise<boolean> => {
    const isNoData = await evaluateWebpageString(
        page, webpageStr, Selectors.JobPosting.WorkTermRating.Alert
    )((document, selector) => {
        return document.querySelector(selector)?.textContent === "There is no data to display"
    });
    return !isNoData
}