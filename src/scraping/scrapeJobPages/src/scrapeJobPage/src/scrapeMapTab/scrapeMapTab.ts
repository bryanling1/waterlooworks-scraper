import { Page } from "puppeteer"
import { navigateToMapTab } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeMapTab/src/navigateToMapTab"
import { scrapeMapTabLocation } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeMapTab/src/scrapeMapTabLocation"

export const scrapeMapTab = async (page: Page) => {
    await navigateToMapTab(page)
    const location = await scrapeMapTabLocation(page)
    return {
        location
    }
}