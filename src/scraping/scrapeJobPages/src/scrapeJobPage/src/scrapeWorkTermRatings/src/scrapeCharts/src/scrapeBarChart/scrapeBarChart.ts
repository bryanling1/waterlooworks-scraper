import { IChartData } from "@internwave/scrapers-api";
import { Page, ElementHandle } from "puppeteer";
import { keysAndValuesToChartData } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeWorkTermRatings/src/scrapeCharts/src/scrapeBarChart/src/keysAndValuesToChartData";
import { scrapeBarChartKeys } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeWorkTermRatings/src/scrapeCharts/src/scrapeBarChart/src/scrapeBarChartKeys";
import { scrapeBarChartValues } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeWorkTermRatings/src/scrapeCharts/src/scrapeBarChart/src/scrapeBarChartValues";
import { scrapeChartTitle } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeWorkTermRatings/src/scrapeCharts/src/scrapeChartTitle";
import { ChartTitles } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeWorkTermRatings/src/scrapeCharts/src/types/ChartTitles";

export const scrapeBarChart = async(page: Page, chart: ElementHandle<Element>):Promise<IChartData | undefined> => {
    const title = (await scrapeChartTitle(page, chart))?.split("-")[0].trim();
    if(!title || Object.values(ChartTitles).indexOf(title as ChartTitles) === -1){
        return;
    }
    const values = await scrapeBarChartValues(page, chart);
    const keys  = await scrapeBarChartKeys(page, chart);
    return keysAndValuesToChartData(title, keys, values)
}