import { ElementHandle } from "puppeteer-core";
import { formatOnclick } from "src/utils/navigation/postForm/requestBodyFromOnclick/formatOnclick";

export const scrapeRequestBodyFromOnclick = async (element?: ElementHandle | null, selector=""):Promise<BodyInit | undefined>  => {
    const onClickStr = await element?.evaluate((node: Element, selectorStr) => {
        const a = selectorStr.length ? node.querySelector(selectorStr): node
        if(a){
            return a.getAttribute("onClick")
        }
    }, selector)
    return formatOnclick(onClickStr);

}