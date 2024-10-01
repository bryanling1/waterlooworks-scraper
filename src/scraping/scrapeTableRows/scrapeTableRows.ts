import { ProgressReporter } from "@internwave/scrapers-api";
import { Page } from "puppeteer";
import { Selectors } from "src/constants/Selectors";
import { scrapeTableRowData } from "src/scraping/scrapeTableRows/src/scrapeTableRowData";
import { scrapeJobTableTotalResults } from "src/scraping/scrapeTableRows/src/scrapeJobTableTotalResults";
import { gotoNextTablePage } from "src/scraping/scrapeTableRows/src/gotoNextTablePage";
import { waitForTablePageLoad } from "src/scraping/scrapeTableRows/src/waitForTablePageLoad";
import { IGraduateJobTableRow } from "src/scraping/scrapeTableRows/src/types/JobTableRow";
import { navigateToFirstTablePage } from "src/scraping/scrapeTableRows/src/navigateToFirstTablePage";
import { TIMEOUT } from "src/constants/Timeout";


export const scrapeTableRows = async (page: Page, progressReporter: ProgressReporter):Promise<IGraduateJobTableRow[]> => {
    await navigateToFirstTablePage(page);
    const out: IGraduateJobTableRow[] = []
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
