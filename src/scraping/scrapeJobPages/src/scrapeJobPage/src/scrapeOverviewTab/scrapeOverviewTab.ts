import { IScrapedJob } from "@internwave/scrapers-api";
import { Page } from "puppeteer-core";
import { scrapeOverviewPanelTable } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeOverviewTab/src/scrapeOverviewPanelTable";
import { JobDataTableKnownKey, parseJobDataTable } from "src/utils/scraping/parsing/parseTableValue/parseTableValue";

type ScrapedJobOverviewTab = Omit<IScrapedJob, "company" | "id" | "charts"  | "location" | "jobTitle">;
export const scrapeOverviewTab = async (
    page: Page,
    webpageStr: string
):Promise<ScrapedJobOverviewTab > => {    
    const jobPostingInfoTableData = await scrapeOverviewPanelTable(page, webpageStr, 1);
    const applicationDeliveryTableData = await scrapeOverviewPanelTable(page, webpageStr, 2);

    const out: ScrapedJobOverviewTab = {
        dates: {},
        categorizations: {},
        descriptions: []
    }

    for(const key in jobPostingInfoTableData){
        const value = jobPostingInfoTableData[key];
        switch(key){
            case JobDataTableKnownKey.JobType: {
                const val = parseJobDataTable(key, value)
                if(val === undefined) break;
                out.jobType = [val];
                break;
            }     
            case JobDataTableKnownKey.JobTitle:
                break; //already scraped from table row
            case JobDataTableKnownKey.JobOpenings: {
                const val = parseJobDataTable(key, value)
                if(val === undefined) break;
                out.openings = val;
                break;
            }
            default:
                out.descriptions.push({
                    title: key,
                    content: value,
                    type: "Details"
                });
        }
    }

    for(const key in applicationDeliveryTableData){
        const value = applicationDeliveryTableData[key];
        switch(key){
            case JobDataTableKnownKey.ApplicationDeadline: {
                const val = parseJobDataTable(key, value)
                if(val === undefined) break;
                out.dates.deadlineAt = val;
                break;
            }
            case JobDataTableKnownKey.ApplicationDocumentsRequired: {
                const val = parseJobDataTable(key, value)
                if(val === undefined) break;
                out.categorizations.applicationDocuments = val;
                break;
            }
            case JobDataTableKnownKey.IfByWebsiteGoTo: {
                const val = parseJobDataTable(key, value) 
                if(val === undefined) break;
                if(!out.links){
                    out.links = [];
                }
                out.links?.push({
                    title: "Apply here",
                    url: val
                })
                break;
            }
            default: 
                out.descriptions.push({
                    title: key,
                    content: value,
                    type: "Applying"
                });
        }
       
    }

    return out;
}
