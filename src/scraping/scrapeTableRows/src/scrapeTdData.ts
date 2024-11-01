import { ElementHandle } from "puppeteer-core";

export const scrapeTdData = async (td: ElementHandle<HTMLTableCellElement>, querySelector?: string) => {
    if(querySelector){
        return await td.evaluate((node, selector)=>node.querySelector(selector)?.textContent, querySelector);
    }
    return await td.evaluate((node)=>node.textContent);
}