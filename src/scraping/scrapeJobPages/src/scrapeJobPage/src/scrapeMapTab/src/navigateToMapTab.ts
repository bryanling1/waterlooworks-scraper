import { Page } from "puppeteer"
import { scrapeRequestBodyFromOnclick } from "src/utils/navigation/postForm/scrapeRequestBodyFromOnclick"
import { submitPostForm } from "src/utils/navigation/postForm/submitPostForm"

//Assumes we're on the job posting page
export const navigateToMapTab = async (page: Page) => {
    const requestBody = await scrapeRequestBodyFromOnclick(await page.$("div.tab-content ul.nav-pills li:nth-child(2) a"))
    if(!requestBody){
        return
    }
    await Promise.all([
        await submitPostForm(page, requestBody),
        await page.waitForNavigation()
    ])
}