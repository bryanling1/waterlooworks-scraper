import { Cluster } from 'puppeteer-cluster';
import { Mutex } from 'async-mutex';
import { ProgressReporter, IScrapedJob } from '@internwave/scrapers-api';
import { scrapeJobPage } from 'src/scraping/scrapeJobPages/src/scrapeJobPage/scrapeJobPage';
import { IGraduateJobTableRow } from 'src/scraping/scrapeTableRows/src/types/JobTableRow';

const THREADS = 20;

export const scrapeJobPages = async (
    tableRows: IGraduateJobTableRow[],
    progressReporter: ProgressReporter
): Promise<IScrapedJob[]> => {
    progressReporter.nextStep("Scraping job pages", tableRows.length);
    const out: IScrapedJob[] = [];
    const mutex = new Mutex();

    // Create a cluster with the desired number of workers
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_BROWSER,
        maxConcurrency: THREADS,
        puppeteerOptions: {
            headless: true
        },
    });

    // Define a task for the cluster
    await cluster.task(async ({ page, data: row }) => {
        const result = await scrapeJobPage(page, row);
            out.push(result);
            progressReporter.reportProgress(`Scraping job ${out.length} of ${tableRows.length}`);
    });

    // Queue all table rows
    for (const row of tableRows) {
        cluster.queue(row);
    }

    // Wait for the cluster to finish
    await cluster.idle();
    await cluster.close();

    return out;
};