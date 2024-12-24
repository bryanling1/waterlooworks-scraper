import { ProgressReporter } from "@internwave/scrapers-api";
import { Page } from "puppeteer-core";
import { scrapeCoopJobs } from "src/scraping/scrapeJobs/src/scrapeCoopJobs/scrapeCoopJobs";
import { scrapeGraduateJobs } from "src/scraping/scrapeJobs/src/scrapeGraduateJobs/scrapeGraduateJobs";

export const scrapeJobs = async (
    page: Page, 
    progressReporter: ProgressReporter,
    type: string
) => {
    switch(type){
        case "Graduating and Full-Time":
            return scrapeGraduateJobs(page, progressReporter);
        default:
            return scrapeCoopJobs(page, progressReporter);
    }
}