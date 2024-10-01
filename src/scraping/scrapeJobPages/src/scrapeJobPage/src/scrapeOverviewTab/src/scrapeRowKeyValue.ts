import { ElementHandle } from "puppeteer"
import { normalizeJobTableKey, sanitizeJobTableValue } from "src/utils/scraping/parsing/sanitize"

export const scrapeRowKeyValue = async (row: ElementHandle<Element>) => {
    const pair = await row.evaluate((node: Element) => {
        const key = node.querySelector("td:nth-child(1)")?.textContent
        let value = node.querySelector("td:nth-child(2) span")?.innerHTML
        if(!value){ //Most td are wrapped with span, but not always
            value = node.querySelector("td:nth-child(2)")?.innerHTML
        }
        if(!key || !value){
            return undefined
        }
        return [key, value]
    })
    if(!pair){
        return
    }
    const [key, value] = pair
    return [normalizeJobTableKey(key), sanitizeJobTableValue(value)]
}