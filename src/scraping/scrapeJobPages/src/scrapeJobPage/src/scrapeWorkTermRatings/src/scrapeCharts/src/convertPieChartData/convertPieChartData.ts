import { ChartType, IChartData } from "@internwave/scrapers-api";
import { ChartTitles } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeWorkTermRatings/src/scrapeCharts/src/types/ChartTitles";
import { IScrapedPieChart } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeWorkTermRatings/src/scrapeCharts/src/types/ScrapedChart";

export const convertPieChartData = (chart: IScrapedPieChart, totalHires: number): IChartData | undefined => {
    const title = chart.title.text.split('<br>')[0]?.trim();
    if(!title || (Object.values(ChartTitles) as string[]).indexOf(title) === -1){
        return;
    }
    const data: {
        [key: string]: number;
    } = {};
    for(const point of chart.series?.[0].data ?? []){
        data[point.name] = Math.floor((point.y / 100) * totalHires)
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