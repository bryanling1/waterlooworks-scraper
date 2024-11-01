import { IScrapedJob } from "@internwave/scrapers-api";
import { Page } from "puppeteer-core";
import { Links } from "src/constants/Links";
import { scrapeMapTab } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeMapTab/scrapeMapTab";
import { scrapeOverviewTab } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeOverviewTab/scrapeOverviewTab";
import { scrapeWorkTermRatings } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeWorkTermRatings/scrapeWorkTermRatings";
import { IJobTableRow } from "src/scraping/scrapeTableRows/src/types/JobTableRow";
import { getWebpageAsString } from "src/utils/scraping/parsing/evaluateWithRequestDomParser/evaluateWithRequestDomParser";

/**
 * 
 * @param page 
 * @param tableRow 
 * @param jobDataOverride 
 * Useful if you want to override the scraped job (from that job page) with data scraped from the table row page
 * @returns 
 */
export const scrapeJobPage = async (
    page: Page,
    tableRow:  IJobTableRow,
    jobDataOverride: Partial<IScrapedJob> = {}
): Promise<IScrapedJob>=> {
    const webpageStr = await getWebpageAsString(page, tableRow.requestBody)
    const [
        overviewTabData,
        mapTabData,
        workTermRatingsTabData
    ] = await Promise.all([
        scrapeOverviewTab(page, webpageStr),
        scrapeMapTab(page, webpageStr),
        scrapeWorkTermRatings(page, webpageStr)
    ]);
    const {
        dates,
        categorizations,
        openings,
        links,
        descriptions
    } = overviewTabData
    const {
        location
    } = mapTabData
    const {
        charts   
    } = workTermRatingsTabData

    return {
        id: tableRow.id,
        company: {
            name: tableRow.organization
        },
        jobTitle: tableRow.jobTitle,
        dates: {
            deadlineAt: dates.deadlineAt,
        },
        location,
        categorizations: {
            applicationDocuments: categorizations.applicationDocuments
        },
        descriptions,
        charts,
        openings,
        url: Links.graduateJob(tableRow.id),
        links,
        ...jobDataOverride
    }
}
