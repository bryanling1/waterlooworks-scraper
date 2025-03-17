import { IScrapedJob, IChartData } from "@internwave/scrapers-api";
import { convertBarChartData } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeWorkTermRatings/src/scrapeCharts/src/convertBarChartData/convertBarChartData";
import { convertPieChartData } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeWorkTermRatings/src/scrapeCharts/src/convertPieChartData/convertPieChartData";
import { IWorkTermRatingResponse, IWorkTermRatingTableSection } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeWorkTermRatings/src/scrapeCharts/src/types/WorkTermRatingResponse";
import { removeHtmlTags } from "src/utils/strings/removeHtmlTags";
import { trimWithRegex } from "src/utils/strings/trimWithRegex";

export const workTermReponseToCharts = (org: string, response: IWorkTermRatingResponse):IScrapedJob["charts"] => {
    if(!response.sections){
        return undefined;
    }
    const sections = response.sections.filter(x=>!!x.title).map(section=>{
        const titleUntilOrg = section.title.split(org)[0] ?? ""
        return {
            ...section,
            title: trimWithRegex(removeHtmlTags(titleUntilOrg), /[a-zA-Z]/)
        }
    }).filter(x=>!!x.title)

    const hiringHistory = sections.find(x=>x.title.toLowerCase() === "hiring history" && x.type === "table") as IWorkTermRatingTableSection | undefined;
    if(!hiringHistory){
        return undefined
    }
    
    const totalHires = hiringHistory.rows[1]?.reduce((acc, curr) => {
        const num = parseInt(curr);
        if(isNaN(num)){
            return acc;
        }
        return acc + num;
    }, 0) ?? 0;
    
    if(!totalHires){
        return undefined;
    }

    const out:IScrapedJob["charts"] = {};
    for(const section of sections){
        let chart: IChartData | undefined;
        switch(section.type){
            case "pieChart": {
                chart = convertPieChartData(section, totalHires);
                break;
            }
            case "barChart": {
                chart = convertBarChartData(section);
                break;
            }
        }
        if(chart){
            out[chart.title] = chart;
        }
    }

    return out;
}

