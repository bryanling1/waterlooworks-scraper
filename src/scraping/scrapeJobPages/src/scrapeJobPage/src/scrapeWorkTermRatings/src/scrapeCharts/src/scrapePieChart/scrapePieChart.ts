import { IChartData } from "@internwave/scrapers-api";
import { Page, ElementHandle } from "puppeteer";
import { scrapeChartTitle } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeWorkTermRatings/src/scrapeCharts/src/scrapeChartTitle";
import { keyValuesToChartData } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeWorkTermRatings/src/scrapeCharts/src/scrapePieChart/src/keyValuesToChartData";
import { scrapePieChartKeyValues } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeWorkTermRatings/src/scrapeCharts/src/scrapePieChart/src/scrapePieChartKeyValues";
import { ChartTitles } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeWorkTermRatings/src/scrapeCharts/src/types/ChartTitles";

export const scrapePieChart = async (page: Page, chart: ElementHandle<Element>, totalHires: number): Promise<IChartData | undefined> => {
    const title = await scrapeChartTitle(page, chart);
    if(!title || Object.values(ChartTitles).indexOf(title as ChartTitles) === -1){
        return;
    }
    const keyValues = await scrapePieChartKeyValues(page, chart);
    return keyValuesToChartData(title, keyValues, totalHires);
}