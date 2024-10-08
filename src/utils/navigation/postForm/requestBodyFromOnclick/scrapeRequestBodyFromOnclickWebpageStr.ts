import { Page } from "puppeteer";
import { formatOnclick } from "src/utils/navigation/postForm/requestBodyFromOnclick/formatOnclick";
import { evaluateWebpageString } from "src/utils/scraping/parsing/evaluateWithRequestDomParser/evaluateWithRequestDomParser";

export const scrapeRequestBodyFromOnclickWebpageStr = async (
    page: Page, 
    webpageStr: string, 
    selector: string
):Promise<BodyInit | undefined>  => {
    const onClickStr = await evaluateWebpageString(
        page, 
        webpageStr, 
        selector
    )((document, selector) => {
        return document.querySelector(selector)?.getAttribute("onclick")
    })
    return formatOnclick(onClickStr)
}