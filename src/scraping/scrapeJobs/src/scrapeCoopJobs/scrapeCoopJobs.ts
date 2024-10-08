import { ProgressReporter } from "@internwave/scrapers-api";
import { Page } from "puppeteer";
import { Links } from "src/constants/Links";
import { scrapeGraduateTableRowData } from "src/scraping/scrapeJobs/src/scrapeGraduateJobs/src/scrapeGraduateTableRowData/scrapeGraduateTableRowData";
import { scrapeJobPages } from "src/scraping/scrapeJobPages/scrapeJobPages";
import { scrapeTableRows } from "src/scraping/scrapeTableRows/scrapeTableRows";

export const scrapeCoopJobs = async (page: Page, progressReporter: ProgressReporter) => {
    await page.goto(Links.COOP_JOBS);
    const tableRows = await scrapeTableRows(page, progressReporter, scrapeGraduateTableRowData);
    return scrapeJobPages(
        tableRows, 
        page, 
        progressReporter,
        tableRows.map(row => ({ jobType: row.positionType ? [row.positionType] : [],}))
    );
}
