import { ILocation } from "@internwave/scrapers-api";
import { Page } from "puppeteer";
import { Selectors } from "src/constants/Selectors";
import { AddrewwMatrix } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeMapTab/src/AddressMatrix";

export const scrapeMapTabLocation = async (page: Page): Promise<ILocation> => {
    const str = await page.$eval(Selectors.JobPosting.Map.Address, el => (el as HTMLElement).innerText);
    const matrix = new AddrewwMatrix(str);
    const out: ILocation = {
        address: matrix.getValue(1, 0),
        city: matrix.getValue(2, 0),
        state: matrix.getValue(2, 1),
        country: matrix.getValue(2, 2),
        postalCode: matrix.getValue(3, 0),
    }
    return out;
}