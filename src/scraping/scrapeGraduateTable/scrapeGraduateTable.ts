import { ProgressReporter } from "@internwave/scrapers-api";
import { Page } from "puppeteer";
import { Links } from "src/constants/Links";
import { scrapeJobPages } from "src/scraping/scrapeJobPages/scrapeJobPages";
import { scrapeTableRows } from "src/scraping/scrapeTableRows/scrapeTableRows";

export const scrapeGraduateTable = async (page: Page, progressReporter: ProgressReporter) => {
    await page.goto(Links.GRADUATE_JOBS);
    const tableRows = await scrapeTableRows(page, progressReporter);
    console.log(tableRows.slice(-5))
    return scrapeJobPages(tableRows, progressReporter);
}