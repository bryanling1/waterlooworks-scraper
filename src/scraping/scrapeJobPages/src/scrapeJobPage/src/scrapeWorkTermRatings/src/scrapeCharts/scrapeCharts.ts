import { IChartData, ICharts } from "@internwave/scrapers-api";
import { Page } from "puppeteer";
import { Selectors } from "src/constants/Selectors";
import { scrapeBarChart } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeWorkTermRatings/src/scrapeCharts/src/scrapeBarChart/scrapeBarChart";
import { scrapeChartTitle } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeWorkTermRatings/src/scrapeCharts/src/scrapeChartTitle";
import { scrapePieChart } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeWorkTermRatings/src/scrapeCharts/src/scrapePieChart/scrapePieChart";

export const scrapeCharts = async (page: Page, totalHires: number): Promise<ICharts> => {
    const out: ICharts = {};
    const charts = await page.$$(Selectors.JobPosting.WorkTermRating.Charts)
    for(const chart of charts){
        const title = await scrapeChartTitle(page, chart);
        if(!title){
            continue;
        }
        let chartData: IChartData | undefined = undefined;
        const id = await page.evaluate(chart => chart.id, chart);
        if(id.startsWith('pie')){
            chartData = await scrapePieChart(page, chart, totalHires);
        }else if(id.startsWith('bar')){
            chartData = await scrapeBarChart(page, chart);
        }
        if(chartData){
            out[chartData.title] = chartData;
        }
    }
    return out;
}