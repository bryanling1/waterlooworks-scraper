import { ElementHandle, Page } from "puppeteer";
import { Selectors } from "src/constants/Selectors";
import { TIMEOUT } from "src/constants/Timeout";
import { isLastTablePage } from "src/scraping/scrapeTableRows/src/isLastTablePage";

export const gotoNextTablePage = async(
    page: Page,
    firstRowOfCurrentPage: ElementHandle<Element>
):Promise<boolean> => {
    if(await isLastTablePage(page)){
        return false;
    }
    const firstID = await firstRowOfCurrentPage.evaluate((node)=>node.querySelector("td:nth-child(3)")?.textContent)
    const nextPageButton = await page.$(Selectors.JobsTable.PaginationNextButton);
    if(!nextPageButton){
        return false;
    }
    await (await nextPageButton.$("a"))?.evaluate((node: Element)=>(node as HTMLLIElement).click())
    await page.waitForFunction(
        (oldId, Selectors) => {
            const newId = document
                .querySelector(Selectors.JobsTable.Row)
                ?.querySelector("td:nth-child(3)")
                ?.textContent
            return newId !== oldId;
        },
        {
            timeout: TIMEOUT
        }, 
        firstID,
        Selectors
    );
    return true;
}