import { Page } from "puppeteer-core";

export const scrapeFormData = async (page: Page, formSelector: string): Promise<Record<string, string>> => {
    const formData: Record<string, string> = {}
    const form = await page.$(formSelector)
    if(!form){
        throw new Error(`Form with selector ${formSelector} not found`)
    }
    const inputs = await form.$$('input')
    for(const input of inputs){
        const name = await input.evaluate((node) => node.getAttribute('name'))
        const value = await input.evaluate((node) => node.getAttribute('value'))
        if(name && value){
            formData[name] = value
        }
    }
    return formData
}