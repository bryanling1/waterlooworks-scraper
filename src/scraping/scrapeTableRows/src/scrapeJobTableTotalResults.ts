import { Page } from "puppeteer-core";
import { Selectors } from "src/constants/Selectors";
import { TIMEOUT } from "src/constants/Timeout";

export const scrapeJobTableTotalResults = async (page:Page) => {
    await page.waitForSelector(Selectors.JobsTable.TotalResults,  {timeout: TIMEOUT});   
    return page.evaluate((selector) => {
        const badgeElement = document.querySelector(selector);
        if (badgeElement) {
          const resultText = badgeElement.textContent?.trim();
          return resultText ? parseInt(resultText, 10) : null;
        }
        return undefined
      }, Selectors.JobsTable.TotalResults);
}