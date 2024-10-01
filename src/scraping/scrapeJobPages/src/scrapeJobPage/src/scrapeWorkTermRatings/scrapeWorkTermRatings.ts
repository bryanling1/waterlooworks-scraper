import { ICharts } from "@internwave/scrapers-api";
import { Page } from "puppeteer";
import { hasWorkTermData } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeWorkTermRatings/src/hasWorkTermData";
import { navigateToWorkTermRatingsTab } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeWorkTermRatings/src/navigateToWorkTermRatingsTab";
import { scrapeCharts } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeWorkTermRatings/src/scrapeCharts/scrapeCharts";
import { scrapeTotalHires } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeWorkTermRatings/src/scrapeTotalHires";

interface IScrapeWorkTermRatings {
    charts: ICharts
}
export const scrapeWorkTermRatings = async (page: Page):Promise<{charts: ICharts}> => {
    const out: IScrapeWorkTermRatings = {
        charts: {}
    };
    await navigateToWorkTermRatingsTab(page);
    if(!(await hasWorkTermData(page))){
        return out
    } 
    const totalHires = await scrapeTotalHires(page);
    if(totalHires <= 0){
        return out
    }
    const charts = await scrapeCharts(page, totalHires);
    out.charts = charts
    return out 
}