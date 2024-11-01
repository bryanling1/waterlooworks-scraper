import { Page } from "puppeteer-core";
import { Selectors } from "src/constants/Selectors";
import { getWebpageAsString } from "src/utils/scraping/parsing/evaluateWithRequestDomParser/evaluateWithRequestDomParser";
import { scrapeScriptsContent } from "src/utils/scraping/scripts/scrapeScriptsContent";
import { getGroupMatches } from "src/utils/strings/getGroupMatches";

export const getLoadedWorkTermPageString = async (page: Page, webpageStr: string) => {
    const scriptsContent = await scrapeScriptsContent(page, webpageStr, Selectors.JobPosting.WorkTermRating.scripts);
    const reportHolder = getGroupMatches(/reportParams.reportHolder = '([^']*)'/g, scriptsContent)[0];
    const reportHolderId = getGroupMatches(/reportParams.reportHolderId = '([^']*)'/g, scriptsContent)[0];
    const reportHolderField = getGroupMatches(/reportParams.reportHolderField = '([^']*)'/g, scriptsContent)[0];
    const action = getGroupMatches(/'action':'([^']*)'/g, scriptsContent)[0];
    if(!reportHolder || !reportHolderId || !reportHolderField || !action){
        return
    }
    return getWebpageAsString(page, JSON.stringify({
        reportHolder,
        reportHolderId,
        reportHolderField,
        action
    }))
}