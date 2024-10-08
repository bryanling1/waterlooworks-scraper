import { ChartType, IChartData } from "@internwave/scrapers-api";
import { ChartTitles } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeWorkTermRatings/src/scrapeCharts/src/types/ChartTitles";
import { IScrapedBarChart } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeWorkTermRatings/src/scrapeCharts/src/types/ScrapedChart";

export const convertBarChartData = (chart: IScrapedBarChart):IChartData | undefined => {
    const title = chart.title.text.split('-')[0]?.trim();
    if(!title  || (Object.values(ChartTitles) as string[]).indexOf(title) === -1){
        return;
    }
    const data: {
        [key: string]: number;
    } = {};
    for(let i = 0; i < chart.xAxis.categories.length; i++){
        const key = chart.xAxis.categories[i].trim();
        const value = chart.series[0].data[i];
        if(key !== undefined && value !== undefined){
            data[key] = value;
        }
    }
    if(Object.keys(data).length === 0){
        return;
    }
    return {
        title,
        data,
        type: ChartType.PIE
    }
}