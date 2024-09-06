import { Page } from "puppeteer";
import { Selectors } from "src/constants/Selectors";
import { TIMEOUT } from "src/constants/Timeout";

export interface IJobTableRow{
    id: string,
    jobTitle: string,
    organization: string,
    positionType?: string,
    city?: string,
    appDeadline?: number
}

export const getTableRows = async (page: Page):Promise<IJobTableRow[]> => {
    const form = await page.$(Selectors.SEARCH_FORM);
    if(!form){
        throw new Error("Search form not found")
    }
    const searchInput = await form.$(Selectors.SEARCH_KEYWORD_INPUT);
    await searchInput?.type(""); //Otherwise KEYWORD will be searched for whatever reason
    await form.evaluate((node: Element) => (node as HTMLFormElement).submit());    
    const out: IJobTableRow[] = []
    while(true){
        await page.waitForSelector(Selectors.JOB_TABLE_ROW,  {timeout: TIMEOUT});   
        const trs = await page.$$(Selectors.JOB_TABLE_ROW);
        for(const tr of trs){
            const tds = await tr.$$("td");
            const id = await tds[2].evaluate((node)=>node.textContent);
            const jobTitle = await tds[3].evaluate((node)=>node.querySelector("span a")?.textContent);
            const organization = await tds[4].evaluate((node)=>node.textContent);
            if(!id || !jobTitle || !organization){
                continue;
            }
            const positionType = await tds[6].evaluate((node)=>node.textContent);
            const city = await tds[8].evaluate((node)=>node.textContent);
            const appDeadline = await tds[9].evaluate((node)=>node.textContent);
            const job: IJobTableRow = {
                id: id.trim(),
                jobTitle: jobTitle.trim(),
                organization: organization.trim(),
                positionType: positionType?.trim(),
                city: city?.trim(),
                appDeadline: appDeadline ? new Date(appDeadline.trim()).getTime() : undefined
            }
            out.push(job);
        }

        const nextPageButton = await page.$(Selectors.PAGINATION_NEXT_BUTTON);
        if(!nextPageButton){
            break;
        }
        const nextPageButtonEnabled = !(await nextPageButton.evaluate((node)=>node.classList.contains("disabled")));
        if(!nextPageButtonEnabled){
            break;
        }        
        const firstID = await trs[0]?.evaluate((node)=>node.querySelector("td:nth-child(3)")?.textContent) ?? "";
        await (await nextPageButton.$("a"))?.evaluate((node: Element)=>(node as HTMLLIElement).click())
        await page.waitForFunction(
            (oldId, Selectors) => {
                const newId = document
                    .querySelector(Selectors.JOB_TABLE_ROW)
                    ?.querySelector("td:nth-child(3)")
                    ?.textContent
                return newId !== oldId;
            },
            {
                timeout: TIMEOUT
            }, 
            firstID,
            Selectors
        );
    }
    return out;
}
