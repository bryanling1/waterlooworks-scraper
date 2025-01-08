import { ProgressReporter } from "@internwave/scrapers-api";
import { Page } from "puppeteer-core";
import { Links } from "src/constants/Links";
import { scrapeJobPages } from "src/scraping/scrapeJobPages/scrapeJobPages";
import { scrapeTableRows } from "src/scraping/scrapeTableRows/scrapeTableRows";
import { scrapeCoopTableRowData } from "src/scraping/scrapeJobs/src/scrapeCoopJobs/src/scrapeCoopTableRowData/scrapeCoopTableRowData";
import { JobBoard } from "src/constants/JobBoards";

export const scrapeCoopJobs = async (page: Page, progressReporter: ProgressReporter) => {
    await page.goto(Links.COOP_JOBS);
    const tableRows = await scrapeTableRows(page, progressReporter, scrapeCoopTableRowData);
    return scrapeJobPages(
        tableRows, 
        page, 
        progressReporter,
        JobBoard.COOP,
        tableRows.map(row => ({ 
            jobType: ["Co-op"],
            applications: row.applications,
            status: row.status,
            openings: row.openings,
        }))
    );
}
