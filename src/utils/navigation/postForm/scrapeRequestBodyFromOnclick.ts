import { ElementHandle } from "puppeteer";

export const scrapeRequestBodyFromOnclick = async (element: ElementHandle | null, selector=""):Promise<BodyInit | undefined>  => {
    return element?.evaluate((node: Element, selectorStr) => {
        const a = selectorStr.length ? node.querySelector(selectorStr): node
        if(a){
            const onclick = a.getAttribute("onClick")
            const str = onclick?.substring(onclick.indexOf('{'), onclick.indexOf('}') + 1)
            .replace(/'/g, '"')
            if(str){
                return JSON.parse(str)
            }
        }
    }, selector)
}