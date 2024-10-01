import { Page } from "puppeteer"
import { TIMEOUT } from "src/constants/Timeout"
import { submitPostForm } from "src/utils/navigation/postForm/submitPostForm"

export const navigateToOverviewTab = async (page: Page, requestBody: BodyInit) => {
    return Promise.all([
        await submitPostForm(page, requestBody),
        await page.waitForNavigation({timeout: TIMEOUT})
    ])
}