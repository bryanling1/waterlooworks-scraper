import { Page } from "puppeteer";
import { Selectors } from "src/constants/Selectors";
import { ProgressReporter } from "@internwave/scrapers-api"
import { Strings } from "src/constants/Strings";
import { deleteCookies, loadCookies, saveCookies } from "src/scraping/login/src/cookies";
import { injectBanner } from "src/utils/scraping/render/injectBanner";
import { Links } from "src/constants/Links";

export const login = async (
    page: Page, 
    progressReporter: ProgressReporter,
    stayLoggedIn: boolean
) => {
    progressReporter.nextStep(Strings.login.navigating, 2, 1)
    if(stayLoggedIn){
        await loadCookies(page);
    }else{
        deleteCookies();
    }
    await page.goto(Links.LOGIN);
    progressReporter.requestAction(Strings.login.request)
    try{
        await injectBanner(page, Strings.login.request);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }catch(e){}finally{ //needed cause injectBanner throws if cookies are loaded succesfully
        await page.waitForSelector(Selectors.LogoutButton, {timeout: 0})
        await saveCookies(page);
    }
    
}

