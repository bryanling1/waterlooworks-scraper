import { Page } from "puppeteer"
import { Selectors } from "src/constants/Selectors"

export const hasWorkTermData = async (page: Page): Promise<boolean> => {
    await Promise.race(
        [
            page.waitForSelector(Selectors.JobPosting.WorkTermRating.TabldTDs),
            page.waitForSelector(Selectors.JobPosting.WorkTermRating.Alert)
        ]
    )
    const isNoData = (await page.$(Selectors.JobPosting.WorkTermRating.Alert))?.evaluate(alert => alert.textContent === "There is no data to display")
    return !isNoData
}