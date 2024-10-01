import { Page } from "puppeteer";
import { Selectors } from "src/constants/Selectors";
import { TIMEOUT } from "src/constants/Timeout";
import { submitPostForm } from "src/utils/navigation/postForm/submitPostForm";
import { scrapeFormData } from "src/utils/scraping/parsing/formData/scrapeFormData";

export const navigateToFirstTablePage = async (page: Page) => {
    await page.waitForSelector(Selectors.JobsTable.Search.Form,  {timeout: TIMEOUT});
    const formData = await scrapeFormData(page, Selectors.JobsTable.Search.Form) 
    await submitPostForm(page, formData)
}