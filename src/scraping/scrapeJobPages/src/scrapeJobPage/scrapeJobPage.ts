import { IScrapedJob } from "@internwave/scrapers-api";
import { Page } from "puppeteer";
import { Links } from "src/constants/Links";
import { loadCookies } from "src/scraping/login/src/cookies";
import { scrapeMapTab } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeMapTab/scrapeMapTab";
import { scrapeOverviewTab } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeOverviewTab/scrapeOverviewTab";
import { scrapeWorkTermRatings } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeWorkTermRatings/scrapeWorkTermRatings";
import { IGraduateJobTableRow } from "src/scraping/scrapeTableRows/src/types/JobTableRow";

export const scrapeJobPage = async (
    page: Page,
    tableRow:  IGraduateJobTableRow
): Promise<IScrapedJob>=> {
    await loadCookies(page);
    await Promise.all(
        [
            page.goto(Links.GRADUATE_JOBS),
            page.waitForNavigation()
        ]
    )
    const {
        dates,
        categorizations,
        openings,
        links,
        descriptions
    } = await scrapeOverviewTab(page, tableRow);
    const {
        location
    } = await scrapeMapTab(page);
    const {
        charts   
    } = await scrapeWorkTermRatings(page);
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
        jobType: tableRow.positionType ? [tableRow.positionType] : [],
        url: Links.graduateJob(tableRow.id),
        links,
    }
}
