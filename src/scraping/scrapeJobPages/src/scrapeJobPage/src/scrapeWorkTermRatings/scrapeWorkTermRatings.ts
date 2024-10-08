import { ICharts } from "@internwave/scrapers-api";
import { Page } from "puppeteer";
import { Selectors } from "src/constants/Selectors";
import { getLoadedWorkTermPageString } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeWorkTermRatings/src/getLoadedWorkTermPageString.ts/getLoadedWorkTermPageString";
import { hasWorkTermData } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeWorkTermRatings/src/hasWorkTermData";
import { scrapeCharts } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeWorkTermRatings/src/scrapeCharts/scrapeCharts";
import { scrapeTotalHires } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeWorkTermRatings/src/scrapeTotalHires";
import { scrapeRequestBodyFromOnclickWebpageStr } from "src/utils/navigation/postForm/requestBodyFromOnclick/scrapeRequestBodyFromOnclickWebpageStr";
import { getWebpageAsString } from "src/utils/scraping/parsing/evaluateWithRequestDomParser/evaluateWithRequestDomParser";

interface IScrapeWorkTermRatings {
    charts: ICharts
}
export const scrapeWorkTermRatings = async (
    page: Page, 
    webpageStr: string
):Promise<{charts: ICharts}> => {
    const out: IScrapeWorkTermRatings = {
        charts: {}
    };
    const requestBody = await scrapeRequestBodyFromOnclickWebpageStr(
        page, webpageStr, Selectors.JobPosting.TabAnchor("Work Term Ratings")
    );
    if(!requestBody){
        return out
    }
    const workTermWebpageStr = await getWebpageAsString(page, requestBody);
    const hasData = await hasWorkTermData(page, workTermWebpageStr);
    if(!hasData){
        return out
    } 
    const loadedWorkTermPageStr = await getLoadedWorkTermPageString(page, workTermWebpageStr);
    if(!loadedWorkTermPageStr){
        return out
    }
    const totalHires = await scrapeTotalHires(page, loadedWorkTermPageStr);
    if(totalHires <= 0){
        return out
    }
    const charts = await scrapeCharts(loadedWorkTermPageStr, totalHires);
    out.charts = charts
    return out 
}
