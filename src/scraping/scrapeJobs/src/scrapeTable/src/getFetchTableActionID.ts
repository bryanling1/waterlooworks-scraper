import { Page } from "puppeteer-core";
import { parseJSData } from "src/utils/scraping/parsing/parseJSData/parseJSData";
import { getOuterBracketContent } from "src/utils/strings/getOuterBracketContent";

export const getFetchTableActionID = async (page: Page): Promise<string | undefined> => {
    const scripts = (await page.$$("script"));
    for(const script of scripts){
        const text = await script.evaluate(node => node.textContent);
        if(!text?.includes("dataParams: ")){
            continue;
        }
        const startIndex = text.indexOf("dataParams: ") + "dataParams: ".length;
        const bracketContent = getOuterBracketContent(text.slice(startIndex));
        if(!bracketContent){
            continue;
        }
        try{
            const data = parseJSData<{action: string}>(bracketContent)
            return data.action.trim()
        }catch{
            continue;
        }
    }
    return undefined;
}