import { ElementHandle } from "puppeteer";
import { ICoopJobTableRow } from "src/scraping/scrapeJobs/src/scrapeCoopJobs/src/scrapeCoopTableRowData/types/ICoopJobTableRow";
import { scrapeTdData } from "src/scraping/scrapeTableRows/src/scrapeTdData";
import { scrapeRequestBodyFromOnclick } from "src/utils/navigation/postForm/requestBodyFromOnclick/scrapeRequestBodyFromOnclick";

export const scrapeCoopTableRowData = async (tr: ElementHandle<Element>): Promise<ICoopJobTableRow | undefined> => {
    const tds = await tr.$$("td");
    const id = await scrapeTdData(tds[2]);
    const jobTitle = await scrapeTdData(tds[3], "span a");
    const organization = await scrapeTdData(tds[4]);
    const requestBody = await scrapeRequestBodyFromOnclick(tds[3], "span a")
    if(!id || !jobTitle || !organization || !requestBody){
        return
    }
    const positionType = await scrapeTdData(tds[6]);
    const city = await scrapeTdData(tds[8]);
    const appDeadline = await scrapeTdData(tds[9]);
    
    return {
        id: id.trim(),
        jobTitle: jobTitle.trim(),
        organization: organization.trim(),
        positionType: positionType?.trim(),
        city: city?.trim(),
        appDeadline: appDeadline ? new Date(appDeadline.trim()).getTime() : undefined,
        requestBody
    }
}
