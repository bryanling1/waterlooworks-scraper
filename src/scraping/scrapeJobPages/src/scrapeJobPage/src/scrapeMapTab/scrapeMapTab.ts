import { ILocation } from "@internwave/scrapers-api"
import { Page } from "puppeteer-core"
import { Selectors } from "src/constants/Selectors"
import { AddrewwMatrix } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeMapTab/src/AddressMatrix"
import { scrapeRequestBodyFromOnclickWebpageStr } from "src/utils/navigation/postForm/requestBodyFromOnclick/scrapeRequestBodyFromOnclickWebpageStr"
import { evaluateWithRequestDomParser } from "src/utils/scraping/parsing/evaluateWithRequestDomParser/evaluateWithRequestDomParser"

interface IScrapeMapTab {
    location: ILocation
}
export const scrapeMapTab = async (page: Page, webpageStr: string) => {
    const out:IScrapeMapTab = {
        location: {}
    }
    const requestBody = await scrapeRequestBodyFromOnclickWebpageStr(page, webpageStr, Selectors.JobPosting.TabAnchor("Map"))
    if(!requestBody){
        return out
    }
    const addressStr = await evaluateWithRequestDomParser(
        page, requestBody, Selectors.JobPosting.Map.Address
    )((document, selector) => {
        return (document.querySelector(selector) as HTMLElement | null)?.innerText
    });
    if(!addressStr){
        return out
    }
    const matrix = new AddrewwMatrix(addressStr);
    out.location = {
        address: matrix.getValue(1, 0),
        city: matrix.getValue(2, 0),
        state: matrix.getValue(2, 1),
        country: matrix.getValue(2, 2),
        postalCode: matrix.getValue(3, 0),
    }
    return out
}