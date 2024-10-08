import { IChartData, ICharts } from "@internwave/scrapers-api";
import { convertBarChartData } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeWorkTermRatings/src/scrapeCharts/src/convertBarChartData/convertBarChartData";
import { convertPieChartData } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeWorkTermRatings/src/scrapeCharts/src/convertPieChartData/convertPieChartData";
import { IScrapedBarChart, IScrapedPieChart, ScrapedChart } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeWorkTermRatings/src/scrapeCharts/src/types/ScrapedChart";
import { parseJSData } from "src/utils/scraping/parsing/parseJSData/parseJSData";
import { getGroupMatches } from "src/utils/strings/getGroupMatches";

function assertType<T>(value: unknown): asserts value is T {}


export const scrapeCharts = async (
    webPageStr: string, 
    totalHires: number
): Promise<ICharts> => {
    const out: ICharts = {};
    const charts = getGroupMatches(/\.orbisChart\(\s*({[\s\S]*?})*\);/g, webPageStr);
    for(const chart of charts){
        const chartObj = parseJSData<ScrapedChart>(chart)
        let chartData: IChartData | undefined = undefined;
        switch(chartObj.chart.type){
            case "pie":
                assertType<IScrapedPieChart>(chartObj);
                chartData = convertPieChartData(chartObj, totalHires);
                break;
            case "bar":
                assertType<IScrapedBarChart>(chartObj);
                chartData = convertBarChartData(chartObj);
                break;
        }
        if(chartData){
            out[chartData.title] = chartData;
        }
    }
    return out;
}