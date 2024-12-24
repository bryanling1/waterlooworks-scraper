import { Page } from "puppeteer-core";
import { Selectors } from "src/constants/Selectors";
import { TIMEOUT } from "src/constants/Timeout";
import { isLastTablePage } from "src/scraping/scrapeTableRows/src/isLastTablePage";

export const waitForTablePageLoad = async (page: Page): Promise<void> => {
    await page.waitForFunction(
        (isLastPage, selector) => {
            if(isLastPage){
                return true
            }
            return document.querySelectorAll(selector).length === 100
        },
        {
            timeout: TIMEOUT
        },
        await isLastTablePage(page),
        Selectors.JobsTable.Row
    );
}