import { ProgressReporter } from "@internwave/scrapers-api";
import { Page } from "puppeteer-core";
import { Links } from "src/constants/Links";
import { scrapeGraduateTableRowData } from "src/scraping/scrapeJobs/src/scrapeGraduateJobs/src/scrapeGraduateTableRowData/scrapeGraduateTableRowData";
import { scrapeJobPages } from "src/scraping/scrapeJobPages/scrapeJobPages";
import { scrapeTableRows } from "src/scraping/scrapeTableRows/scrapeTableRows";
import { JobBoard } from "src/constants/JobBoards";

export const scrapeGraduateJobs = async (page: Page, progressReporter: ProgressReporter) => {
    await page.goto(Links.GRADUATE_JOBS);
    const tableRows = (await scrapeTableRows(page, progressReporter, scrapeGraduateTableRowData))
    return scrapeJobPages(
        tableRows, 
        page, 
        progressReporter,
        JobBoard.GRADUATING_AND_FULL_TIME,
        tableRows.map(row => ({ jobType: row.positionType ? [row.positionType] : [],}))
    );
}
