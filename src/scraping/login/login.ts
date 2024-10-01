import { Page } from "puppeteer";
import { Links } from "src/constants/Links";
import { Selectors } from "src/constants/Selectors";
import { ProgressReporter } from "@internwave/scrapers-api"
import { Strings } from "src/constants/Strings";
import { deleteCookies, loadCookies, saveCookies } from "src/scraping/login/src/cookies";

export const login = async (
    page: Page, 
    progressReporter: ProgressReporter,
    stayLoggedIn: boolean
) => {
    progressReporter.nextStep(Strings.LOGGING_IN, 2, 1)
    if(stayLoggedIn){
        await loadCookies(page);
    }else{
        deleteCookies();
    }
    await page.goto(Links.LOGIN);
    progressReporter.requestAction(Strings.PLEASE_LOGIN)
    await page.waitForSelector(Selectors.LogoutButton, {timeout: 0});
    await saveCookies(page);
}

