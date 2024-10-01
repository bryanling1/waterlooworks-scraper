import { IScrapedJob } from "@internwave/scrapers-api";
import { Page } from "puppeteer";
import { Selectors } from "src/constants/Selectors";
import { navigateToOverviewTab } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeOverviewTab/src/navigateToOverviewTab";
import { scrapeOverviewPanelTable } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeOverviewTab/src/scrapeOverviewPanelTable";
import { IGraduateJobTableRow } from "src/scraping/scrapeTableRows/src/types/JobTableRow";
import { JobDataTableKnownKey, parseJobDataTable } from "src/utils/scraping/parsing/parseTableValue/parseTableValue";

type ScrapedJobOverviewTab = Omit<IScrapedJob, "company" | "id" | "charts"  | "location">;
export const scrapeOverviewTab = async (
    page: Page,
    tableRow:  IGraduateJobTableRow
):Promise<ScrapedJobOverviewTab > => {    
    await navigateToOverviewTab(page, tableRow.requestBody);
    await page.waitForSelector(
        Selectors.JobPosting.TableRows(1)
    )
    const jobPostingInfoTableData = await scrapeOverviewPanelTable(page, 1);
    const applicationDeliveryTableData = await scrapeOverviewPanelTable(page, 2);
    //const companyInfoTableData = await scrapeOverviewPanelTable(page, 3);

    const out: ScrapedJobOverviewTab = {
        jobTitle: tableRow.jobTitle,
        dates: {},
        categorizations: {},
        descriptions: []
    }

    for(const key in jobPostingInfoTableData){
        const value = jobPostingInfoTableData[key];
        switch(key){
            case JobDataTableKnownKey.JobType:
            case JobDataTableKnownKey.JobTitle:
                break; //already scraped from table row
            case JobDataTableKnownKey.JobOpenings:
                const val = parseJobDataTable(key, value)
                if(val === undefined) break;
                out.openings = val;
                break;
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
