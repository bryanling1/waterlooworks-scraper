import { ProgressReporter } from "@internwave/scrapers-api";
import { ElementHandle, Page } from "puppeteer";
import { Selectors } from "src/constants/Selectors";
import { scrapeJobTableTotalResults } from "src/scraping/scrapeTableRows/src/scrapeJobTableTotalResults";
import { gotoNextTablePage } from "src/scraping/scrapeTableRows/src/gotoNextTablePage";
import { waitForTablePageLoad } from "src/scraping/scrapeTableRows/src/waitForTablePageLoad";
import { navigateToFirstTablePage } from "src/scraping/scrapeTableRows/src/navigateToFirstTablePage";
import { TIMEOUT } from "src/constants/Timeout";
import { IJobTableRow } from "src/scraping/scrapeTableRows/src/types/JobTableRow";


export const scrapeTableRows = async <T extends IJobTableRow>(
    page: Page, 
    progressReporter: ProgressReporter,
    scrapeTableRowData: (tr: ElementHandle<Element>) => Promise<T | undefined>
):Promise<T[]> => {
    await navigateToFirstTablePage(page);
    const out: T[] = []
    const totalResults = await scrapeJobTableTotalResults(page) ?? 1;
    progressReporter.nextStep("Scraping job table rows", totalResults)
    let trs = await page.$$(Selectors.JobsTable.Row);
    do {
        await waitForTablePageLoad(page);
        await page.waitForSelector(Selectors.JobsTable.Row,  {timeout: TIMEOUT})
        trs = await page.$$(Selectors.JobsTable.Row);
        for(const tr of trs){
            const rowData = await scrapeTableRowData(tr)
            if(rowData){
                out.push(rowData)
            }
            progressReporter.reportProgress();
        }
    } while( await gotoNextTablePage(page, trs[0]) )
    return out;
}