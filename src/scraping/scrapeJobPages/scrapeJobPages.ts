import { from, firstValueFrom } from 'rxjs';
import { mergeMap, toArray } from 'rxjs/operators';
import { ProgressReporter, IScrapedJob } from '@internwave/scrapers-api';
import { scrapeJobPage } from 'src/scraping/scrapeJobPages/src/scrapeJobPage/scrapeJobPage';
import { Page } from 'puppeteer';
import { IJobTableRow } from 'src/scraping/scrapeTableRows/src/types/JobTableRow';

const CONCURRENCY = 4;
/**
 * 
 * @param tableRows 
 * @param page 
 * @param progressReporter 
 * @param jobsDataOverride 
 * Useful if you want to override the scraped job (from that job page) with data scraped from the table row page
 * @returns 
 */
export const scrapeJobPages = async (
    tableRows: IJobTableRow[],
    page: Page,
    progressReporter: ProgressReporter,
    jobsDataOverride: Partial<IScrapedJob>[] = []
): Promise<IScrapedJob[]> => {
    const rows = tableRows.length;
    progressReporter.nextStep("Scraping job pages", rows);

    return firstValueFrom(from(tableRows).pipe(
        mergeMap((row, index) => {
            progressReporter.reportProgress(`Scraping job page ${index + 1} of ${rows}`);
            return scrapeJobPage(page, row, jobsDataOverride[index]);
        }, CONCURRENCY),
        toArray()
    ))
};
