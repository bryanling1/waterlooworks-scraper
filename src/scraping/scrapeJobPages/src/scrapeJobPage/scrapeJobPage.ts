import { IScrapedJob } from "@internwave/scrapers-api";
import { Page } from "puppeteer-core";
import { JobBoard } from "src/constants/JobBoards";
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
    jobBoard: JobBoard,
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
    const url = jobBoard === JobBoard.GRADUATING_AND_FULL_TIME ? Links.graduateJob(tableRow.id) : Links.coopJob(tableRow.id)

    return {
        id: tableRow.id,
        company: {
            name: tableRow.organization
        },
        jobTitle: tableRow.jobTitle,
        dates,
        location,
        categorizations,
        descriptions,
        charts,
        openings,
        url,
        links,
        ...jobDataOverride
    }
}
