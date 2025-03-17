import { ProgressReporter } from "@internwave/scrapers-api";
import { Page } from "puppeteer-core";
import { Links } from "src/constants/Links";
import { scrapeJobModals } from "src/scraping/scrapeJobs/src/scrapeJobModals/scrapeJobModals";
import { scrapeTable } from "src/scraping/scrapeJobs/src/scrapeTable/scrapeTable";
import { IJobRowResponse } from "src/scraping/scrapeJobs/src/scrapeTable/types/Response";

export const scrapeCoopJobs = async (page: Page, progressReporter: ProgressReporter) => {
    await page.goto(Links.COOP_JOBS);
    const jobRows:IJobRowResponse[] = await scrapeTable(page, progressReporter);
    return scrapeJobModals(page, progressReporter, jobRows);
}
