import { Page } from "puppeteer-core";
import { Selectors } from "src/constants/Selectors";

export const isLastTablePage = async(page: Page) => {
    const nextPageButton = await page.$(Selectors.JobsTable.PaginationNextButton);
    if(!nextPageButton){
        return false;
    }
    return await nextPageButton.evaluate((node)=>node.classList.contains("disabled"));
}