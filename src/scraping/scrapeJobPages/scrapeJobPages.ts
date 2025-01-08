import { from, firstValueFrom, of } from 'rxjs';
import { catchError, filter, mergeMap, toArray } from 'rxjs/operators';
import { ProgressReporter, IScrapedJob } from '@internwave/scrapers-api';
import { scrapeJobPage } from 'src/scraping/scrapeJobPages/src/scrapeJobPage/scrapeJobPage';
import { Page } from 'puppeteer-core';
import { IJobTableRow } from 'src/scraping/scrapeTableRows/src/types/JobTableRow';
import { Strings } from 'src/constants/Strings';
import { JobBoard } from 'src/constants/JobBoards';

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
    board: JobBoard,
    jobsDataOverride: Partial<IScrapedJob>[] = []
): Promise<IScrapedJob[]> => {
    const rows = tableRows.length;
    progressReporter.nextStep(Strings.scraping.jobPages, rows);

    return firstValueFrom(from(tableRows).pipe(
        mergeMap((row, index) => {
            progressReporter.reportProgress(Strings.scraping.jobPage(index + 1, rows));
            return from(scrapeJobPage(page, row, board,jobsDataOverride[index])).pipe(
                catchError(() => {
                    return of(undefined);
                })
            );
        }, CONCURRENCY),
        filter(result => !!result),
        toArray()
    ))
};
